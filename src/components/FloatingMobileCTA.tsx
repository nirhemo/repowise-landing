"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useWaitlist } from "@/context/WaitlistContext";

export default function FloatingMobileCTA() {
  const { isOnWaitlist } = useWaitlist();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~1 viewport height
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isOnWaitlist) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 md:hidden"
        >
          <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 safe-bottom">
            <a
              href="#hero-form"
              className="block w-full text-center px-6 py-3 bg-primary hover:bg-primary-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              Get Early Access
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
