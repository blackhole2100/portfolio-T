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

test("homepage sections contain all 44 unique published projects exactly once", () => {
  assert.equal(caseStudies.length, 44, "the complete portfolio archive contains 44 case studies");
  assert.equal(projects.length, 44, "every case study remains in the complete portfolio archive");

  assert.equal(homepageFeaturedCaseStudies.length, 3, "featured case studies must contain three projects");
  assert.equal(selectedProjectWork.length, 41, "selected project work contains all non-featured projects");
  assert.equal(homepageFeaturedCaseStudies.length + selectedProjectWork.length, 44);

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
  const expectedHomepageSlugs = caseStudies.map((study) => study.slug).sort();
  assert.deepEqual(combinedSlugs, expectedHomepageSlugs, "homepage sections contain every published project exactly once");
});

test("selected project work keeps its visual and compact presentation groups disjoint", () => {
  assert.equal(featuredSelectedProjectWork.length, 2);
  assert.equal(remainingSelectedProjectWork.length, 39);
  assert.equal(featuredSelectedProjectWork.length + remainingSelectedProjectWork.length, 41);

  const visualSlugs = new Set(featuredSelectedProjectWork.map((project) => project.slug));
  const compactSlugs = new Set(remainingSelectedProjectWork.map((project) => project.slug));

  assert.equal(visualSlugs.size + compactSlugs.size, 41);
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
  assert.equal(caseStudies.some((study) => String(study.slug) === removedSlug), false);
  assert.equal(projects.some((project) => String(project.caseStudy) === removedSlug), false);
  assert.equal(homepageFeaturedCaseStudies.some((study) => String(study.slug) === removedSlug), false);
  assert.equal(selectedProjectWork.some((project) => String(project.caseStudy) === removedSlug), false);
});


test("ARVRobot fills the third featured case-study card and is removed from selected work", () => {
  assert.equal(
    homepageFeaturedCaseStudies.some((study) => study.slug === "arvrobot-real-estate-underwriting"),
    true
  );
  assert.equal(
    selectedProjectWork.some((project) => project.caseStudy === "arvrobot-real-estate-underwriting"),
    false
  );
});


test("seven removed projects are absent from the complete case-study archive and project catalog", () => {
  const removedSlugs = [
    "azure-openai-data-processing",
    "filerun-file-management",
    "deed-driver-delivery",
    "music-space-booking-app",
    "location-based-mobile-app",
    "macos-roulette-tactics",
    "baccarat-stat-master",
  ];
  for (const slug of removedSlugs) {
    assert.equal(caseStudies.some((study) => study.slug === slug), false, `${slug} must not have a case study`);
    assert.equal(projects.some((project) => project.caseStudy === slug), false, `${slug} must not have a project record`);
  }
  assert.equal(caseStudies.length, 44);
  assert.equal(projects.length, 44);
});
