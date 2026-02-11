"use client";

import { motion } from "framer-motion";
import { Loader2, CheckCircle, Mail, Share2, Copy, Check, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { trackClick } from "@/lib/analytics";
import { useWaitlist } from "@/context/WaitlistContext";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    position?: number;
    error?: string;
    referralCode?: string;
  } | null>(null);
  const { setWaitlistResult } = useWaitlist();
  const fullText = "repowise watching main...";
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowOutput(true), 300);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    trackClick("waitlist_submit");

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
    <section className="relative min-h-screen flex items-center justify-center gradient-hero pt-16 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary blob */}
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-blob"
        />
        {/* Secondary blob */}
        <div 
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[80px] animate-blob-delayed"
        />
        {/* Accent blob */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-blob-slow"
        />
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="mb-6">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full">RepoWise — The Context Engine</span>
            <span className="text-white text-4xl sm:text-5xl md:text-6xl font-bold block leading-tight">Your AI finally understands<br />your codebase</span>
          </h1>

          <p className="body-lg mb-8 max-w-2xl mx-auto">
            The always-on context layer between your codebase and AI. Auto-syncs on every merge.
          </p>

          {/* Referred user welcome */}
          {refCode && !result?.success && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-secondary text-sm font-medium mb-4 inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full"
            >
              A friend invited you — join the waitlist for priority access together
            </motion.p>
          )}

          {/* Waitlist Form */}
          <div id="hero-form" />
          {!result?.success ? (
            <>
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2 max-w-md mx-auto"
              >
                <div className="relative w-full sm:w-auto sm:flex-1 group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 transition-colors group-focus-within:text-primary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => trackClick("waitlist_cta")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-500 text-white font-semibold rounded-xl transition-all duration-300 btn-glow disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/25"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Get Early Access"
                  )}
                </button>
              </motion.form>
              <p className="text-slate-500 text-xs mb-4">No spam, ever. Free during early access.</p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 p-6 bg-secondary/10 border border-secondary/30 rounded-xl max-w-md mx-auto backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-secondary" />
                <span className="text-secondary font-semibold">
                  You&apos;re in!
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
                    <div className="relative">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`I just joined the RepoWise waitlist — it auto-syncs codebase context to your AI tools on every merge. Works with Cursor, Claude, Copilot, whatever you use.

Waitlist is open: https://www.repowise.ai?ref=${result.referralCode}`);
                          setCopied(true);
                          trackClick("referral_copy");
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="px-3 py-2 bg-primary hover:bg-primary-500 text-white rounded-lg transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      {copied && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap shadow-lg border border-slate-700 animate-fade-in">
                          Your referral link is copied!
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.repowise.ai?ref=${result.referralCode}`)}&summary=${encodeURIComponent("I just joined the RepoWise waitlist — it auto-syncs codebase context to your AI tools on every merge.\n\nThe problem: AI reads code but misses architecture, patterns, and team conventions.\n\nRepoWise watches your production branch and keeps everything current. Works with Cursor, Claude, Copilot, and more.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick("referral_linkedin")}
                      className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just joined the RepoWise waitlist — auto-syncs codebase context to AI tools on every merge.\n\nWorks with Cursor, Claude, Copilot. Waitlist is open 👇")}&url=${encodeURIComponent(`https://www.repowise.ai?ref=${result.referralCode}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick("referral_twitter")}
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
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm mb-4"
            >
              {result.error}
            </motion.p>
          )}

          {/* Trust signal */}
          <p className="text-slate-500 text-xs flex items-center justify-center gap-1.5 mt-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Your code never leaves your repo. We analyze structure, not source.
          </p>
        </motion.div>

        {/* Animated Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg mx-auto"
        >
          <div className="relative group">
            {/* Glow effect behind terminal */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
            
            <div className="relative bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
                </div>
                <span className="ml-3 text-sm text-slate-500 font-mono">Terminal</span>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-left min-h-[140px]">
                <div className="flex items-center">
                  <span className="text-secondary">$</span>
                  <span className="ml-2 text-slate-300">{displayText}</span>
                  <span className="cursor-blink text-primary ml-0.5 font-bold">▋</span>
                </div>

                {showOutput && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-5 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-secondary">✓</span>
                      <span className="text-slate-300">Merge detected on main</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-slate-500 text-sm pl-5"
                    >
                      Updating context for 12 changed files...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2 pt-1"
                    >
                      <span className="text-primary">✓</span>
                      <span className="text-slate-400 text-sm">Context synced — AI tools updated</span>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
}
