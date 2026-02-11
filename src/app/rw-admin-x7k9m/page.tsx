"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type WaitlistEntry = {
  email: string;
  timestamp: string;
  referrer: string | null;
  referralCode: string;
  referredBy: string | null;
  emailSent?: boolean;
};

type AnalyticsEvent = {
  event: string;
  timestamp: string;
  data?: Record<string, string>;
};

export default function AdminPage() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [sendingEmails, setSendingEmails] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    // Check if authenticated
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth/check");
        if (res.ok) {
          setAuthenticated(true);
          fetchData();
        } else {
          router.push("/rw-admin-x7k9m/login");
        }
      } catch {
        router.push("/rw-admin-x7k9m/login");
      }
    }

    checkAuth();
  }, [router]);

  async function fetchData() {
    try {
      // Fetch waitlist
      const wlRes = await fetch("/api/admin/waitlist");
      if (wlRes.ok) {
        const wlData = await wlRes.json();
        setWaitlist(wlData.entries || []);
      }

      // Fetch analytics
      const anRes = await fetch("/api/admin/analytics");
      if (anRes.ok) {
        const anData = await anRes.json();
        setAnalytics(anData.events || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/rw-admin-x7k9m/login");
  }

  async function handleResendEmail(email: string) {
    // Add to sending state
    setSendingEmails(prev => new Set(prev).add(email));
    
    try {
      const res = await fetch("/api/admin/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        // Update local state to show as sent
        setWaitlist(prev => prev.map(entry => 
          entry.email === email ? { ...entry, emailSent: true } : entry
        ));
      } else {
        const data = await res.json();
        alert(`Failed: ${data.error}`);
      }
    } catch {
      alert("Failed to send email");
    } finally {
      // Remove from sending state
      setSendingEmails(prev => {
        const next = new Set(prev);
        next.delete(email);
        return next;
      });
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <img
              src="/images/logo-icon.jpg"
              alt="RepoWise"
              className="h-10 w-auto rounded-lg"
            />
            <h1 className="text-3xl font-bold">Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Waitlist Signups</p>
            <p className="text-3xl font-bold text-primary">{waitlist.length}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Referrals</p>
            <p className="text-3xl font-bold text-green-400">
              {waitlist.filter(w => w.referredBy).length}
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Click Events</p>
            <p className="text-3xl font-bold text-secondary">{analytics.length}</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm">CTA Clicks</p>
            <p className="text-3xl font-bold text-accent">
              {analytics.filter(a => a.event.includes("waitlist")).length}
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Share Clicks</p>
            <p className="text-3xl font-bold text-white">
              {analytics.filter(a => a.event.includes("referral")).length}
            </p>
          </div>
        </div>

        {/* Waitlist Table */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Waitlist ({waitlist.length})</h2>
          {waitlist.length === 0 ? (
            <p className="text-slate-400">No signups yet</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-sm">
                  <th className="pb-2">#</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Referred By</th>
                  <th className="pb-2">Referrals</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {waitlist.map((entry, i) => {
                  const referralCount = waitlist.filter(w => w.referredBy === entry.email).length;
                  return (
                    <tr key={entry.email} className="border-t border-slate-700">
                      <td className="py-2 text-slate-500">{i + 1}</td>
                      <td className="py-2">{entry.email}</td>
                      <td className="py-2 text-slate-400">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-2 text-slate-500 text-sm">
                        {entry.referredBy || "-"}
                      </td>
                      <td className="py-2">
                        {referralCount > 0 ? (
                          <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                            {referralCount}
                          </span>
                        ) : (
                          <span className="text-slate-600">0</span>
                        )}
                      </td>
                      <td className="py-2">
                        {entry.emailSent ? (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                            Sent
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-2">
                        <button
                          onClick={() => handleResendEmail(entry.email)}
                          disabled={sendingEmails.has(entry.email)}
                          className={`px-2 py-1 text-white text-xs rounded min-w-[70px] ${
                            sendingEmails.has(entry.email)
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-500"
                          }`}
                        >
                          {sendingEmails.has(entry.email) ? (
                            <span className="flex items-center justify-center gap-1">
                              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending
                            </span>
                          ) : entry.emailSent ? "Resend" : "Send"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Analytics Events */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Events ({analytics.length})</h2>
          {analytics.length === 0 ? (
            <p className="text-slate-400">No events tracked yet</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {analytics.slice(-50).reverse().map((event, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-700">
                  <span className="text-sm">
                    <span className="text-primary">{event.event}</span>
                  </span>
                  <span className="text-slate-500 text-xs">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
