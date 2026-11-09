import test from "node:test";
import assert from "node:assert/strict";

import { caseStudies, featuredCaseStudies } from "../src/data/case-studies";
import { projects } from "../src/data/portfolio";
import {
  homepageFeaturedCaseStudies,
  selectedProjectWork,
  featuredSelectedProjectWork,
  remainingSelectedProjectWork,
} from "../src/data/home-project-sections";

test("homepage sections contain 51 unique projects in total", () => {
  assert.equal(caseStudies.length, 51, "the complete portfolio archive contains 52 case studies");
  assert.equal(projects.length, 51, "every case study has one portfolio project record");

  assert.equal(homepageFeaturedCaseStudies.length, 2, "featured case studies must contain two projects");
  assert.equal(selectedProjectWork.length, 49, "selected project work must contain the remaining 49 projects");
  assert.equal(homepageFeaturedCaseStudies.length + selectedProjectWork.length, 51);

 const caseStudySlugs = new Set<string>(
  homepageFeaturedCaseStudies.map((study) => study.slug)
);

const selectedSlugs = new Set<string>(
  selectedProjectWork.map((project) => project.caseStudy)
);

  assert.equal(caseStudySlugs.size, homepageFeaturedCaseStudies.length, "featured case studies must be unique");
  assert.equal(selectedSlugs.size, selectedProjectWork.length, "selected project work must be unique");

  for (const slug of caseStudySlugs) {
    assert.equal(selectedSlugs.has(slug), false, `${slug} must not appear in both homepage sections`);
  }

  const combinedSlugs = [...caseStudySlugs, ...selectedSlugs].sort();
  const allCaseStudySlugs = caseStudies.map((study) => study.slug).sort();
  assert.deepEqual(combinedSlugs, allCaseStudySlugs, "the two sections must cover every project exactly once");
});

test("selected project work keeps its visual and compact presentation groups disjoint", () => {
  assert.equal(featuredSelectedProjectWork.length, 3);
  assert.equal(remainingSelectedProjectWork.length, 46);
  assert.equal(featuredSelectedProjectWork.length + remainingSelectedProjectWork.length, 49);

  const visualSlugs = new Set(featuredSelectedProjectWork.map((project) => project.slug));
  const compactSlugs = new Set(remainingSelectedProjectWork.map((project) => project.slug));

  assert.equal(visualSlugs.size + compactSlugs.size, 49);
  for (const slug of visualSlugs) {
    assert.equal(compactSlugs.has(slug), false, `${slug} must not appear in both selected-work presentations`);
  }
});

test("the homepage partition is derived from the canonical featured case-study set", () => {
  assert.deepEqual(
    homepageFeaturedCaseStudies.map((study) => study.slug),
    featuredCaseStudies.map((study) => study.slug)
  );
});


test("Freight SaaS - QuickBooks Online Integration is fully removed from the portfolio", () => {
  const removedSlug = "freight-quickbooks-integration";

assert.equal(
  caseStudies.some(
    (study) => String(study.slug) === removedSlug
  ),
  false
);

assert.equal(
  projects.some(
    (project) => String(project.caseStudy) === removedSlug
  ),
  false
);

assert.equal(
  homepageFeaturedCaseStudies.some(
    (study) => String(study.slug) === removedSlug
  ),
  false
);

assert.equal(
  selectedProjectWork.some(
    (project) => String(project.caseStudy) === removedSlug
  ),
  false
);
});
