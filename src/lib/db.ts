import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "waitlist.db");
const db = new Database(dbPath);

// Initialize table
db.exec(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    referrer TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// Initialize analytics events table
db.exec(`
  CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event TEXT NOT NULL,
    data TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface WaitlistEntry {
  id: number;
  email: string;
  referrer: string | null;
  created_at: string;
}

export function addToWaitlist(
  email: string,
  referrer?: string
): { success: boolean; position?: number; error?: string } {
  try {
    const stmt = db.prepare(
      "INSERT INTO waitlist (email, referrer) VALUES (?, ?)"
    );
    stmt.run(email, referrer || null);

    const countStmt = db.prepare("SELECT COUNT(*) as count FROM waitlist");
    const result = countStmt.get() as { count: number };

    return { success: true, position: result.count };
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message.includes("UNIQUE constraint failed")
    ) {
      // Already exists, get their position
      const posStmt = db.prepare(
        "SELECT COUNT(*) as pos FROM waitlist WHERE id <= (SELECT id FROM waitlist WHERE email = ?)"
      );
      const pos = posStmt.get(email) as { pos: number };
      return { success: true, position: pos.pos };
    }
    return { success: false, error: "Failed to join waitlist" };
  }
}

export function getWaitlistCount(): number {
  const stmt = db.prepare("SELECT COUNT(*) as count FROM waitlist");
  const result = stmt.get() as { count: number };
  return result.count;
}

export function trackEvent(event: string, data?: Record<string, unknown>) {
  const stmt = db.prepare("INSERT INTO analytics (event, data) VALUES (?, ?)");
  stmt.run(event, data ? JSON.stringify(data) : null);
}

export default db;
