'use client';

import { useQuery } from '@tanstack/react-query';
import { cachePolicies, mapQueryKeys } from '@gmf/map-core';
import { fetchOverlay } from '@gmf/map-data';

export function useOverlayQuery(baseUrl = '') {
  return useQuery({
    queryKey: mapQueryKeys.overlay,
    queryFn: () => fetchOverlay(baseUrl),
    ...cachePolicies.overlay,
    refetchOnWindowFocus: false
  });
}
