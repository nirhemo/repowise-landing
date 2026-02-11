"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface WaitlistState {
  isOnWaitlist: boolean;
  referralCode: string | null;
  position: number | null;
}

interface WaitlistContextType extends WaitlistState {
  setWaitlistResult: (result: { referralCode?: string; position?: number }) => void;
}

const WaitlistContext = createContext<WaitlistContextType | null>(null);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WaitlistState>({
    isOnWaitlist: false,
    referralCode: null,
    position: null,
  });

  // Hydrate from localStorage on mount
  useEffect(() => {
    const joined = localStorage.getItem("repowise_waitlist_joined") === "true";
    const code = localStorage.getItem("repowise_referral_code");
    if (joined) {
      setState((prev) => ({ ...prev, isOnWaitlist: true, referralCode: code }));
    }
  }, []);

  const setWaitlistResult = useCallback(
    (result: { referralCode?: string; position?: number }) => {
      localStorage.setItem("repowise_waitlist_joined", "true");
      if (result.referralCode) {
        localStorage.setItem("repowise_referral_code", result.referralCode);
      }
      setState({
        isOnWaitlist: true,
        referralCode: result.referralCode ?? null,
        position: result.position ?? null,
      });
    },
    []
  );

  return (
    <WaitlistContext.Provider value={{ ...state, setWaitlistResult }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error("useWaitlist must be used within WaitlistProvider");
  return ctx;
}
