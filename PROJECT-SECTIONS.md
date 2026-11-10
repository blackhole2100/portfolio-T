# Homepage project-section partition

The published portfolio contains 44 unique projects. The homepage displays each project exactly once across two non-overlapping sections:

- **Featured Case Studies:** 3 projects (`featuredCaseStudies`)
- **Selected Project Work:** 41 projects (`projects` filtered to exclude the featured case-study slugs)

Within Selected Project Work, 2 entries use the large visual project-card layout and 39 use the compact project-list layout. This is a presentation split inside the 41-project section, not an additional group of projects.

The `/work` route is the complete 44-project case-study archive. The seven projects removed at the user's request are absent from both the homepage and the case-study archive.

The partition is centralized in `src/data/home-project-sections.ts` and covered by `tests/home-project-sections.test.ts`. The regression tests verify that the two homepage groups are disjoint and that their union covers all 44 canonical project slugs exactly once.
