"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Loader2, CheckCircle, Rocket } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { trackClick, track } from "@/lib/analytics";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    position?: number;
  } | null>(null);
  const [hasShown, setHasShown] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        // Check if user hasn't dismissed before (stored in localStorage)
        const dismissed = localStorage.getItem("repowise_popup_dismissed");
        if (!dismissed) {
          setIsVisible(true);
          setHasShown(true);
          track("exit_intent_shown");
        }
      }
    },
    [hasShown]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("repowise_popup_dismissed", "true");
    trackClick("exit_popup_close");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    trackClick("exit_popup_submit");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        track("exit_popup_conversion");
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch {
      setResult({ success: false });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!result?.success ? (
              <>
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-center mb-2">
                  Don&apos;t miss the launch!
                </h3>
                <p className="text-slate-400 text-center mb-6">
                  Be the first to know when RepoWise is ready. Early adopters
                  get priority access.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      required
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-500 text-white font-semibold rounded-lg transition-all duration-300 hover:glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Join the Waitlist"
                    )}
                  </button>
                </form>

                <p className="text-slate-500 text-xs text-center mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">You&apos;re in!</h3>
                <p className="text-secondary font-semibold">
                  You&apos;re #{result.position} on the waitlist
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
