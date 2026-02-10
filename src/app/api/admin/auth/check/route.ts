import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || !session.value) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    // Check if session is valid (has expiry and not expired)
    const parts = session.value.split(":");
    if (parts.length !== 2) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const expiry = parseInt(parts[1], 10);
    if (Date.now() > expiry) {
      return NextResponse.json(
        { authenticated: false, error: "Session expired" },
        { status: 401 }
      );
    }

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    );
  }
}
