import test from "node:test";
import assert from "node:assert/strict";

import { caseStudies } from "../src/data/case-studies";
import { PORTFOLIO_CONTEXT, PORTFOLIO_CONTEXT_BRIEF } from "../src/lib/ai-twin";
import { SYSTEM_PROMPT } from "../src/lib/ai-config";

const SYSTEM_PROMPT_BUDGET = 40_000;
const PORTFOLIO_CONTEXT_BUDGET = 28_000;
const BRIEF_BUDGET = 8_000;

test("the system prompt stays within its per-request budget", () => {
  assert.ok(
    SYSTEM_PROMPT.length < SYSTEM_PROMPT_BUDGET,
    `SYSTEM_PROMPT is ${SYSTEM_PROMPT.length} chars, over the ${SYSTEM_PROMPT_BUDGET} budget. Use get_case_study for detail.`
  );
});

test("portfolio context stays lean and the brief stays leaner", () => {
  assert.ok(PORTFOLIO_CONTEXT.length < PORTFOLIO_CONTEXT_BUDGET);
  assert.ok(PORTFOLIO_CONTEXT_BRIEF.length < BRIEF_BUDGET);
  assert.ok(PORTFOLIO_CONTEXT_BRIEF.length < PORTFOLIO_CONTEXT.length);
});

test("case-study depth is fetched rather than copied into the prompt", () => {
  const longestBody = caseStudies
    .flatMap((study) => study.sections.map((section) => section.body))
    .sort((a, b) => b.length - a.length)[0];

  assert.ok(longestBody);
  assert.ok(!PORTFOLIO_CONTEXT.includes(longestBody));
});

test("the compact prompt indexes every project and fetches ownership detail on demand", () => {
  for (const study of caseStudies) {
    assert.ok(PORTFOLIO_CONTEXT.includes(study.slug), `missing case-study slug: ${study.slug}`);
    assert.ok(PORTFOLIO_CONTEXT.includes(study.title), `missing case-study title: ${study.slug}`);
  }
  assert.match(PORTFOLIO_CONTEXT, /participation in developing and deploying every project/i);
  assert.match(SYSTEM_PROMPT, /get_case_study/);
  assert.match(SYSTEM_PROMPT, /11 MCP tools/i);
  assert.doesNotMatch(SYSTEM_PROMPT, /9 of (the )?14/i);
});
