# Map implementation reference

Single reference for how the GMF festival map is built, configured, and deployed. This map is **independent** of Grandstand or other third-party map products: it uses **Leaflet** with **OpenStreetMap** raster tiles, optional **venue image overlay**, and **POI GeoJSON-style coordinates** from JSON endpoints.

---

## 1. Map rendering stack

| Layer | Technology | Notes |
| ----- | ---------- | ----- |
| Basemap | [OpenStreetMap](https://www.openstreetmap.org/) standard tile layer | URL pattern `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`; attribution required |
| Map engine | [Leaflet](https://leafletjs.com/) `1.9.x` | Used in `@gmf/map-ui` (`FestivalMap.tsx`) |
| Venue artwork | `L.imageOverlay` | Raster URL + geographic bounds (southwest / northeast corners as `[lng, lat]` pairs) |
| POIs | `L.circleMarker` | One marker per POI; color from category |

Vector map styles (e.g. MapLibre JSON) are **not** used for the basemap in this stack; any legacy `public/maps/gmf/style.json` in the repo is not required for the current Leaflet implementation.

---

## 2. Delivery targets

1. **Next.js** (`apps/web-next`): route `/map` mounts `EmbeddedFestivalMap`, which loads data from same-origin `/api/map/*` by default.
2. **WordPress** (`apps/wp-map-block`): block `gmf/festival-map` renders a root node; `view.tsx` hydrates `EmbeddedFestivalMap` with JSON props from PHP.
3. **Standalone HTML** (`standalone/`): single `index.html` + `data/*.json`; optional `venue-overlay.png` beside the HTML file. Intended for hosting on any static server (must use **HTTP**, not `file://`, because of `fetch`).

All three should consume the **same JSON shapes** so the live map matches your final uploaded artwork and POI list.

---

## 3. Shared UI (map-ui)

| Export / file | Role |
| ------------- | ---- |
| `EmbeddedFestivalMap` | TanStack Query fetchers for POIs, stages, overlay; passes data to `FestivalMap` |
| `FestivalMap` | Leaflet map, filters, legend, POI markers, **stage markers** (gold, separate layer), image overlay |
| `gmf-design-tokens.css` | Shell colors, typography, filter chips, legend panel (Gasparilla-aligned; sync with Figma when you have variable export) |

Hooks (`usePoisQuery`, `useStagesQuery`, `useOverlayQuery`) call `@gmf/map-data` fetchers. Query keys and cache policies live in `map-core`.

---

## 4. Domain model (`map-core`)

### Coordinates

- POIs and stages use **`coordinates: [lng, lat]`** (longitude first), consistent with GeoJSON.
- Leaflet uses `[lat, lng]` internally; conversion happens in `FestivalMap`.

### Types

Defined in `packages/map-core/src/types.ts`:

- `MapPoi`: `id`, `name`, `category`, `coordinates`, optional `description`, etc.
- `Stage`: `id`, `name`, `coordinates`
- `VenueOverlay`: `type: 'image' | 'geojson'`, `url`, optional `bounds` as `[[lng,lat], [lng,lat]]` (southwest, northeast)

### Categories

- List: `poiCategories` in `categories.ts`
- Marker colors: `poiCategoryColors` in `categoryColors.ts`
- Human-readable legend labels: `poiCategoryLabels` in `categoryLabels.ts`

**Keep CSS variables in `gmf-design-tokens.css` (`--gmf-poi-*`) in sync with `poiCategoryColors`.**

### Defaults

`packages/map-core/src/config.ts`:

- `DEFAULT_CENTER`: `[lng, lat]` for Tampa / GMF demo area
- `DEFAULT_ZOOM`: `15`

---

## 5. JSON API contract

Clients request three resources relative to an **API base URL** (scheme + host, no trailing slash). Paths are fixed:

| Method + path | Response shape |
| ------------- | -------------- |
| `GET {base}/api/map/pois` | `MapPoi[]` |
| `GET {base}/api/map/stages` | `Stage[]` |
| `GET {base}/api/map/overlay` | `VenueOverlay` |

**Next.js implementations** live under:

- `apps/web-next/app/api/map/pois/route.ts`
- `apps/web-next/app/api/map/stages/route.ts`
- `apps/web-next/app/api/map/overlay/route.ts`

**WordPress:** set the block’s **API base URL** to any origin that exposes these three paths (for example your deployed Next app or a static JSON host behind a reverse proxy). Leave empty only when the WordPress site **same origin** serves those routes.

**Caching:** route handlers set `Cache-Control`; TanStack Query policies are in `map-core` `cachePolicies.ts`.

**Overlay image URLs:** When the overlay JSON returns a **root-relative** `url` (e.g. `/maps/gmf/venue-overlay.png`) and the client uses a non-empty **API base URL** (typical WordPress → Next), [`fetchOverlay`](packages/map-data/src/fetchOverlay.ts) prefixes that path with the base so Leaflet requests the image from the API host, not the WordPress origin. Absolute `http(s)://` URLs are left unchanged.

**Demo venue raster:** The Next app ships `apps/web-next/public/maps/gmf/venue-overlay.png` for local demos. Swap in your final map artwork and keep the handler’s `url` + `bounds` aligned. For production you may prefer a full `https://…` URL from the API or a CDN to avoid committing large binaries.

---

## 6. WordPress block

### Registration

- `apps/wp-map-block/src/block.json` — block metadata and **attributes**
- `gmf-map-block.php` — registers `build/` output from `@wordpress/scripts`

### Block attributes

| Attribute | Type | Default | Purpose |
| --------- | ---- | ------- | ------- |
| `height` | number | `640` | Map container height (px) |
| `showLegend` | boolean | `true` | Toggle legend panel |
| `apiBaseUrl` | string | `""` | Origin for `/api/map/*`; empty = same origin as WP. Also used to absolutize root-relative overlay image paths from the API. |
| `centerLat` | number | `27.9514` | Initial map center latitude |
| `centerLng` | number | `-82.4605` | Initial map center longitude |
| `mapZoom` | number | `15` | Initial zoom (12–19 in editor range control) |

### Front-end mount

`render.php` outputs a wrapper `div` with:

- `data-gmf-map-root`
- `data-props` — JSON of the props above (snake_case PHP → camelCase JSON keys as implemented)

`view.tsx` parses `data-props` and renders `<EmbeddedFestivalMap />` inside a React root.

### Editor

`edit.tsx` provides inspector panels: **Map layout**, **Map view**, **Live data** (including short documentation of the three API paths).

---

## 7. Standalone HTML map

Location: **`standalone/`**

| File | Role |
| ---- | ---- |
| `index.html` | Leaflet + OSM + filters + legend; loads POI, overlay, and **stages** JSON via `fetch` |
| `data/pois.json` | POI array (same shape as API) |
| `data/stages.json` | `Stage[]` (same schema as API); rendered as **gold square-ish** circle markers (distinct from POI dots) |
| `data/overlay.json` | `VenueOverlay` JSON; `url` points to `venue-overlay.png` by default |

Place **`venue-overlay.png`** next to `index.html` (or update `overlay.json`). Serve the folder over HTTP, e.g.:

```bash
npx --yes serve standalone
```

---

## 8. Design system & Figma

- **Implementation:** `packages/map-ui/src/tokens/gmf-design-tokens.css` defines surfaces, text, accent, filter/legend chrome, and Leaflet control overrides.
- **Figma:** align with the **“Functionality explanation”** design system under the Gasparilla Music Fest project (`asmattic/gasparilla-music-fest`). When you export or copy Figma variables, update the `:root` custom properties and the matching `poiCategoryColors` entries so markers and legend stay consistent.
- **Standalone:** duplicates key token values inline in `standalone/index.html` for portability.

---

## 9. Related packages

| Package | Responsibility |
| ------- | -------------- |
| `@gmf/map-core` | Types, defaults, query keys, cache policies, categories/colors/labels |
| `@gmf/map-data` | `fetchPois`, `fetchStages`, `fetchOverlay`, `fetchJson` |
| `@gmf/map-ui` | Leaflet map UI, Embedded map with React Query |
| `@gmf/map-sw` | URL classification for SW caching (sprites, glyphs, overlay assets, etc.) |

---

## 10. Verification checklist

- [ ] `pnpm install && pnpm typecheck` passes (GitHub Actions runs this on PRs to `main`)
- [ ] Next: `pnpm --filter @gmf/web-next dev` → `/map` shows OSM, overlay (if PNG exists), POIs
- [ ] WP: block build, install plugin, set API base if needed, confirm front-end markers
- [ ] Standalone: add `venue-overlay.png`, serve folder over HTTP, confirm overlay alignment with bounds
