# Tijani Shabazz — Portfolio

A production portfolio site built with Next.js App Router, React, TypeScript, and Tailwind CSS. The site presents Tijani Shabazz's senior full-stack, mobile, and AI engineering experience, with project case studies that describe products Tijani participated in developing and deploying, along with the scope of his engineering contribution.

## Content source of truth

- `src/data/portfolio.ts` — identity, professional summary, career history, highlights, project cards, and technical competencies.
- `src/data/case-studies.ts` — all 51 detailed project write-ups, implementation scope, available results, engineering areas, and role descriptions.
- `src/data/additional-projects.ts` — the 36 additional projects that extend the original 15 to the full 51-entry inventory.
- `PROJECTS.md` and `public/project-inventory.json` — the full project catalog, official URLs, role descriptions, and screenshot paths.
- `src/lib/ai-twin.ts` and `src/lib/ai-tools.ts` — the portfolio assistant's compact context, search index, metrics, and case-study retrieval tools.
- `public/images/portfolio/projects/live-sites/` — locally stored PNG screenshots captured from the actual public project websites. These are not generated mockups.
- `public/resume.pdf` — the supplied resume available from the site.

When revising project content, keep `portfolio.ts`, `additional-projects.ts`, and `case-studies.ts` aligned. Public project screenshots use each project slug as the filename and PNG format. Internal projects with no public URL must keep `images: []`; do not add generated or unrelated substitutes. Rebuild the project catalog after content changes with `npm.cmd run catalog:projects`.

## Development

```powershell
npm.cmd ci
npm.cmd run dev
```

Then open `http://localhost:3000`.

Run the test suite and create a production build with:

```powershell
npm.cmd test
npm.cmd run build
```

## Real project website screenshots

Project visuals are intended to be screenshots captured from the actual public project websites, not generated mockups. The 45 screenshot paths are configured, but captures are not included until the local browser command below is run; the current manifest records the pending status. No npm dependencies are required for screenshot capture. There are 51 projects in the portfolio: 45 with public URLs and 6 private/internal projects without a public URL in the supplied information. With Node.js 22+ and Chrome or Edge installed, run from PowerShell:

```powershell
npm.cmd run capture:project-screenshots
```

The script opens each public website or official app-store listing in Chrome or Edge at a 1440 × 900 desktop viewport, checks that a usable page loaded, and saves a PNG screenshot under `public/images/portfolio/projects/live-sites/`. The manifest records the page title, source URL, output path, and capture result. Set `CHROME_PATH` if the browser is installed in a non-standard location.

The six internal projects without a public URL are .NET 8 & Azure OpenAI Data Processing, Deed Driver Delivery, Music Space Booking App, Location-Based Mobile App, macOS Roulette Tactics, and Baccarat Stat Master. They are not assigned unrelated or fabricated screenshots; provide an authorized staging URL or supplied screenshot to add imagery for these entries.

## Static content preview

`public/portfolio-preview.html` is a self-contained, interactive preview generated from the same TypeScript content data. It provides project search, light/dark theme switching, and project-detail dialogs. Rebuild it with Node's TypeScript stripping support:

```bash
node --experimental-strip-types --import ./tests/alias-hook-register.mjs scripts/build-static-preview.mjs
```

The static preview is useful when the Next.js dependencies are not installed; it is not a replacement for the production Next.js application.
