import { NextRequest, NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';

const WAITLIST_BLOB = 'waitlist.json';

type WaitlistEntry = {
  email: string;
  timestamp: string;
  referrer: string | null;
  referralCode?: string;
  referredBy?: string | null;
  emailSent?: boolean;
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

// DELETE /api/admin/waitlist?email=xxx - Remove email from waitlist
export async function DELETE(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    
    const waitlist = await getWaitlist();
    const initialLength = waitlist.length;
    const filtered = waitlist.filter(w => w.email.toLowerCase() !== email.toLowerCase());
    
    if (filtered.length === initialLength) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }
    
    await put(WAITLIST_BLOB, JSON.stringify(filtered, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    
    return NextResponse.json({ 
      success: true, 
      message: `Removed ${email}`,
      remaining: filtered.length 
    });
  } catch (error) {
    console.error('Admin delete error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
