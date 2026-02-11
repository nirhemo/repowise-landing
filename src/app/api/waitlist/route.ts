import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';
import crypto from 'crypto';
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

function generateReferralCode(email: string): string {
  const hash = crypto.createHash('md5').update(email).digest('hex');
  return hash.substring(0, 8);
}

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
    allowOverwrite: true,
  });
}

// POST /api/waitlist - Add email to waitlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, referrer, ref } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const waitlist = await getWaitlist();
    const referralCode = generateReferralCode(email.toLowerCase());
    
    // Check if email already exists
    const existingIndex = waitlist.findIndex(w => w.email.toLowerCase() === email.toLowerCase());
    if (existingIndex !== -1) {
      const existing = waitlist[existingIndex];
      let needsSave = false;
      
      // Generate referral code if doesn't exist (for old entries)
      if (!existing.referralCode) {
        existing.referralCode = generateReferralCode(existing.email);
        needsSave = true;
      }
      
      // Send welcome email if not sent yet (for old entries before email feature)
      if (!existing.emailSent) {
        existing.emailSent = true;
        needsSave = true;
        sendWelcomeEmail(existing.email, existing.referralCode).catch((err) => {
          console.error('Failed to send welcome email:', err);
        });
      }
      
      if (needsSave) {
        waitlist[existingIndex] = existing;
        await saveWaitlist(waitlist);
      }
      
      return NextResponse.json({ 
        success: true,
        message: 'Already on the waitlist!',
        referralCode: existing.referralCode,
      });
    }

    // Find who referred them (if any)
    let referredBy: string | null = null;
    if (ref) {
      const referrerEntry = waitlist.find(w => w.referralCode === ref);
      if (referrerEntry) {
        referredBy = referrerEntry.email;
      }
    }

    // Add new entry
    waitlist.push({
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
      referrer: referrer || null,
      referralCode,
      referredBy,
      emailSent: true,
    });

    await saveWaitlist(waitlist);

    // Send welcome email (don't await to avoid slowing down response)
    sendWelcomeEmail(email.toLowerCase(), referralCode).catch((err) => {
      console.error('Failed to send welcome email:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Welcome to the waitlist!',
      referralCode,
    }, { status: 201 });

  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
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
