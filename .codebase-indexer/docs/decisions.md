# Architectural Decisions

> ADR entries explain WHY — not what was built, but why it was built that way.

## App-Wide Smooth Scrolling Wrapper
**Date:** 2026-06-11
**Why:** The app wraps all pages in a single `SmoothScroll` component so scroll behavior and GSAP-triggered storytelling stay consistent across the marketing experience.
**Why (inferred):** Commit `1a174f4` (`Re-enable Lenis smooth scroll for better UX`) indicates UX quality was an explicit driver for this setup.
**Tradeoffs:** Adds client-only runtime behavior to the root layout and increases the risk of motion-related regressions across all pages.
**Alternatives considered:** Native browser scrolling with isolated per-page GSAP hooks, or Framer Motion only without a shared Lenis layer.

---

## Mock-Data-First Content Layer
**Date:** 2026-06-11
**Why:** Trips, reviews, destinations, guides, and gallery content live in `src/data/` so routes and components can ship against stable domain objects before a real backend is connected.
**Why (inferred):** `— not determinable from git history`
**Tradeoffs:** Content updates require code changes, and UI behavior can drift from eventual production data constraints.
**Alternatives considered:** Connecting Supabase immediately, introducing a headless CMS first, or mixing route-local hardcoded objects directly into page files.

---

## Guest-First Wishlist Persistence
**Date:** 2026-06-11
**Why:** The wishlist is stored with Zustand and `localStorage` so visitors can save trips immediately without authentication, while keeping a clear hook for later server sync.
**Why (inferred):** `— not determinable from git history`
**Tradeoffs:** Saved items are device-local today, and the server sync path remains unfinished.
**Alternatives considered:** Requiring auth before saving, storing wishlist state only in React component state, or blocking the feature until backend persistence existed.

---

## Vite Runtime with App-Owned UI Wrappers
**Date:** 2026-06-11
**Why:** The app was ported from Next.js to Vite by replacing the runtime shell first, then cleaning the source to use direct React Router hooks plus small app-owned `Link` and `Image` wrappers.
**Why (inferred):** `— not determinable from git history`
**Tradeoffs:** The repo still carries some legacy folder naming (`src/app`, `[slug]`), but no longer depends on framework compatibility aliases.
**Alternatives considered:** Rewriting every route/component to raw router primitives inline, or scaffolding a second app and maintaining two frontends during the migration.

---

## Static Frontend Plus External Trusted Backends
**Date:** 2026-06-11
**Why:** The app should stay a static Vite frontend on Vercel while future trusted workflows such as payments, auth-at-checkout, notifications, and itinerary delivery move to Supabase and/or other backend functions.
**Why (inferred):** The active roadmap includes payment integration, auth only at payment time, and post-payment messaging, all of which require secret-bearing or webhook-driven logic that should not live in a browser bundle.
**Tradeoffs:** The architecture becomes split across frontend and backend surfaces, which adds coordination cost and deployment boundaries.
**Alternatives considered:** Reintroducing a server-rendered framework into this repo, pushing sensitive logic into the browser, or delaying payment and notification features until a larger backend rewrite.
