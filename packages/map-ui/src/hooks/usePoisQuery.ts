'use client';

import { useQuery } from '@tanstack/react-query';
import { cachePolicies, mapQueryKeys } from '@gmf/map-core';
import { fetchPois } from '@gmf/map-data';

export function usePoisQuery(baseUrl = '') {
  return useQuery({
    queryKey: mapQueryKeys.pois,
    queryFn: () => fetchPois(baseUrl),
    ...cachePolicies.pois,
    refetchOnWindowFocus: false
  });
}
