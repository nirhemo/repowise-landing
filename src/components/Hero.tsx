"use client";

import { motion } from "framer-motion";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { trackClick } from "@/lib/analytics";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
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
          <h1 className="heading-xl mb-6">
            Your codebase,{" "}
            <span className="text-gradient-primary">
              understood by AI
            </span>
          </h1>

          <p className="body-lg mb-10 max-w-2xl mx-auto">
            Generate living context documentation that keeps AI agents in sync
            with your code
          </p>

          {/* Waitlist Form */}
          {!result?.success ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 max-w-md mx-auto"
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
                  "Join Waitlist"
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-3 mb-4 p-4 bg-secondary/10 border border-secondary/30 rounded-xl max-w-md mx-auto backdrop-blur-sm"
            >
              <CheckCircle className="w-6 h-6 text-secondary" />
              <span className="text-secondary font-semibold">
                Thank you! We&apos;ll be in touch soon
              </span>
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

          {/* Secondary info */}
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
                      <span className="text-slate-300">Created _bmad-context/</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-slate-500 text-sm pl-5"
                    >
                      Generated context files for your codebase
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2 pt-1"
                    >
                      <span className="text-primary">✓</span>
                      <span className="text-slate-400 text-sm">Git hooks installed</span>
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
