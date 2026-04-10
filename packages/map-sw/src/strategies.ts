export const CACHE_PREFIX = 'gmf-map';

export function isImmutableAsset(url: string) {
  return /sprite|glyphs|\.pmtiles$|style\.json$/.test(url);
}
