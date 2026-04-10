import { NextResponse } from 'next/server';
import type { MapPoi } from '@gmf/map-core';

const pois: MapPoi[] = [
  {
    id: 'stage-main',
    name: 'Main Stage',
    category: 'stage',
    coordinates: [-82.4605, 27.9516]
  },
  {
    id: 'restroom-a',
    name: 'Restrooms North',
    category: 'restroom',
    coordinates: [-82.4612, 27.9519]
  },
  {
    id: 'food-1',
    name: 'Arepa Stand',
    category: 'food',
    coordinates: [-82.4599, 27.9511]
  }
];

export async function GET() {
  return NextResponse.json(pois, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
    }
  });
}
