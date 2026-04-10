# Documentation index

Start here for navigation across all repo documentation.

| Document | Purpose |
| -------- | ------- |
| [README.md](../README.md) | Monorepo overview, install, dev scripts |
| [MAP-IMPLEMENTATION.md](./MAP-IMPLEMENTATION.md) | **Canonical reference**: Leaflet/OSM stack, data/API contract, WordPress block settings, standalone HTML, design tokens |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Repo layout, caching boundaries, delivery targets |
| [DECISIONS.md](./DECISIONS.md) | Product and technical decision log |
| [CODEX-HANDOFF.md](./CODEX-HANDOFF.md) | Quick onboarding checklist for agents and new contributors |

## Topic → where to read

| Topic | Primary doc | Also see |
| ----- | ----------- | -------- |
| Basemap (OpenStreetMap, Leaflet) | [MAP-IMPLEMENTATION §1](./MAP-IMPLEMENTATION.md#1-map-rendering-stack) | [DECISIONS.md](./DECISIONS.md) |
| POI categories, colors, labels | [MAP-IMPLEMENTATION §4](./MAP-IMPLEMENTATION.md#4-domain-model-map-core) | `packages/map-core/src/categoryColors.ts`, `categoryLabels.ts` |
| JSON API for live map | [MAP-IMPLEMENTATION §5](./MAP-IMPLEMENTATION.md#5-json-api-contract) | `apps/web-next/app/api/map/*` |
| WordPress block attributes & editor | [MAP-IMPLEMENTATION §6](./MAP-IMPLEMENTATION.md#6-wordpress-block) | `apps/wp-map-block/src/block.json`, `edit.tsx`, `render.php` |
| Standalone HTML (no build) | [MAP-IMPLEMENTATION §7](./MAP-IMPLEMENTATION.md#7-standalone-html-map) | `standalone/README.md` |
| UI shell & Figma token alignment | [MAP-IMPLEMENTATION §8](./MAP-IMPLEMENTATION.md#8-design-system--figma) | `packages/map-ui/src/tokens/gmf-design-tokens.css` |
| Shared React map components | [MAP-IMPLEMENTATION §3](./MAP-IMPLEMENTATION.md#3-shared-ui-map-ui) | `packages/map-ui/src/components/` |
| Package responsibilities | [ARCHITECTURE.md](./ARCHITECTURE.md) | — |
| What not to do | [CODEX-HANDOFF.md](./CODEX-HANDOFF.md#what-not-to-do) | — |

## Source tree (high level)

```
apps/web-next/          Next.js app, `/map`, API routes under `app/api/map/`
apps/wp-map-block/      WordPress plugin (block + build)
packages/map-core/      Types, defaults, query keys, POI colors/labels
packages/map-data/      Fetch helpers for POIs, stages, overlay
packages/map-ui/        FestivalMap (Leaflet), EmbeddedFestivalMap, tokens CSS
packages/map-sw/        Service worker helpers (static assets)
standalone/             Static HTML + sample JSON (optional venue PNG)
docs/                   This documentation set
```

Maintainers: when you add a new major doc file, link it from this index and from the README **Docs** section.
