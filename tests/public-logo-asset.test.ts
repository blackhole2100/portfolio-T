import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicLogoPath = join(root, "public", "images", "tijani-mark.svg");
const logoConsumers = [
  "src/components/AboutSection.tsx",
  "src/components/Footer.tsx",
  "src/components/Navbar.tsx",
];

test("Tijani logo is served as a public asset, not bundled from src/assets", async () => {
  const svg = await readFile(publicLogoPath, "utf8");
  assert.match(svg, /<svg\b/);

  for (const relativePath of logoConsumers) {
    const source = await readFile(join(root, relativePath), "utf8");
    assert.match(source, /src="\/images\/tijani-mark\.svg"/);
    assert.doesNotMatch(source, /@\/assets\/tijani-mark\.svg/);
  }
});
