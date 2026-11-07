# Node built-in import boundary fix

The portfolio app does not import Node filesystem modules at runtime.

- `ProjectScreenshot.tsx` is a small Client Component that attempts to load the public screenshot path and uses `onError` to show the pending/internal fallback if the file is absent.
- The case-study route passes only serializable values (`src`, `title`, and `isPublic`) to that component.
- Browser screenshot capture continues to use `node:fs` and `node:path` inside `scripts/capture-project-screenshots.mjs`, which runs as a separate Node process and is not imported by the Next.js application.
- No Webpack fallback or Node polyfill is configured.

This keeps `node:fs` and `node:path` out of both the browser and server application module graphs.
