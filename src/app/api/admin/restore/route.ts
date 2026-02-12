import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

const WAITLIST_BLOB = 'waitlist.json';

// One-time restore endpoint - delete after use
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entries, secret } = body;

    // Simple protection
    if (secret !== 'restore-2026-02-12') {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    if (!entries || !Array.isArray(entries)) {
      return NextResponse.json({ error: 'Entries array required' }, { status: 400 });
    }

    await put(WAITLIST_BLOB, JSON.stringify(entries, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    return NextResponse.json({ 
      success: true, 
      message: `Restored ${entries.length} entries` 
    });
  } catch (error) {
    console.error('Restore error:', error);
    return NextResponse.json({ error: 'Failed to restore' }, { status: 500 });
  }
}
