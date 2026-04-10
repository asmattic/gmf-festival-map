import type { ScheduleEntry } from '@gmf/map-core';
import { fetchJson } from './client';

export async function fetchSchedule(day: string, baseUrl = ''): Promise<ScheduleEntry[]> {
  return fetchJson<ScheduleEntry[]>(`${baseUrl}/api/map/schedule/${day}`);
}
