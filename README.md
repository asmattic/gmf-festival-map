# GMF Festival Map Monorepo

Shared festival map platform for Gasparilla Music Festival—**independent** of Grandstand or other third-party map hosts. The live map uses **Leaflet**, **OpenStreetMap** tiles, an optional **venue image overlay**, and JSON from your own API (or static files).

## What is in here

- `apps/web-next` — Next.js app with `/map` and `/api/map/*` JSON routes
- `apps/wp-map-block` — WordPress block plugin (editor settings + front-end mount)
- `packages/map-core` — domain types, defaults, query keys, cache policies, POI colors & labels
- `packages/map-data` — fetchers for POIs, stages, overlay
- `packages/map-ui` — shared React UI and **Leaflet** integration
- `packages/map-sw` — service worker helpers for offline/static asset caching
- `standalone/` — static HTML + sample JSON (no bundler)
- `docs/` — **indexed** architecture and implementation docs ([start here](docs/INDEX.md))

## Core architectural idea

Treat the festival map as a shared product surface, not a one-off page widget.

- Next.js owns the full interactive app shell.
- WordPress owns editorial embedding and CMS configuration.
- TanStack Query owns API/server-state caching in the React app and block view script.
- Service Worker can own immutable assets (e.g. venue overlay); OSM tiles load from the network by default.
- Shared packages own types, query keys, fetchers, and reusable UI.

## Install

```bash
pnpm install
```

## Develop

```bash
pnpm dev
```

## Build everything

```bash
pnpm build
```

## Suggested first implementation sequence

1. Run the Next app and verify `/map` renders (OSM + demo POIs + overlay if PNG present).
2. Replace demo API route data with real GMF map JSON.
3. Add the real overlay image and calibrate `bounds` in `overlay` JSON / route handler.
4. Build and install the WordPress plugin; set **API base URL** in the block if WP is not serving the API.
5. Keep POI colors and `gmf-design-tokens.css` aligned with the Gasparilla Figma design system.
6. Optional: add `standalone/venue-overlay.png` and use `standalone/` for static hosting.

## Documentation (indexed)

| | |
| --- | --- |
| **Index (start here)** | [docs/INDEX.md](docs/INDEX.md) |
| Map stack, API, block settings, Figma | [docs/MAP-IMPLEMENTATION.md](docs/MAP-IMPLEMENTATION.md) |
| Repo layout & caching | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Decisions | [docs/DECISIONS.md](docs/DECISIONS.md) |
| Agent handoff checklist | [docs/CODEX-HANDOFF.md](docs/CODEX-HANDOFF.md) |
| Standalone folder | [standalone/README.md](standalone/README.md) |
