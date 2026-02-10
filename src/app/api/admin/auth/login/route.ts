import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

// Admin credentials from environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@repowise.ai";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password required" },
        { status: 400 }
      );
    }

    // Check credentials
    const passwordHash = hashPassword(password);
    
    if (email !== ADMIN_EMAIL || passwordHash !== ADMIN_PASSWORD_HASH) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session token
    const sessionToken = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", `${sessionToken}:${expiry}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
