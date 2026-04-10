import type { MapPoi } from '@gmf/map-core';

export function normalizePois(input: unknown): MapPoi[] {
  return Array.isArray(input) ? (input as MapPoi[]) : [];
}
