# Repository Guidance

## Portfolio subject and verified sources

This repository is the portfolio for **Tijani Shabazz**, a Senior Full-Stack & AI Software Engineer based in Fort Lauderdale, Florida. The supplied senior engineer resume and project inventory are the source of truth. `Tijani.md` summarizes the verified profile details.

Do not reintroduce older profile drafts, names, companies, locations, email addresses, or GitHub URLs. The current public contact details are documented in `src/data/portfolio.ts` and the linked resume.

## Content architecture

- `src/data/portfolio.ts` is the source of truth for profile copy, professional experience, education, metrics, project cards, and technical skills.
- `src/data/case-studies.ts` is the source of truth for the 16 detailed project write-ups.
- Keep projects and case studies aligned by slug. Case study pages are available at `/work/[slug]`.
- Every project illustration lives at `public/images/portfolio/projects/<slug>.svg`. These files are representative UI concepts, not real product screenshots.
- AI assistant context and search behavior are maintained in `src/lib/ai-twin.ts`, `src/lib/ai-tools.ts`, and `src/lib/ai-config.ts`. The floating chat remains available; the separate homepage showcase section is intentionally omitted.
- SEO metadata and structured data are maintained in `src/lib/seo/`.

## Attribution and factual accuracy

- Separate each product's overall purpose from Tijani's documented individual role.
- Do not imply sole ownership when the resume or notes describe a contribution to a larger product.
- Do not assign a project to an employer unless the source explicitly makes that connection.
- Do not invent project dates, performance results, customer counts, team sizes, languages, technologies, or public URLs.
- Career-level metrics (93% application load-time reduction and contributions to platforms processing 1,000+ events per second) must not be assigned to a named project without source support.
- Freight and .NET/Azure OpenAI volume figures must remain tied to their documented project contexts.
- Projects listed only as product references or relevance examples are not evidence of development contributions.

## Code and design conventions

- Framework: Next.js App Router, React, TypeScript.
- Styling: Tailwind CSS first; reuse existing design tokens and component primitives rather than introducing one-off CSS.
- Preserve the current dark/light theme support, responsive layout behavior, and reduced-motion accessibility.
- Reuse existing animation, card, reveal, navigation, and modal components.
- Prefer small, localized changes and preserve the surrounding file's style.
- Keep server components as the default; add client components only for state, interaction, or browser APIs.
- Keep user-facing copy consistent with the content source of truth.

## Validation

- `npm test` runs the Node test suite through `tests/alias-hook-register.mjs`.
- `npm run build` checks the production Next.js build.
- If dependencies are unavailable, run the focused data/AI tests and report the missing runtime dependency rather than claiming the site was launched.
