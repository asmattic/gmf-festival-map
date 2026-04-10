import type { PoiCategory } from './types';

/**
 * POI marker colors — keep in sync with `packages/map-ui/src/tokens/gmf-design-tokens.css`
 * (`--gmf-poi-*`). Swap hex values to match Figma variables from the Gasparilla design system.
 */
export const poiCategoryColors: Record<PoiCategory, string> = {
  stage: '#c17f2b',
  food: '#2e8b57',
  bar: '#6b4e9b',
  restroom: '#3b6fb6',
  entrance: '#22a860',
  parking: '#64748b',
  merch: '#c44c7a',
  info: '#0ea5e9',
  medical: '#dc2626',
  vip: '#b8860b'
};

export function poiCategoryColor(category: PoiCategory): string {
  return poiCategoryColors[category];
}
