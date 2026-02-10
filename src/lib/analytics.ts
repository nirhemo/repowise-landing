"use client";

export function track(event: string, data?: Record<string, unknown>) {
  // Send to our API
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, data }),
  }).catch(() => {
    // Silently fail - analytics shouldn't break the app
  });

  // Also send to Plausible if available
  if (typeof window !== "undefined" && (window as unknown as { plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void }).plausible) {
    (window as unknown as { plausible: (event: string, options?: { props?: Record<string, unknown> }) => void }).plausible(event, { props: data });
  }
}

export function trackClick(name: string) {
  track("click", { element: name });
}

export function trackScrollDepth(depth: number) {
  track("scroll_depth", { depth });
}

export function trackPageView() {
  track("page_view", {
    url: window.location.pathname,
    referrer: document.referrer,
  });
}
