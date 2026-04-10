'use client';

import { poiCategories, poiCategoryLabels, type PoiCategory } from '@gmf/map-core';

interface Props {
  selected: PoiCategory[];
  onToggle: (category: PoiCategory) => void;
}

export function MapFilters({ selected, onToggle }: Props) {
  return (
    <div className="gmf-map-filters">
      {poiCategories.map((category) => {
        const active = selected.includes(category);
        return (
          <button
            type="button"
            key={category}
            aria-pressed={active}
            onClick={() => onToggle(category)}
          >
            {poiCategoryLabels[category]}
          </button>
        );
      })}
    </div>
  );
}
