"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Loader2, CheckCircle, Rocket, Share2, Copy, Check } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { trackClick, track } from "@/lib/analytics";
import { useWaitlist } from "@/context/WaitlistContext";

export default function ExitIntentPopup() {
  const { isOnWaitlist, setWaitlistResult } = useWaitlist();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    position?: number;
    error?: string;
    referralCode?: string;
    isExisting?: boolean;
  } | null>(null);
  const [hasShown, setHasShown] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [copied, setCopied] = useState(false);

  // Engagement gate: only allow popup after 10 seconds on page
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const showPopup = useCallback(() => {
    if (hasShown || !isReady) return;
    // Skip if user already joined waitlist (reactive via context)
    if (isOnWaitlist) return;
    // Check dismissal with 7-day expiry
    const dismissed = localStorage.getItem("repowise_popup_dismissed");
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      if (!isNaN(dismissedAt) && Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) return;
      localStorage.removeItem("repowise_popup_dismissed");
    }
    setIsVisible(true);
    setHasShown(true);
    track("exit_intent_shown");
  }, [hasShown, isReady, isOnWaitlist]);

  // Desktop: mouse leave from top
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    },
    [showPopup]
  );

  // Mobile: scroll-up detection after deep scroll
  useEffect(() => {
    let maxScrollY = 0;
    const handleMobileScroll = () => {
      if (hasShown || !isReady) return;
      const isMobile = window.innerWidth < 768;
      if (!isMobile) return;
      const currentScrollY = window.scrollY;
      maxScrollY = Math.max(maxScrollY, currentScrollY);
      // User scrolled up 200px+ from a deep point (past 1.5x viewport)
      if (maxScrollY > window.innerHeight * 1.5 && maxScrollY - currentScrollY > 200) {
        showPopup();
      }
    };
    window.addEventListener("scroll", handleMobileScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleMobileScroll);
  }, [hasShown, isReady, showPopup]);

  // ESC key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isVisible]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleMouseLeave, handleKeyDown]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("repowise_popup_dismissed", Date.now().toString());
    trackClick("exit_popup_close");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setResult(null);
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
        setWaitlistResult({ position: data.position, referralCode: data.referralCode });
      }
    } catch {
      setResult({ success: false, error: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-popup-title"
            initial={{ opacity: 1, scale: 0.9, y: 20 }}
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
                <h3 id="exit-popup-title" className="text-2xl font-bold text-center mb-2">
                  Before you go, your AI is still guessing
                </h3>
                <p className="text-slate-400 text-center mb-6">
                  Every merge without RepoWise is another day your AI makes suggestions without understanding your architecture. Get on the waitlist for early access.
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
                      "Secure My Spot"
                    )}
                  </button>
                </form>

                {result?.error && (
                  <p className="text-red-400 text-sm text-center mt-3">{result.error}</p>
                )}

                <p className="text-slate-500 text-xs text-center mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 1, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {result.isExisting ? "You're already registered!" : "You're in!"}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {result.isExisting 
                    ? "Here's your referral link to share:" 
                    : "Thank you! Share your link to skip the line:"}
                </p>

                {result.referralCode && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`https://www.repowise.ai?ref=${result.referralCode}`}
                        className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-300 truncate"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`https://www.repowise.ai?ref=${result.referralCode}`);
                          setCopied(true);
                          trackClick("exit_popup_referral_copy");
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="px-3 py-2 bg-primary hover:bg-primary-500 text-white rounded-lg transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-slate-500 text-xs flex items-center justify-center gap-1">
                      <Share2 className="w-3 h-3" />
                      Refer friends to move up the waitlist
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
