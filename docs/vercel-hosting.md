# Vercel hosting

The build chooses Nitro's Vercel preset when `VERCEL=1` (set automatically by Vercel), generating `.vercel/output` with server functions and static assets. Lovable keeps its existing build behavior.

- Import the GitHub repository and deploy `main`.
- Use the checked-in `vercel.json` build settings. Remove any dashboard Output Directory override such as `dist` or `.output/public`: the Vercel Build Output API serves the generated `.vercel/output` layout.
- Set `ACADEMY_DATABASE_URL` and `ACADEMY_DATABASE_KEY` in Vercel's server environment for the deployments that need booking/staff functionality.
- The shared logo uses the existing original N brand mark bundled under `/brand/native-kid-mark.png`, plus an accessible text wordmark. Header, footer, and organization metadata share that asset. No active image depends on Lovable-only `/__l5e/` upload routing.
- The hero is bundled by Vite; interface icons are inline Lucide SVGs, requiring no icon font or remote icon service. Decorative SVGs and the legacy background are committed under `public/brand`.
- Redeploy after build/config changes. Do not commit `.vercel/` or environment values.
