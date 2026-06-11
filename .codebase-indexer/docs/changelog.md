# Changelog

## 2026-06-11 — Initial supplement index
- First codebase-indexer run for `/Users/TT/Documents/personal/ideas/tourist-guide/tourist-guide-webapp`.
- Generated `.codebase-indexer/docs/patterns.md`, `.codebase-indexer/docs/decisions.md`, and `.codebase-indexer/docs/changelog.md`.
- Skipped `architecture.md` and `implementation.md` because `CLAUDE.md` already documents the app structure, routing, and conventions well enough to act as the primary source of truth.
- Indexed a Next.js App Router tourism site with 50 source files, heavy client-side animation, mock-data-backed content modules, and a persisted wishlist store.
- Scan signals: no automated tests were found; `src/app/book/page.tsx` still logs booking submissions to the console; `src/stores/wishlist.ts` contains TODO scaffolding for future Supabase sync and fetch behavior.

## 2026-06-11 — Ported app shell from Next.js to Vite
- Replaced the Next.js runtime with Vite, `BrowserRouter`, and a new `index.html` + `src/main.tsx` boot path.
- Removed `next.config.ts`, `next-env.d.ts`, and the old `src/app/layout.tsx`, then copied the favicon into `public/` for Vite serving.
- Updated global font loading to standard CSS `@import`, preserving the editorial typography without `next/font/google`.
- Verification: `npm run build` succeeds on Vite.

## 2026-06-11 — Removed remaining Next.js compatibility layer
- Replaced all remaining `next/*` imports in `src/` with direct React Router hooks and app-owned `Link` / `Image` wrappers.
- Deleted `src/compat/` and removed the temporary alias mappings from `tsconfig.json` and `vite.config.ts`.
- Swapped the gallery lightbox loader from `next/dynamic` to native `React.lazy()` + `Suspense`.
- Verification: `npm run build` still succeeds after the cleanup.

## 2026-06-11 — Updated docs for post-Next architecture
- Rewrote repo docs to describe the app as a Vite SPA hosted as a static frontend, not a Next.js runtime.
- Updated Supabase setup guidance to use `VITE_*` environment variables and frontend-safe client patterns.
- Documented the intended backend split: Vercel for the frontend, with Supabase and/or external functions for payments, auth-at-checkout, webhooks, and messaging.
- Corrected supplemental docs that still described the project as a Next.js App Router site.
