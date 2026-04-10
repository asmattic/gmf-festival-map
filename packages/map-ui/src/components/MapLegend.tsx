import {
  poiCategories,
  poiCategoryColors,
  poiCategoryLabels,
  type PoiCategory
} from '@gmf/map-core';

export function MapLegend() {
  return (
    <div className="gmf-map-legend">
      <strong>Legend</strong>
      <ul>
        {poiCategories.map((category: PoiCategory) => (
          <li key={category}>
            <span
              className="swatch"
              style={{ backgroundColor: poiCategoryColors[category] }}
              aria-hidden
            />
            {poiCategoryLabels[category]}
          </li>
        ))}
      </ul>
    </div>
  );
}
