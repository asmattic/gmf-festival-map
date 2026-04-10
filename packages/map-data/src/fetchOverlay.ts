import type { VenueOverlay } from '@gmf/map-core';
import { fetchJson } from './client';

/** Turn root-relative overlay URLs into absolute URLs when a non-empty API base is set (e.g. WordPress → Next). */
function absolutizeAssetUrl(baseUrl: string, url: string): string {
  if (!baseUrl) return url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('//')) return url;
  const root = baseUrl.replace(/\/$/, '');
  if (url.startsWith('/')) return `${root}${url}`;
  return url;
}

export async function fetchOverlay(baseUrl = ''): Promise<VenueOverlay> {
  const data = await fetchJson<VenueOverlay>(`${baseUrl}/api/map/overlay`);
  if (data.type === 'image' && data.url) {
    return { ...data, url: absolutizeAssetUrl(baseUrl, data.url) };
  }
  return data;
}
