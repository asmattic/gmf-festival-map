export type PoiCategory =
  | 'stage'
  | 'food'
  | 'bar'
  | 'restroom'
  | 'entrance'
  | 'parking'
  | 'merch'
  | 'info'
  | 'medical'
  | 'vip';

export interface MapPoi {
  id: string;
  name: string;
  category: PoiCategory;
  coordinates: [number, number];
  description?: string;
  openNow?: boolean;
  stageId?: string;
  icon?: string;
}

export interface Stage {
  id: string;
  name: string;
  coordinates: [number, number];
  description?: string;
}

export interface ScheduleEntry {
  id: string;
  artistName: string;
  stageId: string;
  startsAt: string;
  endsAt: string;
}

export interface VenueOverlay {
  type: 'image' | 'geojson';
  url: string;
  bounds?: [[number, number], [number, number]];
}
