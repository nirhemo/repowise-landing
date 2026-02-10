import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(WAITLIST_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read waitlist
function getWaitlist(): Array<{ email: string; timestamp: string; referrer: string | null }> {
  ensureDataDir();
  if (!fs.existsSync(WAITLIST_FILE)) {
    return [];
  }
  const data = fs.readFileSync(WAITLIST_FILE, 'utf-8');
  return JSON.parse(data);
}

// Save waitlist
function saveWaitlist(waitlist: Array<{ email: string; timestamp: string; referrer: string | null }>) {
  ensureDataDir();
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));
}

// POST /api/waitlist - Add email to waitlist
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, referrer } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const waitlist = getWaitlist();
    
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

    saveWaitlist(waitlist);

    return NextResponse.json({
      success: true,
      message: 'Welcome to the waitlist!',
      position: waitlist.length,
      total: waitlist.length
    }, { status: 201 });

  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}

// GET /api/waitlist - Get waitlist stats (no emails exposed)
export async function GET() {
  try {
    const waitlist = getWaitlist();
    return NextResponse.json({
      total: waitlist.length,
      lastSignup: waitlist.length > 0 ? waitlist[waitlist.length - 1].timestamp : null
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 });
  }
}
