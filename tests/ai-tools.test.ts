import test from "node:test";
import assert from "node:assert/strict";

import { TOOL_DEFINITIONS, TOOL_NAMES, executeTool, formatToolCall } from "../src/lib/ai-tools";
import { caseStudies } from "../src/data/case-studies";

const call = (name: string, args: Record<string, unknown>) => executeTool({ id: "t1", name, args });

test("every tool definition is a well-formed OpenAI function schema", () => {
  for (const tool of TOOL_DEFINITIONS) {
    assert.equal(tool.type, "function");
    assert.ok(tool.function.name.length > 0);
    assert.ok(tool.function.description.length > 20);
    assert.equal(tool.function.parameters.type, "object");
    assert.ok(Array.isArray(tool.function.parameters.required));
  }
  assert.deepEqual(TOOL_NAMES, ["search_work", "get_case_study", "get_metric", "compare_systems", "navigate_to"]);
});

test("search_work finds documented AI integration work", () => {
  const result = call("search_work", { query: "Anchord MCP" });
  const output = result.output as { hits: { kind: string; id: string }[] };
  assert.ok(output.hits.some((hit) => hit.id === "anchord-ai-entity-resolution"));
  assert.equal(result.refused, false);
  assert.ok(result.sources.length > 0);
});

test("search_work distinguishes systems from customer-facing products", () => {
  const systemHits = call("search_work", { query: "clinical trial", kind: "systems" }).output as { hits: { kind: string }[] };
  assert.ok(systemHits.hits.length > 0);
  assert.ok(systemHits.hits.every((hit) => hit.kind === "system"));

  const productHits = call("search_work", { query: "React Native", kind: "products" }).output as { hits: { kind: string }[] };
  assert.ok(productHits.hits.length > 0);
  assert.ok(productHits.hits.every((hit) => hit.kind === "product"));
});

test("search_work can be narrowed to project cards", () => {
  const output = call("search_work", { query: "QuickBooks", kind: "projects" }).output as { hits: { kind: string }[] };
  assert.ok(output.hits.length > 0);
  assert.ok(output.hits.every((hit) => hit.kind === "project"));
});

test("search_work reports no matches instead of inventing work", () => {
  const result = call("search_work", { query: "quantum blockchain casino" });
  const output = result.output as { hits: unknown[]; note?: string };
  assert.equal(output.hits.length, 0);
  assert.equal(result.refused, true);
  assert.match(String(output.note), /do not invent/i);
});

test("search_work preserves short technology terms such as AI and RAG", () => {
  for (const query of ["AI", "RAG", "C#"]) {
    const output = call("search_work", { query }).output as { hits: unknown[] };
    assert.ok(output.hits.length > 0, `\"${query}\" should return matches`);
  }
});

test("get_metric returns source-backed figures with context", () => {
  const cases = [
    ["load-time reduction", "93%"],
    ["events per second", "1,000+ events per second"],
    ["Anchord MCP tools", "11 MCP tools"],
    ["documents per month", "Approximately 90,000 per month"],
    ["records per day", "Approximately 2,400 per day"],
  ] as const;
  for (const [name, expected] of cases) {
    const result = call("get_metric", { name });
    const output = result.output as { measured: boolean; value: string; source: string; context: string };
    assert.equal(output.measured, true, `${name} should be measured`);
    assert.equal(output.value, expected);
    assert.ok(output.source.length > 0);
    assert.ok(output.context.length > 30);
    assert.equal(result.refused, false);
  }
});

test("get_metric refuses figures that are not published", () => {
  const result = call("get_metric", { name: "monthly active users" });
  const output = result.output as { measured: boolean; reason: string };
  assert.equal(output.measured, false);
  assert.equal(result.refused, true);
  assert.match(output.reason, /not.*(measured|published)/i);
});

test("get_case_study can fetch a single section without leaking the whole study", () => {
  const result = call("get_case_study", { slug: "anchord-ai-entity-resolution", section: "ownership" });
  const output = result.output as { ownership: string; problem?: string };
  assert.match(output.ownership, /Tijani/i);
  assert.equal(output.problem, undefined);
});

test("get_case_study reports not-found for an unknown slug", () => {
  const result = call("get_case_study", { slug: "does-not-exist" });
  assert.equal(result.refused, true);
  assert.deepEqual(result.output, { found: false });
});

test("get_case_study resolves all published slugs", () => {
  for (const study of caseStudies) {
    const result = call("get_case_study", { slug: study.slug });
    assert.equal(result.refused, false, `${study.slug} should resolve`);
    const output = result.output as Record<string, unknown>;
    assert.equal(output.title, study.title);
    assert.equal(output.link, `/work/${study.slug}`);
  }
});

test("navigate_to resolves sections, case studies, and the resume", () => {
  assert.equal((call("navigate_to", { target: "#contact" }).output as { href: string }).href, "#contact");
  assert.equal((call("navigate_to", { target: "anchord-ai-entity-resolution" }).output as { href: string }).href, "/work/anchord-ai-entity-resolution");
  assert.equal((call("navigate_to", { target: "OurBlackGuide" }).output as { href: string }).href, "#project-ourblackguide-react-native");
  assert.match((call("navigate_to", { target: "resume" }).output as { href: string }).href, /\.docx$/);
});

test("navigate_to rejects targets outside the allow-list", () => {
  const result = call("navigate_to", { target: "/admin" });
  const output = result.output as { ok: boolean; reason: string };
  assert.equal(output.ok, false);
  assert.equal(result.refused, true);
  assert.match(output.reason, /not a valid destination/i);
});

test("compare_systems needs at least two valid case-study slugs", () => {
  const ok = call("compare_systems", { slugs: ["anchord-ai-entity-resolution", "freight-quickbooks-integration"] });
  assert.equal(ok.refused, false);
  assert.equal((ok.output as { systems: unknown[] }).systems.length, 2);
  const tooFew = call("compare_systems", { slugs: ["anchord-ai-entity-resolution"] });
  assert.equal(tooFew.refused, true);
});

test("compare_systems accepts a delimited string", () => {
  const result = call("compare_systems", { slugs: "anchord-ai-entity-resolution,freight-quickbooks-integration" });
  assert.equal(result.refused, false);
  assert.equal((result.output as { systems: unknown[] }).systems.length, 2);
});

test("an unknown tool name fails closed", () => {
  const result = call("delete_everything", {});
  assert.equal(result.refused, true);
  assert.match(String((result.output as { reason: string }).reason), /unknown tool/i);
});

test("formatToolCall truncates long arguments for display", () => {
  assert.equal(formatToolCall("search_work", { query: "rag" }), 'search_work("rag")');
  const long = formatToolCall("search_work", { query: "x".repeat(120) });
  assert.ok(long.length < 70);
  assert.match(long, /\.\.\.$|\.\.\."\)$/);
});

test("tools report a duration so the trace can show latency", () => {
  const result = call("search_work", { query: "RAG" });
  assert.equal(typeof result.durationMs, "number");
  assert.ok(result.durationMs >= 0);
});
