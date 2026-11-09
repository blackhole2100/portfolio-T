import { featuredCaseStudies } from "@/data/case-studies";
import { projects } from "@/data/portfolio";

/**
 * The homepage presents the 51-project portfolio in two non-overlapping groups:
 * - the two featured case studies, which receive full case-study cards;
 * - every other project, which appears once in Selected Project Work.
 *
 * The /work route remains the complete archive of all 51 detailed case studies.
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
