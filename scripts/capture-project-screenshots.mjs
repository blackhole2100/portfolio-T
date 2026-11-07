import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { projects } from "../src/data/portfolio.ts";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = join(projectRoot, "public", "images", "portfolio", "projects", "live-sites");
const viewport = { width: 1440, height: 900 };
const timeoutMs = 65_000;

function findBrowser() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const candidates = process.platform === "win32"
    ? [
        join(process.env.PROGRAMFILES ?? "C:\\Program Files", "Google", "Chrome", "Application", "chrome.exe"),
        join(process.env["PROGRAMFILES(X86)"] ?? "C:\\Program Files (x86)", "Google", "Chrome", "Application", "chrome.exe"),
        join(process.env.LOCALAPPDATA ?? "", "Google", "Chrome", "Application", "chrome.exe"),
        join(process.env.PROGRAMFILES ?? "C:\\Program Files", "Microsoft", "Edge", "Application", "msedge.exe"),
        join(process.env["PROGRAMFILES(X86)"] ?? "C:\\Program Files (x86)", "Microsoft", "Edge", "Application", "msedge.exe"),
      ]
    : process.platform === "darwin"
      ? [
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        ]
      : ["/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/microsoft-edge"];

  return candidates.find((candidate) => candidate && existsSync(candidate)) ?? null;
}


function inspectPage(browser, url, profilePath) {
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-extensions",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--ignore-certificate-errors",
    `--window-size=${viewport.width},${viewport.height}`,
    "--force-device-scale-factor=1",
    "--virtual-time-budget=15000",
    `--user-data-dir=${profilePath}`,
    "--dump-dom",
    url,
  ];
  const result = spawnSync(browser, args, {
    cwd: projectRoot,
    encoding: "utf8",
    timeout: timeoutMs,
    windowsHide: true,
    maxBuffer: 12 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  const html = result.stdout ?? "";
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const pageTitle = titleMatch?.[1]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ?? "";
  const visibleText = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const browserError = /This site can(?:not|'t) be reached|This webpage is not available|ERR_NAME_NOT_RESOLVED|DNS_PROBE_FINISHED|ERR_CONNECTION_REFUSED|ERR_TUNNEL_CONNECTION_FAILED/i;
  if (!pageTitle || browserError.test(visibleText) || visibleText.length < 80) {
    throw new Error(`The browser did not load a usable public page for ${url}. Page title: ${pageTitle || "(none)"}`);
  }
  return { pageTitle };
}

function capturePng(browser, url, pngPath, profilePath) {
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-background-networking",
    "--disable-extensions",
    "--disable-sync",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--ignore-certificate-errors",
    `--window-size=${viewport.width},${viewport.height}`,
    "--force-device-scale-factor=1",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=18000",
    `--user-data-dir=${profilePath}`,
    `--screenshot=${pngPath}`,
    url,
  ];

  const result = spawnSync(browser, args, {
    cwd: projectRoot,
    encoding: "utf8",
    timeout: timeoutMs,
    windowsHide: true,
    maxBuffer: 2 * 1024 * 1024,
  });

  if (result.error) throw result.error;
  if (!existsSync(pngPath)) {
    const details = [result.stderr, result.stdout].filter(Boolean).join("\n").slice(-1200);
    throw new Error(details || `Browser did not save a screenshot (exit ${result.status ?? "unknown"}).`);
  }

  const bytes = readFileSync(pngPath);
  const isPng = bytes.length > 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (!isPng || bytes.length < 8_000) {
    throw new Error("The browser output was not a usable PNG screenshot. The page may have blocked access or failed to load.");
  }

  return { bytes: bytes.length, exitCode: result.status };
}

async function main() {
  const browser = findBrowser();
  if (!browser) {
    throw new Error(
      "Chrome or Microsoft Edge was not found. Install one, or set CHROME_PATH to its executable before running this script."
    );
  }

  mkdirSync(outputDirectory, { recursive: true });
  const publicProjects = projects.filter((project) => project.live && project.images[0]?.endsWith(".png"));
  const privateProjects = projects
    .filter((project) => !project.live)
    .map((project) => ({ slug: project.slug, title: project.title, reason: "No public website URL was supplied; no unrelated image was substituted." }));

  console.log(`Browser: ${browser}`);
  console.log(`Capturing ${publicProjects.length} public project websites/listings at ${viewport.width} × ${viewport.height}.`);

  const results = [];
  for (const project of publicProjects) {
    const outputPath = join(projectRoot, "public", project.images[0].replace(/^\//, ""));
    const temporaryDirectory = mkdtempSync(join(tmpdir(), "tijani-site-shot-"));
    const pngPath = join(temporaryDirectory, `${project.slug}.png`);
    const profilePath = join(temporaryDirectory, "chrome-profile");

    try {
      const page = inspectPage(browser, project.live, profilePath);
      const capture = capturePng(browser, project.live, pngPath, profilePath);
      copyFileSync(pngPath, outputPath);
      const savedBytes = statSync(outputPath).size;
      results.push({ slug: project.slug, title: project.title, sourceUrl: project.live, pageTitle: page.pageTitle, file: project.images[0], status: "captured", sourcePngBytes: capture.bytes, savedBytes });
      console.log(`✓ ${project.title} → ${project.images[0]} (${Math.round(savedBytes / 1024)} KB)`);
    } catch (error) {
      results.push({ slug: project.slug, title: project.title, sourceUrl: project.live, file: project.images[0], status: "failed", error: String(error?.message ?? error) });
      console.error(`✗ ${project.title}: ${error?.message ?? error}`);
    } finally {
      rmSync(temporaryDirectory, { recursive: true, force: true });
    }
  }

  const manifest = {
    capturedAt: new Date().toISOString(),
    browser,
    viewport,
    captures: results,
    internalProjects: privateProjects,
  };
  const manifestPath = join(outputDirectory, "manifest.json");
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  const successful = results.filter((result) => result.status === "captured").length;
  const failed = results.length - successful;
  console.log(`\nCompleted: ${successful}/${results.length} screenshots saved in ${outputDirectory}`);
  console.log(`Internal projects without a public URL: ${privateProjects.length}`);
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error?.stack ?? error);
  process.exitCode = 1;
});
