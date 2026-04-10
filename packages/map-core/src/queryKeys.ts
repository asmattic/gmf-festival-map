export const mapQueryKeys = {
  pois: ['map', 'pois'] as const,
  stages: ['map', 'stages'] as const,
  overlay: ['map', 'overlay'] as const,
  schedule: (day: string) => ['map', 'schedule', day] as const
};
