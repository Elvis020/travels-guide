# Patterns

## Naming Conventions
- Files: Route files still follow the repo's legacy `src/app/**/page.tsx` convention even though the runtime is now Vite + React Router; reusable React components use PascalCase filenames; data and utility modules use lowercase names.
- Classes/types: TypeScript types and interfaces use PascalCase (`Trip`, `Review`, `WishlistState`).
- Functions/methods: React components and exported hooks use PascalCase or `use*`; helpers and selectors use camelCase (`getTripBySlug`, `getFeaturedTrips`, `syncWithServer`).
- Variables: Local variables, props, and store fields use camelCase; route segment folders stay lowercase or bracketed for dynamic routes.

## Folder Conventions
- `src/app/` now acts as a route-component library consumed by `src/App.tsx`; one folder still maps to one page, and `[slug]` is preserved as a legacy folder name for the trip-detail component.
- `src/components/` is split by responsibility: `layout`, `navigation`, `sections`, `gallery`, `trips`, and `ui`.
- Component groups expose barrel exports through `index.ts`, so callers import from the folder root instead of deep file paths.
- `src/components/ui/AppLink.tsx` and `src/components/ui/AppImage.tsx` provide app-owned wrappers for routing links and image rendering without depending on a framework runtime.
- `src/data/` contains mock content and helper selectors that feed routes and components until a real backend is wired in.
- `src/stores/` contains client state, currently a single persisted wishlist store.
- `src/lib/` is reserved for shared utilities and future integration scaffolding; only `utils.ts` is active today, and trusted integration code should land there only when it is browser-safe. Secret-bearing logic belongs in Supabase Edge Functions or another backend.
- `src/types/` centralizes domain types used across routes, data, and components.

## Recurring Code Patterns
- Error handling: Client-side async helpers catch errors locally and log them to the console; there is no shared error boundary or reporting layer yet.
- Async: UI interactions mostly stay synchronous, while animation bootstrapping and future data sync use `async`/`await` inside `useEffect` or store actions.
- Dependency injection: None observed. Modules import shared data, hooks, and utilities directly through the `@/` path alias.
- Validation: Form state is managed inline in components; no schema validation library or shared validation layer was found in the scan.
- Motion: Framer Motion is the default component-level animation tool, while GSAP plus Lenis handle page-level scroll choreography.
- State: Local UI state uses React hooks; cross-page saved-trip state uses a Zustand store persisted to `localStorage`.
- Data access: Routes and components consume mock arrays plus selector helpers from `src/data/*` rather than server calls.
- Migration strategy: The app now uses direct React Router hooks plus small app-owned UI wrappers, which keeps the source framework-agnostic without scattering routing boilerplate everywhere.
- Backend split: The documented target architecture is a static Vite frontend plus Supabase-backed data/auth and external trusted workflows, rather than bringing a server runtime back into this repo.

## Co-Change Coupling (Git History)
| File A | File B | Coupling Signal |
|---|---|---|
| `src/components/SmoothScroll.tsx` | `src/app/page.tsx` | Both participate in the cinematic scrolling experience, but exact git coupling was not determinable from the scan alone. |
| `src/stores/wishlist.ts` | `src/components/trips/TripCard.tsx` | Wishlist state and trip cards are behaviorally linked, but exact git coupling was not determinable from the scan alone. |

## Testing Conventions
- Test file location: `— no test files found in scan`
- Test naming: `— no test files found in scan`
- Test helpers: `— no test files found in scan`

## Anti-Patterns Observed
- Large client-heavy route components exist in `src/app/page.tsx` and `src/app/trips/[slug]/page.tsx`, which increases the cost of UI edits and review.
- `src/app/book/page.tsx` still contains a `console.log` placeholder instead of a real submission flow.
- `src/stores/wishlist.ts` contains TODO-based Supabase sync scaffolding, so persistence is currently local-first rather than truly multi-device.
- `SETUP_SUPABASE.md` is architecture guidance, not evidence that the corresponding client/backend modules already exist in the codebase.
