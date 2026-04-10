# Key decisions

## 1. Next app + WordPress block, not one or the other

The map is a product surface, not just a CMS fragment. Building only as a WordPress block would make richer mobile UX, deep linking, kiosk mode, and future standalone evolution harder.

## 2. Shared React map runtime

The same `EmbeddedFestivalMap` and `FestivalMap` components render in both delivery targets. This avoids divergence in behavior and styling.

## 3. TanStack Query for server-state, not everything

TanStack Query is used only where it adds value: remote data synchronization, staleness policy, retries, cache invalidation, and background refresh.

## 4. Service Worker for offline/static assets

Trying to make TanStack Query or framework data cache own binary tile and style assets is the wrong abstraction boundary.

## 5. Keep WordPress thin

The block plugin exposes editor controls and mounts the shared map UI. It does not own the domain model.

## 6. Leaflet + OpenStreetMap for the basemap

The festival map is **not** tied to Grandstand or other hosted map products. **Leaflet** with **OSM** standard tiles keeps the stack portable, WordPress-friendly, and easy to mirror in a **standalone HTML** page. Vector tile / MapLibre-style basemaps are out of scope unless we add them later as an optional layer.

## 7. Standalone HTML delivery

The `standalone/` directory documents and reproduces the same POI and overlay contract without React or Next.js, for simple static hosting or vendor handoff.

## 8. Design tokens file alongside Figma

Visual chrome for filters, legend, and shell lives in `packages/map-ui/src/tokens/gmf-design-tokens.css`, documented to stay aligned with the Gasparilla Figma design system (variable values should be reconciled when exports are available).
