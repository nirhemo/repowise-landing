"use client";

import { motion } from "framer-motion";
import { Loader2, CheckCircle, Mail, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { trackClick } from "@/lib/analytics";
import { useWaitlist } from "@/context/WaitlistContext";

interface WaitlistCTAProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  location: string; // for analytics
}

export default function WaitlistCTA({
  title = "Join the waitlist",
  subtitle = "Be the first to know when we launch",
  buttonText = "Join Waitlist",
  location
}: WaitlistCTAProps) {
  const { isOnWaitlist, setWaitlistResult } = useWaitlist();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{ success: boolean; error?: string; referralCode?: string; position?: number; isExisting?: boolean } | null>(null);
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    trackClick(`waitlist_submit_${location}`);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ref: refCode }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        setEmail("");
        setWaitlistResult({ referralCode: data.referralCode, position: data.position });
      }
    } catch {
      setResult({ success: false, error: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-slate-900/50 border-y border-slate-800/50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-slate-400 mb-6">{subtitle}</p>

          {isOnWaitlist && !result?.success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-secondary/10 border border-secondary/30 rounded-xl max-w-md mx-auto"
            >
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-6 h-6 text-secondary" />
                <span className="text-secondary font-semibold">
                  You&apos;re already on the waitlist!
                </span>
              </div>
            </motion.div>
          ) : !result?.success ? (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <div className="relative w-full sm:flex-1 group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 transition-colors group-focus-within:text-primary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-500 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/25"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    buttonText
                  )}
                </button>
              </form>
              <p className="text-slate-500 text-xs mt-3">No spam, ever. Unsubscribe anytime.</p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-secondary/10 border border-secondary/30 rounded-xl max-w-md mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-secondary" />
                <span className="text-secondary font-semibold">
                  {result.isExisting ? "You're already registered!" : "You're in!"}
                </span>
              </div>
              {result.position && (
                <p className="text-slate-400 text-sm text-center mb-4">
                  You&apos;re <span className="text-white font-semibold">#{result.position}</span> on the waitlist. Share to move up.
                </p>
              )}

              {result.referralCode && (
                <div className="border-t border-secondary/20 pt-4 mt-2">
                  <p className="text-slate-400 text-sm mb-3 flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Refer friends to skip the line
                  </p>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      readOnly
                      value={`https://www.repowise.ai?ref=${result.referralCode}`}
                      className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 truncate"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`I just joined the RepoWise waitlist. It auto-syncs codebase context to your AI tools on every merge. Works with Cursor, Claude, Copilot, whatever you use.\n\nWaitlist is open: https://www.repowise.ai?ref=${result.referralCode}`);
                        setCopied(true);
                        trackClick(`referral_copy_${location}`);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="px-3 py-2 bg-primary hover:bg-primary-500 text-white rounded-lg transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.repowise.ai?ref=${result.referralCode}`)}&summary=${encodeURIComponent("I just joined the RepoWise waitlist. It auto-syncs codebase context to your AI tools on every merge.\n\nThe problem: AI reads code but misses architecture, patterns, and team conventions.\n\nRepoWise watches your production branch and keeps everything current. Works with Cursor, Claude, Copilot, and more.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick(`referral_linkedin_${location}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just joined the RepoWise waitlist. Auto-syncs codebase context to AI tools on every merge.\n\nWorks with Cursor, Claude, Copilot. Waitlist is open 👇")}&url=${encodeURIComponent(`https://www.repowise.ai?ref=${result.referralCode}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick(`referral_twitter_${location}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                      X
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {result?.error && (
            <p className="text-red-400 text-sm mt-3">{result.error}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
