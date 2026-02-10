"use client";

import { useEffect, useState } from "react";

type WaitlistEntry = {
  email: string;
  timestamp: string;
  referrer: string | null;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">RepoWise Admin</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Waitlist Signups</p>
            <p className="text-3xl font-bold text-primary">{waitlist.length}</p>
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
            <p className="text-slate-400 text-sm">Nav Clicks</p>
            <p className="text-3xl font-bold text-white">
              {analytics.filter(a => a.event.includes("nav_")).length}
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
                  <th className="pb-2">Referrer</th>
                </tr>
              </thead>
              <tbody>
                {waitlist.map((entry, i) => (
                  <tr key={entry.email} className="border-t border-slate-700">
                    <td className="py-2 text-slate-500">{i + 1}</td>
                    <td className="py-2">{entry.email}</td>
                    <td className="py-2 text-slate-400">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-2 text-slate-500 text-sm">
                      {entry.referrer || "-"}
                    </td>
                  </tr>
                ))}
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

        {/* Plausible Link */}
        <div className="mt-8 text-center">
          <a
            href="https://plausible.io/repowise.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View full analytics on Plausible →
          </a>
        </div>
      </div>
    </div>
  );
}
