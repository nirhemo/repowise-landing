import { NextRequest, NextResponse } from "next/server";
import { trackEvent } from "@/lib/db";

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

    trackEvent(event, data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
