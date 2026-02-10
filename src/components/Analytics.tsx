"use client";

import { useEffect, useRef } from "react";
import { trackPageView, trackScrollDepth } from "@/lib/analytics";

export default function Analytics() {
  const scrollDepthsTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Track page view on mount
    trackPageView();

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
        if (
          scrollPercent >= milestone &&
          !scrollDepthsTracked.current.has(milestone)
        ) {
          scrollDepthsTracked.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
