# Windows SVG asset-lock workaround

The logo was imported as a static module from `src/assets/tijani-mark.svg` in AboutSection, Footer, and Navbar. On Windows, the Next.js bundler reported an OS error 32 while trying to read that SVG as source code.

The logo now lives at `public/images/tijani-mark.svg` and is referenced by URL (`/images/tijani-mark.svg`) in those components. This avoids asking Turbopack/Webpack to parse the SVG as a bundled source module. The SVG contents are unchanged.

After replacing the project files on Windows:

1. Stop the dev server (`Ctrl+C`).
2. Close any SVG editor or preview that may be holding the old asset open.
3. Remove the stale Next.js cache:

   ```powershell
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   ```

4. Restart the app:

   ```powershell
   npm run dev
   ```

A regression test in `tests/public-logo-asset.test.ts` verifies that the public asset exists and those components do not statically import it from `src/assets`.
