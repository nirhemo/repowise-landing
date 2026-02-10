"use client";

import { motion } from "framer-motion";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import { useState } from "react";
import { trackClick } from "@/lib/analytics";

interface WaitlistCTAProps {
  title?: string;
  subtitle?: string;
  location: string; // for analytics
}

export default function WaitlistCTA({ 
  title = "Join the waitlist",
  subtitle = "Be the first to know when we launch",
  location 
}: WaitlistCTAProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    trackClick(`waitlist_submit_${location}`);

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

          {!result?.success ? (
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
                  "Join Waitlist"
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-4 bg-secondary/10 border border-secondary/30 rounded-xl max-w-md mx-auto"
            >
              <CheckCircle className="w-6 h-6 text-secondary" />
              <span className="text-secondary font-semibold">
                Thank you! We&apos;ll be in touch soon
              </span>
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
