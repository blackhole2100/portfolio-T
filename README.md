# Tijani Shabazz — Portfolio

A production portfolio site built with Next.js App Router, React, TypeScript, and Tailwind CSS. The site presents Tijani Shabazz's senior full-stack, mobile, and AI engineering experience, with project case studies that distinguish product context from his documented engineering contribution.

## Content source of truth

- `src/data/portfolio.ts` — identity, professional summary, career history, highlights, project cards, and technical competencies.
- `src/data/case-studies.ts` — the 16 detailed project write-ups, implementation scope, available results, technology, and attribution boundaries.
- `src/lib/ai-twin.ts` and `src/lib/ai-tools.ts` — the portfolio assistant's compact context, search index, metrics, and case-study retrieval tools.
- `public/images/portfolio/projects/` — representative SVG interface illustrations. These are concept visuals, not screenshots of live products.
- `public/resume.pdf` — the supplied resume available from the site.

When revising project content, keep `portfolio.ts` and `case-studies.ts` aligned. Each new case study should include a matching illustrative asset named after its slug.

## Development

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.

Run the test suite with:

```bash
npm test
```

Create a production build with:

```bash
npm run build
```

## Static content preview

`public/portfolio-preview.html` is a self-contained, interactive preview generated from the same TypeScript content data. It provides project search, light/dark theme switching, and project-detail dialogs. Rebuild it with Node's TypeScript stripping support:

```bash
node --experimental-strip-types --import ./tests/alias-hook-register.mjs scripts/build-static-preview.mjs
```

The static preview is useful when the Next.js dependencies are not installed; it is not a replacement for the production Next.js application.
