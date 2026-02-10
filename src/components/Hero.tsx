"use client";

import { motion } from "framer-motion";
import { Star, Loader2, CheckCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trackClick } from "@/lib/analytics";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    position?: number;
    error?: string;
  } | null>(null);
  const fullText = "npx repowise create";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

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
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        setEmail("");
      }
    } catch {
      setResult({ success: false, error: "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Your codebase,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              understood by AI
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Generate living context documentation that keeps AI agents in sync
            with your code
          </p>

          {/* Waitlist Form */}
          {!result?.success ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 max-w-md mx-auto"
            >
              <div className="relative w-full sm:w-auto sm:flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => trackClick("waitlist_cta")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-500 text-white font-semibold rounded-lg transition-all duration-300 hover:glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Join Waitlist"
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 1, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 mb-4 p-4 bg-secondary/10 border border-secondary/30 rounded-lg max-w-md mx-auto"
            >
              <CheckCircle className="w-6 h-6 text-secondary" />
              <span className="text-secondary font-semibold">
                Thanks! You&apos;re #{result.position} on the list
              </span>
            </motion.div>
          )}

          {result?.error && (
            <p className="text-red-400 text-sm mb-4">{result.error}</p>
          )}

          {/* Secondary info */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="text-slate-500 text-sm">
              Free & open source • Coming soon
            </span>
          </div>
        </motion.div>

        {/* Animated Terminal */}
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-slate-500">Terminal</span>
            </div>

            {/* Terminal content */}
            <div className="p-4 font-mono text-left">
              <div className="flex items-center">
                <span className="text-secondary">$</span>
                <span className="ml-2 text-slate-300">{displayText}</span>
                <span className="cursor-blink text-primary ml-0.5">▋</span>
              </div>

              {displayText === fullText && (
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-slate-500 text-sm"
                >
                  <p className="text-secondary">✓ Created _bmad-context/</p>
                  <p className="text-slate-400 mt-1">
                    Generated 12 context files for your codebase
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
