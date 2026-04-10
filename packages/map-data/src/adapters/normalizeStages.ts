import type { Stage } from '@gmf/map-core';

export function normalizeStages(input: unknown): Stage[] {
  return Array.isArray(input) ? (input as Stage[]) : [];
}
