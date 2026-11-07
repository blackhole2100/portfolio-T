"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowRight, Boxes, Brain, Building2, Code2, Database, HeartPulse, Layers, Network, ServerCog, type LucideIcon } from "lucide-react";
import { getCaseStudyPath, type CaseStudy } from "@/data/case-studies";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import AskAboutThis from "@/components/AskAboutThis";
import { projects } from "@/data/portfolio";

/**
 * Per-study glyph. A slug with no entry falls back to a generic mark rather
 * than breaking, but every shipped study should be listed here.
 */
export const SYSTEM_GLYPHS: Record<string, LucideIcon> = {
  "anchord-ai-entity-resolution": Network,
  "correlate-health-platform-integration": HeartPulse,
  "freight-quickbooks-integration": Activity,
  "azure-openai-data-processing": Database,
  "crushbank-enterprise-ai": Brain,
  "ourblackguide-react-native": Layers,
  "parente-ai-mobile-health": HeartPulse,
  "deed-driver-delivery": Activity,
  "arvrobot-real-estate-underwriting": Building2,
  "gemsharbor-marketplace": Boxes,
  "shiphype-fulfillment": Boxes,
  "dealercortex-ai": Activity,
  "arub-shipping-integrations": ServerCog,
  "suppliersift-ap-automation": Database,
  "calcs-engineering-calculations": Code2,
  "charter-steel-web": Building2,
};

/**
 * The case-study card, shared by the homepage tier-1 row and the `/work` index
 * so both surfaces stay identical as studies are added.
 *
 * `headingLevel` exists because the two surfaces nest the card differently: the
 * homepage sits under an h3 group label, `/work` under an h2. Hardcoding either
 * one skips a heading level on the other.
 */
const CaseStudyCard = ({
  study,
  headingLevel = "h3",
}: {
  study: CaseStudy;
  headingLevel?: "h3" | "h4";
}) => {
  const Glyph = SYSTEM_GLYPHS[study.slug] ?? Layers;
  const Heading = headingLevel;
  const relatedProject = projects.find((project) => project.caseStudy === study.slug);
  const screenshotSrc =
    relatedProject?.live && relatedProject.images.length > 0
      ? relatedProject.images[0]
      : null;
  const [screenshotFailed, setScreenshotFailed] = useState(false);
  const hasScreenshot = Boolean(screenshotSrc) && !screenshotFailed;

  return (
    /*
      The card is NOT one big link.

      It used to wrap everything in an `<a>`, which put the ask pill inside an
      anchor: clicking the pill both opened the chat and navigated to the case
      study. Nesting a `<button>` in an `<a>` is also invalid HTML, so no amount
      of stopPropagation would have made it correct.

      Instead the card is a plain container with a stretched link on the "Read
      case study" line: the whole card stays clickable via the ::after overlay,
      while the pill sits above it in the stacking order and receives its own
      clicks.
    */
    <SpotlightCard className="group/system relative h-full transition-colors duration-300 hover:border-primary/30">
      <div className="flex h-full flex-col p-6">
        <div className="relative mb-5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-background/30">
          {hasScreenshot && screenshotSrc ? (
            <Image
              src={screenshotSrc}
              alt={`Screenshot captured from the public ${study.title} website`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain"
              onError={() => setScreenshotFailed(true)}
            />
          ) : (
            <div className="flex max-w-xs flex-col items-center gap-2 px-5 text-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                {relatedProject?.live ? "Website capture pending" : "Internal project"}
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {relatedProject?.live
                  ? "Run the project screenshot capture script to add the real website image."
                  : "No public website URL was supplied, so no unrelated image is shown."}
              </span>
            </div>
          )}
        </div>
        {/* Glyph inline with the title rather than on its own row —
            it was costing ~70px of height for one small icon. */}
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary transition-colors duration-300 group-hover/system:border-primary/50">
            <Glyph className="h-4 w-4" />
          </span>
          <Heading className="text-lg font-bold leading-snug tracking-tight text-foreground">
            {study.title}
          </Heading>
        </div>

        {/* Anchored under the title block rather than inline in the heading, so
            the pill sits identically on every card regardless of how long the
            study title is or where it wraps. */}
        <div className="relative z-10 mt-2 flex min-h-6 items-center">
          <AskAboutThis question={`Tell me about the ${study.title}.`} className="ml-0" />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground" style={{ textWrap: "pretty" }}>
          {study.oneLiner}
        </p>

        {/* mt-auto pushes the metrics block to the bottom, so cards align
            there without min-h forcing stretch. */}
        <dl className="mt-auto flex flex-col gap-2.5 pt-6">
          {study.results.slice(0, 2).map((result) => (
            <div key={result.label} className="flex items-baseline gap-2.5">
              <dt className="sr-only">{result.label}</dt>
              <dd className="flex items-baseline gap-2.5">
                <span className="shrink-0 whitespace-nowrap text-xl font-bold leading-none tracking-tighter text-foreground tabular-nums">
                  {result.metric}
                </span>
                <span className="text-xs leading-snug text-muted-foreground">{result.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Tags and stack merged into one meta line: two separate
            rows of pills was the other half of the height problem. */}
        <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[10.5px] leading-relaxed text-muted-foreground/70">
          {study.stack.slice(0, 4).join(" · ")}
        </p>

        {/*
          `after:absolute after:inset-0` stretches this link over the whole
          card, so the card remains one click target for navigation without
          wrapping the pill in an anchor. The pill gets `relative z-10` to sit
          above that overlay.
        */}
        <div className="relative z-10 mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href={getCaseStudyPath(study.slug)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary after:absolute after:inset-0 after:rounded-[inherit] after:content-[''] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Read case study
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/system:translate-x-1 motion-reduce:transition-none" />
          </Link>
          {relatedProject?.live && (
            <a
              href={relatedProject.live}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              Official site
              <ArrowRight className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
};

export default CaseStudyCard;
