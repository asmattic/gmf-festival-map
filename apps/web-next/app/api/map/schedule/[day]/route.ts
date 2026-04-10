import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  context: { params: Promise<{ day: string }> }
) {
  const { day } = await context.params;

  return NextResponse.json([
    {
      id: `${day}-slot-1`,
      artistName: 'Example Artist',
      stageId: 'main',
      startsAt: `${day}T18:00:00-04:00`,
      endsAt: `${day}T19:00:00-04:00`
    }
  ], {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
    }
  });
}
