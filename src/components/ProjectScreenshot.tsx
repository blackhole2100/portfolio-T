"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectScreenshotProps {
  src: string | null;
  title: string;
  isPublic: boolean;
}

/**
 * Displays a real screenshot when it exists in `public/`. The browser handles
 * missing files through onError, so no Node filesystem module enters the
 * Next.js application bundle.
 */
export default function ProjectScreenshot({
  src,
  title,
  isPublic,
}: ProjectScreenshotProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(src) && !imageFailed;

  return (
    <div className="relative mt-10 flex aspect-[8/5] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      {hasImage && src ? (
        <Image
          src={src}
          alt={`Screenshot captured from the public ${title} website`}
          fill
          priority
          sizes="(min-width: 1024px) 65vw, 100vw"
          className="object-contain"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex max-w-md flex-col items-center gap-3 px-6 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-primary/80">
            {isPublic ? "Website screenshot not captured yet" : "Internal project · no public website"}
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {isPublic
              ? "Run the local project screenshot capture script to save the actual website image in the public folder."
              : "No public project URL was provided. The portfolio intentionally avoids substituting an unrelated or generated visual."}
          </p>
        </div>
      )}
    </div>
  );
}
