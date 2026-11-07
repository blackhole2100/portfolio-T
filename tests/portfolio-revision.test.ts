import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf8");

test("published contact details and real resume file are consistent", () => {
  const portfolio = read("src/data/portfolio.ts");
  assert.match(portfolio, /github: "https:\/\/github\.com\/lightsunshine001"/);
  assert.match(portfolio, /email: "munimaguro68@gmail\.com"/);
  assert.match(portfolio, /resumeUrl: "\/resume\.pdf"/);
  assert.equal(existsSync(resolve(process.cwd(), "public/resume.pdf")), true);
});

test("contact form publishes GitHub and email and names its delivery destination", () => {
  const contact = read("src/components/ContactSection.tsx");
  assert.match(contact, /label: "GitHub"/);
  assert.match(contact, /label: "Email"/);
  assert.match(contact, /Messages are sent to \$\{personalInfo\.email\}/);
});

test("contact route sends to the profile email and preserves reply-to and full message fields", () => {
  const route = read("src/app/api/contact/route.ts");
  assert.match(route, /const recipients = \[personalInfo\.email\]/);
  assert.match(route, /replyTo: email/);
  assert.match(route, /`Name: \$\{name\}`/);
  assert.match(route, /`Email: \$\{email\}`/);
  assert.match(route, /`Reason: \$\{reason\}`/);
  assert.match(route, /"Message:"/);
  assert.match(route, /message,/);
});

test("the removed AI showcase has no homepage, navbar, footer, or hero anchor", () => {
  const home = read("src/app/page.tsx");
  const navbar = read("src/components/Navbar.tsx");
  const footer = read("src/components/Footer.tsx");
  const hero = read("src/components/HeroSection.tsx");
  assert.doesNotMatch(home, /AITwinSection/);
  assert.equal(existsSync(resolve(process.cwd(), "src/components/AITwinSection.tsx")), false);
  assert.doesNotMatch(navbar, /#ai-twin|label: "AI Assistant"/);
  assert.doesNotMatch(footer, /#ai-twin|AI Assistant/);
  assert.doesNotMatch(hero, /href="#ai-twin"/);
  assert.match(hero, /open-ai-twin/);
});

test("the command-palette UI and keyboard shortcut are removed while the theme toggle remains", () => {
  const navbar = read("src/components/Navbar.tsx");
  const layout = read("src/app/layout.tsx");
  assert.doesNotMatch(navbar, /Open command palette|<Search|⌘K/);
  assert.doesNotMatch(layout, /CommandPalette|open-command-palette/);
  assert.equal(existsSync(resolve(process.cwd(), "src/components/CommandPalette.tsx")), false);
  assert.match(navbar, /import \{ ThemeToggle \}/);
  assert.match(navbar, /<ThemeToggle \/>/);
  assert.match(layout, /AITwinChat/);
});

test("case-study hero images preserve their 8:5 artwork without cropping", () => {
  const page = read("src/app/work/[slug]/page.tsx");
  assert.match(page, /aspect-\[8\/5\]/);
  assert.match(page, /className="object-contain"/);
  assert.doesNotMatch(page, /className="object-cover"/);
});

test("the standalone preview includes the current contact channels and all case studies", () => {
  const preview = read("public/portfolio-preview.html");
  assert.match(preview, /munimaguro68@gmail\.com/);
  assert.match(preview, /github\.com\/lightsunshine001/);
  assert.match(preview, /16 case studies/i);
});

test("hero boundary has no oversized overlay or forced desktop viewport height", () => {
  const hero = read("src/components/HeroSection.tsx");
  assert.match(hero, /lg:min-h-0/);
  assert.doesNotMatch(hero, /lg:min-h-screen/);
  assert.doesNotMatch(hero, /h-32 sm:h-64/);
  assert.doesNotMatch(hero, /bg-gradient-to-t from-background via-background\/80/);
  // Preserve the original animated ambient orb; its radial gradient fades naturally.
  assert.match(hero, /animate-\[pulse_10s_ease-in-out_infinite_reverse\]/);
  assert.match(hero, /radial-gradient\(circle,hsl\(var\(--accent\)\/0\.2\)_0%,transparent_70%\)/);
});
