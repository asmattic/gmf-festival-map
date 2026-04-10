import type { MapPoi } from '@gmf/map-core';
import { fetchJson } from './client';

export async function fetchPois(baseUrl = ''): Promise<MapPoi[]> {
  return fetchJson<MapPoi[]>(`${baseUrl}/api/map/pois`);
}
