# Codex handoff

## What this archive contains

A working scaffold designed to be moved into Codex with minimal manual setup: **Next.js** map app, **WordPress** block, shared **Leaflet** UI, and optional **standalone** HTML.

**Master doc index:** [docs/INDEX.md](./INDEX.md).  
**Implementation details:** [docs/MAP-IMPLEMENTATION.md](./MAP-IMPLEMENTATION.md).

## Immediate next steps in Codex

### Step 1

Use Node **24.x** via **nvm** (see root `.nvmrc` and `package.json` `engines`). Then enable **Corepack** (preferred) to activate the pinned pnpm from `packageManager`.

```bash
nvm use
corepack enable
corepack prepare pnpm@10.6.0 --activate
pnpm install
pnpm typecheck
```

### Step 2

Start the Next app.

```bash
pnpm --filter @gmf/web-next dev
```

Open `/map` and verify that the demo POIs and overlay render.

### Step 3

Replace demo route handler data with real GMF data sources.

Recommended order:

1. `apps/web-next/app/api/map/pois/route.ts`
2. `apps/web-next/app/api/map/stages/route.ts`
3. `apps/web-next/app/api/map/overlay/route.ts`
4. `packages/map-data/src/adapters/*`

### Step 4

Wire the WordPress plugin into local WP and confirm the frontend mount works. In the block sidebar, set **API base URL** if WordPress is not the same origin as your `/api/map/*` routes. Adjust **center** / **zoom** if needed.

### Step 5 (optional)

Static handoff: open [standalone/README.md](../standalone/README.md), add `venue-overlay.png`, serve `standalone/` over HTTP, and verify it matches the live JSON contract.

## Mental model for future changes

- domain changes go in `map-core`
- data source and normalization changes go in `map-data`
- visual behavior and map rendering changes go in `map-ui`
- offline/static caching changes go in `map-sw`
- routing/app shell concerns go in `apps/web-next`
- editor/block concerns go in `apps/wp-map-block`

## What not to do

- do not duplicate query keys in app code
- do not put WordPress-only assumptions into `map-ui`
- do not make the WordPress block the canonical source of map business logic
- do not blur Service Worker asset caching with TanStack Query API caching
