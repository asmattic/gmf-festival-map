'use client';

import { useQuery } from '@tanstack/react-query';
import { cachePolicies, mapQueryKeys } from '@gmf/map-core';
import { fetchStages } from '@gmf/map-data';

export function useStagesQuery(baseUrl = '') {
  return useQuery({
    queryKey: mapQueryKeys.stages,
    queryFn: () => fetchStages(baseUrl),
    ...cachePolicies.stages,
    refetchOnWindowFocus: false
  });
}
