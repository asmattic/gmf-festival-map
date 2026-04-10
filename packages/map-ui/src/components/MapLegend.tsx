import {
  poiCategories,
  poiCategoryColors,
  poiCategoryLabels,
  type PoiCategory
} from '@gmf/map-core';

interface LegendProps {
  /** When true, show a row for performance stage markers (matches FestivalMap stage layer). */
  showStages?: boolean;
}

export function MapLegend({ showStages = false }: LegendProps) {
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
      {showStages ? (
        <>
          <p className="legend-stages-title">Stages</p>
          <ul>
            <li>
              <span className="swatch-stage" aria-hidden />
              Performance stages
            </li>
          </ul>
        </>
      ) : null}
    </div>
  );
}
