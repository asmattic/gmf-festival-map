# Architecture

## Goals

Build the interactive GMF festival map once and deploy it in two places:

1. as a full Next.js application for the best user experience
2. as a WordPress block for the editorial website

3. optionally as **static HTML** in `standalone/` (same JSON semantics, no bundler)

**Rendering (summary):** Leaflet + OpenStreetMap raster tiles, venue raster via `imageOverlay`, POIs as circle markers. Full detail: [MAP-IMPLEMENTATION.md](./MAP-IMPLEMENTATION.md).

## Why this monorepo shape

### Shared packages

`map-core` exists so domain logic is not duplicated.

`map-data` exists so upstream data source changes do not ripple into UI components.

`map-ui` exists so WordPress and Next render the same map behavior.

`map-sw` exists so offline caching strategy is isolated from framework runtime code.

### Apps

`web-next` is the canonical app shell. It is where routing, deep linking, richer mobile UX, and future kiosk mode belong.

`wp-map-block` is intentionally thin. It should not become the source of truth for business logic. It mounts the shared React UI and exposes block settings for editors.

## Caching boundaries

### Next.js

Use App Router route handlers and per-route cache headers for semistatic resources. Prefer `fetch(..., { next: { revalidate } })` for server-side revalidation patterns where useful. Route Handlers are not cached by default, so treat caching as explicit policy, not magic.

### TanStack Query

Use TanStack Query for mutable API/server state such as POIs, stage metadata, schedule, and any live availability overlays. By default, TanStack Query treats cached query data as stale, so explicit `staleTime` policy matters here.

### Service Worker

Use the Service Worker for immutable or binary/static assets (not for OSM tile URLs in the default setup, which are loaded directly from `tile.openstreetmap.org`):

- overlay images (venue raster)
- optional future: local tile packs, sprites, glyphs, PMTiles, or **self-hosted** style JSON if you reintroduce a vector stack

This keeps offline behavior orthogonal to application data caching.

## WordPress best-practice stance

Use `block.json` as the canonical block registration file and `@wordpress/scripts` for block build tooling. Use `viewScriptModule` only when actually adopting WordPress script modules / Interactivity API on the frontend; this project uses a normal React frontend mount with **Leaflet**, TanStack Query, and shared `@gmf/map-ui` components because the map is app-like (filters, live JSON, image overlay), not a tiny declarative widget.

See [MAP-IMPLEMENTATION.md](./MAP-IMPLEMENTATION.md) for block attributes and API paths.
