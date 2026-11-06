import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

import {
  CASE_STUDY_SLUGS,
  CASE_STUDY_THEMES,
  caseStudies,
  caseStudyBySlug,
  caseStudiesByTheme,
  featuredCaseStudies,
  systemCaseStudies,
  productCaseStudies,
  getAdjacentCaseStudies,
  getCaseStudyPath,
} from "../src/data/case-studies";
import { experiences, bulletStudySlug, bulletText } from "../src/data/portfolio";

test("the published portfolio has sixteen source-backed project case studies", () => {
  assert.equal(caseStudies.length, 16);
  assert.equal(CASE_STUDY_SLUGS.length, caseStudies.length);
  assert.deepEqual([...CASE_STUDY_SLUGS].sort(), caseStudies.map((study) => study.slug).sort());
});

test("each case study documents product context, role, sections, and ownership", () => {
  for (const study of caseStudies) {
    const where = `case study \"${study.slug}\"`;
    assert.ok(study.title.length > 5, `${where} needs a title`);
    assert.ok(study.oneLiner.length > 40, `${where} needs a useful summary`);
    assert.ok(study.summary.length > 100, `${where} needs product and role context`);
    assert.ok(study.problem.length > 80, `${where} needs product context`);
    assert.ok(study.ownership.length > 80, `${where} needs an attribution boundary`);
    assert.ok(study.stack.length >= 4, `${where} needs a documented technology / workflow list`);
    assert.ok(study.tags.length >= 2, `${where} needs tags`);
    assert.ok(study.aliases.length >= 5, `${where} needs aliases for AI search`);
    assert.ok(study.sections.length >= 2, `${where} needs implementation detail`);

    for (const result of study.results) {
      assert.ok(result.metric.length > 0, `${where} has a result with no value`);
      assert.ok(result.label.length > 8, `${where} result \"${result.metric}\" needs a label`);
    }

    for (const section of study.sections) {
      assert.ok(section.heading.length > 0, `${where} has a section with no heading`);
      assert.ok(section.body.length > 60, `${where} section \"${section.heading}\" needs detail`);
    }
  }
});

test("case studies do not require invented architecture decisions", () => {
  // The supplied source material documents implementation scope and constraints,
  // but does not consistently document rejected alternatives or design records.
  // Empty decisions are preferable to fabricating technical decisions.
  for (const study of caseStudies) {
    for (const decision of study.decisions) {
      assert.ok(decision.choice.length > 0);
      assert.ok(decision.why.length > 30);
    }
  }
});

test("slugs are unique and resolve through the lookup map", () => {
  const slugs = caseStudies.map((study) => study.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate case study slug");
  for (const study of caseStudies) {
    assert.equal(caseStudyBySlug.get(study.slug), study);
    assert.equal(getCaseStudyPath(study.slug), `/work/${study.slug}`);
  }
});

test("every project case study has a representative visual asset", () => {
  for (const study of caseStudies) {
    const path = `public/images/portfolio/projects/${study.slug}.svg`;
    assert.ok(existsSync(path), `missing illustrative project asset for ${study.slug}`);
  }
});

test("systems precede products in the work index", () => {
  const lastSystem = caseStudies.reduce((last, study, index) => (study.kind === "system" ? index : last), -1);
  const firstProduct = caseStudies.findIndex((study) => study.kind === "product");
  assert.ok(firstProduct > lastSystem, "product case studies must come after system case studies");
  assert.equal(systemCaseStudies.length + productCaseStudies.length, caseStudies.length);
});

test("every study has a reachable theme group", () => {
  const grouped = caseStudiesByTheme.flatMap((group) => group.studies);
  assert.equal(grouped.length, caseStudies.length);
  assert.equal(CASE_STUDY_THEMES.length, 4);
  for (const group of caseStudiesByTheme) {
    assert.ok(group.label.length > 0 && group.blurb.length > 20);
  }
});

test("exactly three system case studies are featured", () => {
  assert.equal(featuredCaseStudies.length, 3);
  assert.ok(featuredCaseStudies.every((study) => study.kind === "system"));
});

test("adjacent navigation chains every study with correct ends", () => {
  const first = getAdjacentCaseStudies(caseStudies[0].slug);
  assert.equal(first.previous, null);
  assert.equal(first.next, caseStudies[1]);

  const last = getAdjacentCaseStudies(caseStudies[caseStudies.length - 1].slug);
  assert.equal(last.next, null);
  assert.equal(last.previous, caseStudies[caseStudies.length - 2]);

  let cursor = caseStudies[0];
  let visited = 1;
  while (true) {
    const { next } = getAdjacentCaseStudies(cursor.slug);
    if (!next) break;
    cursor = next;
    visited += 1;
  }
  assert.equal(visited, caseStudies.length);
  assert.deepEqual(getAdjacentCaseStudies("does-not-exist"), { previous: null, next: null });
});

test("every linked experience bullet points to a real case study", () => {
  let mappedCount = 0;
  for (const experience of experiences) {
    for (const bullet of experience.bullets) {
      const slug = bulletStudySlug(bullet);
      if (!slug) continue;
      mappedCount += 1;
      assert.ok(caseStudyBySlug.get(slug), `bullet \"${bulletText(bullet)}\" links to unknown slug \"${slug}\"`);
    }
  }
  assert.ok(mappedCount > 0, "expected at least one linked experience bullet");
});
