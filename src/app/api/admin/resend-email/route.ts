import { NextRequest, NextResponse } from 'next/server';
import { list, put } from '@vercel/blob';
import { sendWelcomeEmail } from '@/lib/email';

const WAITLIST_BLOB = 'waitlist.json';

type WaitlistEntry = {
  email: string;
  timestamp: string;
  referrer: string | null;
  referralCode: string;
  referredBy: string | null;
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

async function saveWaitlist(waitlist: WaitlistEntry[]): Promise<void> {
  await put(WAITLIST_BLOB, JSON.stringify(waitlist, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const waitlist = await getWaitlist();
    const entryIndex = waitlist.findIndex(w => w.email.toLowerCase() === email.toLowerCase());

    if (entryIndex === -1) {
      return NextResponse.json({ error: 'Email not found in waitlist' }, { status: 404 });
    }

    const entry = waitlist[entryIndex];

    // Send email
    await sendWelcomeEmail(entry.email, entry.referralCode);

    // Mark as sent
    entry.emailSent = true;
    waitlist[entryIndex] = entry;
    await saveWaitlist(waitlist);

    return NextResponse.json({ success: true, message: `Email sent to ${email}` });
  } catch (error) {
    console.error('Resend email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
