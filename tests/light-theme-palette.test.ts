import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync("src/app/globals.css", "utf8");
const previewBuilder = readFileSync("scripts/build-static-preview.mjs", "utf8");
const preview = readFileSync("public/portfolio-preview.html", "utf8");

function extractBlock(source: string, selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\n  \\}`));
  assert.ok(match, `Expected ${selector} block`);
  return match[1];
}

test("light theme uses the requested silver-white page background and sky-blue decoration", () => {
  const root = extractBlock(css, ":root");
  assert.match(root, /--background:\s*0 0% 96\.08%/); // #F5F5F5
  assert.match(root, /--accent:\s*202\.96 92% 75\.49%/); // #87CEFA
  assert.match(root, /--accent-light:\s*203\.48 87\.34% 84\.51%/);
  assert.match(root, /--primary:\s*206\.02 100% 38\.43%/); // vivid, accessible bright blue
  assert.match(root, /--primary-foreground:\s*0 0% 100%/);
});

test("dark theme color tokens are retained", () => {
  const dark = extractBlock(css, ".dark");
  assert.match(dark, /--background:\s*224 47% 7%/);
  assert.match(dark, /--foreground:\s*170 20% 92%/);
  assert.match(dark, /--primary:\s*170 68% 50%/);
  assert.match(dark, /--accent:\s*170 68% 50%/);
  assert.match(dark, /--accent-light:\s*170 68% 60%/);
  assert.match(dark, /--accent-dark:\s*176 61% 19%/);
});

test("standalone preview uses the same light palette while retaining its dark palette", () => {
  assert.match(previewBuilder, /--bg:#F5F5F5/);
  assert.match(previewBuilder, /--accent:#87CEFA/);
  assert.match(previewBuilder, /--accent2:#006FC4/);
  assert.match(previewBuilder, /--accent:#62dfd0/);
  assert.match(previewBuilder, /--bg:#07131f/);
  assert.match(preview, /--bg:#F5F5F5/);
  assert.match(preview, /--accent:#87CEFA/);
});
