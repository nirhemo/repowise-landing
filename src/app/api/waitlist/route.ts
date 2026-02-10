import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

const WAITLIST_BLOB = 'waitlist.json';

type WaitlistEntry = {
  email: string;
  timestamp: string;
  referrer: string | null;
};

// Read waitlist from Blob
async function getWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const { blobs } = await list({ prefix: WAITLIST_BLOB });
    if (blobs.length === 0) {
      return [];
    }
    const response = await fetch(blobs[0].url);
    const data = await response.json();
    return data as WaitlistEntry[];
  } catch (error) {
    console.error('Error reading waitlist:', error);
    return [];
  }
}

// Save waitlist to Blob
async function saveWaitlist(waitlist: WaitlistEntry[]): Promise<void> {
  await put(WAITLIST_BLOB, JSON.stringify(waitlist, null, 2), {
    access: 'public',
    addRandomSuffix: false,
  });
}

// POST /api/waitlist - Add email to waitlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, referrer } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const waitlist = await getWaitlist();
    
    // Check if email already exists
    const existing = waitlist.find(w => w.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      const position = waitlist.findIndex(w => w.email.toLowerCase() === email.toLowerCase()) + 1;
      return NextResponse.json({ 
        success: true,
        message: 'Already on the waitlist!',
        position,
        total: waitlist.length
      });
    }

    // Add new entry
    waitlist.push({
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
      referrer: referrer || null
    });

    await saveWaitlist(waitlist);

    return NextResponse.json({
      success: true,
      message: 'Welcome to the waitlist!',
      position: waitlist.length,
      total: waitlist.length
    }, { status: 201 });

  } catch (error) {
    console.error('Waitlist error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to join waitlist',
      details: errorMessage,
      hasToken: !!process.env.BLOB_READ_WRITE_TOKEN
    }, { status: 500 });
  }
}

// GET /api/waitlist - Get waitlist stats (no emails exposed publicly)
export async function GET(request: NextRequest) {
  try {
    const waitlist = await getWaitlist();
    
    // Check for admin key to get full list
    const adminKey = request.nextUrl.searchParams.get('admin');
    if (adminKey === process.env.ADMIN_KEY) {
      return NextResponse.json({
        total: waitlist.length,
        entries: waitlist
      });
    }
    
    return NextResponse.json({
      total: waitlist.length,
      lastSignup: waitlist.length > 0 ? waitlist[waitlist.length - 1].timestamp : null
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 });
  }
}
