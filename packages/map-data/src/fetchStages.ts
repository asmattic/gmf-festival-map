import type { Stage } from '@gmf/map-core';
import { fetchJson } from './client';

export async function fetchStages(baseUrl = ''): Promise<Stage[]> {
  return fetchJson<Stage[]>(`${baseUrl}/api/map/stages`);
}
