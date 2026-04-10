'use client';

import { useQuery } from '@tanstack/react-query';
import { cachePolicies, mapQueryKeys } from '@gmf/map-core';
import { fetchSchedule } from '@gmf/map-data';

export function useScheduleQuery(day: string, baseUrl = '') {
  return useQuery({
    queryKey: mapQueryKeys.schedule(day),
    queryFn: () => fetchSchedule(day, baseUrl),
    ...cachePolicies.schedule,
    enabled: Boolean(day),
    refetchOnWindowFocus: false
  });
}
