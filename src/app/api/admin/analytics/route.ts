import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

const ANALYTICS_BLOB = 'analytics.json';

type AnalyticsEvent = {
  event: string;
  timestamp: string;
  data?: Record<string, string>;
};

async function getAnalytics(): Promise<AnalyticsEvent[]> {
  try {
    const { blobs } = await list({ prefix: ANALYTICS_BLOB });
    if (blobs.length === 0) {
      return [];
    }
    const response = await fetch(blobs[0].url);
    const data = await response.json();
    return data as AnalyticsEvent[];
  } catch (error) {
    console.error('Error reading analytics:', error);
    return [];
  }
}

export async function GET() {
  try {
    const events = await getAnalytics();
    return NextResponse.json({
      total: events.length,
      events: events
    });
  } catch (error) {
    console.error('Admin analytics error:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
}
