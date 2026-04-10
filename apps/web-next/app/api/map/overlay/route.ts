import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    type: 'image',
    url: '/maps/gmf/venue-overlay.png',
    bounds: [
      [-82.4621, 27.9505],
      [-82.4587, 27.9527]
    ]
  }, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'
    }
  });
}
