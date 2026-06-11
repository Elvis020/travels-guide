# NYS Travels Webapp

Vite-powered React app for the NYS Travels tourist guide experience.

## Architecture Snapshot

This repo now runs as a client-rendered React SPA hosted from Vite build output.

- `src/main.tsx` boots the app with `BrowserRouter`
- `src/App.tsx` registers routes and lazy-loads route modules
- Route components still live under `src/app/**` as a legacy folder convention
- UI content currently comes from local mock data in `src/data/**`
- Vercel is expected to host the static frontend, while future trusted backend work should live outside the SPA runtime

### Current vs planned responsibilities

**Current app responsibilities**
- Marketing pages and trip discovery
- Client-side routing
- Booking request form UI
- Guest wishlist persistence with Zustand + `localStorage`

**Planned backend responsibilities**
- Authentication when payment starts
- Payment initialization and webhook handling
- Transactional email and WhatsApp notifications
- Itinerary/ticket delivery and other secret-bearing workflows

The intended direction is `Vercel static frontend + Supabase data/auth + Edge Functions or another small backend for trusted operations`.

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Scripts

```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # ESLint
```

## Stack

- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS v4
- Framer Motion
- GSAP + Lenis
- Zustand

## Project Notes

- The app boots from `src/main.tsx`, and route registration lives in `src/App.tsx`.
- Most route components still live under `src/app/**` from the pre-Vite structure.
- `src/components/ui/AppLink.tsx` and `src/components/ui/AppImage.tsx` provide small app-owned wrappers for internal links and image rendering.
- Global fonts are loaded through CSS `@import` in `src/app/globals.css`.
- There is no framework server runtime in this repo today. If a feature needs secrets, webhooks, or protected business logic, implement it outside the Vite client.
