import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

const WAITLIST_BLOB = 'waitlist.json';

type WaitlistEntry = {
  email: string;
  timestamp: string;
  referrer: string | null;
};

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

export async function GET() {
  try {
    const waitlist = await getWaitlist();
    return NextResponse.json({
      total: waitlist.length,
      entries: waitlist
    });
  } catch (error) {
    console.error('Admin waitlist error:', error);
    return NextResponse.json({ error: 'Failed to get waitlist' }, { status: 500 });
  }
}
