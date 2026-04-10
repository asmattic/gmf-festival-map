# Standalone festival map

This folder is a **zero-build** copy of the map: Leaflet, OpenStreetMap, the same POI/overlay JSON shapes as `GET /api/map/pois` and `GET /api/map/overlay`.

## Files

| File | Purpose |
| ---- | ------- |
| `index.html` | Map page (loads Leaflet from CDN) |
| `data/pois.json` | POI list |
| `data/stages.json` | Sample stages (same schema as API; extend `index.html` if you need stage markers) |
| `data/overlay.json` | Venue overlay metadata (`url` + `bounds`) |
| `venue-overlay.png` | **You add this** — final venue map raster; path must match `overlay.json` |

## Run locally

Browsers block `fetch` from `file://`. Serve the directory:

```bash
cd standalone
npx --yes serve .
```

Then open the URL printed in the terminal.

## Docs

- [Documentation index](../docs/INDEX.md)
- [MAP-IMPLEMENTATION.md](../docs/MAP-IMPLEMENTATION.md#7-standalone-html-map)
