import { NextResponse } from 'next/server';
import type { Stage } from '@gmf/map-core';

const stages: Stage[] = [
  {
    id: 'main',
    name: 'Main Stage',
    coordinates: [-82.4605, 27.9516]
  }
];

export async function GET() {
  return NextResponse.json(stages, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
