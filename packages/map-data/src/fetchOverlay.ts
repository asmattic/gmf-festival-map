import type { VenueOverlay } from '@gmf/map-core';
import { fetchJson } from './client';

export async function fetchOverlay(baseUrl = ''): Promise<VenueOverlay> {
  return fetchJson<VenueOverlay>(`${baseUrl}/api/map/overlay`);
}
