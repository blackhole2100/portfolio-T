import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects } from "@/data/portfolio";

export interface ProjectScreenshotState {
  src: string | null;
  sourceUrl: string | null;
  status: "available" | "pending" | "internal";
}

/**
 * Returns a screenshot only when a real capture exists in `public/`.
 * Public projects without a local capture stay on an honest pending state;
 * private/internal projects never receive a fabricated visual.
 */
export function getProjectScreenshotState(caseStudySlug: string): ProjectScreenshotState {
  const project = projects.find((item) => item.caseStudy === caseStudySlug);
  if (!project) return { src: null, sourceUrl: null, status: "internal" };
  if (!project.live || project.images.length === 0) {
    return { src: null, sourceUrl: project.live ?? null, status: "internal" };
  }

  const src = project.images[0];
  const diskPath = join(process.cwd(), "public", src.replace(/^\/+/, ""));
  if (existsSync(diskPath)) return { src, sourceUrl: project.live, status: "available" };
  return { src: null, sourceUrl: project.live, status: "pending" };
}
