# Homepage project-section partition

The portfolio contains 52 unique projects. The homepage displays every project exactly once across two non-overlapping sections:

- **Featured Case Studies:** 3 projects (`featuredCaseStudies`)
- **Selected Project Work:** the remaining 49 projects (`projects` filtered to exclude the featured case-study slugs)

Within Selected Project Work, 3 entries use the large visual project-card layout and 46 use the compact project-list layout. This is a presentation split inside the 49-project section, not an additional group of projects.

The `/work` route remains the complete 52-project case-study archive. It is a separate archive page, not an extra set of homepage projects.

The partition is centralized in `src/data/home-project-sections.ts` and covered by `tests/home-project-sections.test.ts`. The regression tests verify that the two homepage groups are disjoint and that their union covers all 52 canonical project slugs exactly once.
