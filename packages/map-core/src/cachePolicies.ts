export const cachePolicies = {
  overlay: {
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24
  },
  pois: {
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 30
  },
  stages: {
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24
  },
  schedule: {
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 15
  }
} as const;
