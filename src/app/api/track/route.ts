import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

const ANALYTICS_BLOB = "analytics.json";

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
    console.error("Error reading analytics:", error);
    return [];
  }
}

async function saveAnalytics(events: AnalyticsEvent[]): Promise<void> {
  // Keep only last 1000 events to prevent blob from growing too large
  const trimmedEvents = events.slice(-1000);
  await put(ANALYTICS_BLOB, JSON.stringify(trimmedEvents, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, data } = body;

    if (!event || typeof event !== "string") {
      return NextResponse.json(
        { success: false, error: "Event name is required" },
        { status: 400 }
      );
    }

    const events = await getAnalytics();
    events.push({
      event,
      timestamp: new Date().toISOString(),
      data: data || undefined,
    });

    await saveAnalytics(events);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
