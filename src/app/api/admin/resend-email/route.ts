import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';
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

    // Send email (don't save waitlist to avoid race conditions - emailSent flag is already set on signup)
    await sendWelcomeEmail(entry.email, entry.referralCode);

    return NextResponse.json({ success: true, message: `Email sent to ${email}` });
  } catch (error) {
    console.error('Resend email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
