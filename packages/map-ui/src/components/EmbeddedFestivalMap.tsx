'use client';

import { DEFAULT_CENTER, DEFAULT_ZOOM } from '@gmf/map-core';
import { useOverlayQuery } from '../hooks/useOverlayQuery';
import { usePoisQuery } from '../hooks/usePoisQuery';
import { useStagesQuery } from '../hooks/useStagesQuery';
import { MapLoading } from './MapLoading';
import { FestivalMap } from './FestivalMap';

interface Props {
  apiBaseUrl?: string;
  height?: number;
  showLegend?: boolean;
  /** Longitude, latitude (GeoJSON-style), matching `DEFAULT_CENTER` when omitted */
  centerLng?: number;
  centerLat?: number;
  mapZoom?: number;
}

export function EmbeddedFestivalMap({
  apiBaseUrl = '',
  height = 640,
  showLegend = true,
  centerLng = DEFAULT_CENTER[0],
  centerLat = DEFAULT_CENTER[1],
  mapZoom = DEFAULT_ZOOM
}: Props) {
  const pois = usePoisQuery(apiBaseUrl);
  const stages = useStagesQuery(apiBaseUrl);
  const overlay = useOverlayQuery(apiBaseUrl);

  if (pois.isLoading || stages.isLoading || overlay.isLoading) {
    return <MapLoading />;
  }

  return (
    <FestivalMap
      pois={pois.data ?? []}
      stages={stages.data ?? []}
      overlay={overlay.data ?? null}
      height={height}
      showLegend={showLegend}
      center={[centerLng, centerLat]}
      zoom={mapZoom}
    />
  );
}
