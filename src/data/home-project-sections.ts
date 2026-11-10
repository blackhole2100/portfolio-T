import { featuredCaseStudies } from "@/data/case-studies";
import { projects } from "@/data/portfolio";

/**
 * The portfolio contains 44 published projects. The homepage presents each exactly once
 * across two non-overlapping groups: three featured case studies and the remaining projects.
 * The /work route is the complete 44-project case-study archive.
 */
export const homepageFeaturedCaseStudies = featuredCaseStudies;

const featuredCaseStudySlugs = new Set(
  homepageFeaturedCaseStudies.map((study) => study.slug)
);

export const selectedProjectWork = projects.filter(
  (project) => !featuredCaseStudySlugs.has(project.caseStudy)
);

export const featuredSelectedProjectWork = selectedProjectWork.filter(
  (project) => project.featured
);

export const remainingSelectedProjectWork = selectedProjectWork.filter(
  (project) => !project.featured
);
