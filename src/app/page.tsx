import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ComparisonTable from "@/components/ComparisonTable";
import ContextFilesPreview from "@/components/ContextFilesPreview";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import WaitlistCTA from "@/components/WaitlistCTA";
import FloatingMobileCTA from "@/components/FloatingMobileCTA";
import { WaitlistProvider } from "@/context/WaitlistContext";

export default function Home() {
  return (
    <WaitlistProvider>
      <main className="min-h-screen">
        <Analytics />
        <ExitIntentPopup />
        <Navigation />
        <FloatingMobileCTA />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Hero />
        </Suspense>
        <Problem />
        <HowItWorks />
        <Suspense fallback={null}>
          <WaitlistCTA
            title="Get early access"
            subtitle="Join the waitlist — be first to connect your repos"
            buttonText="Reserve My Spot"
            location="mid-page"
          />
        </Suspense>
        <Features />
        <ComparisonTable />
        <ContextFilesPreview />
        <FAQ />
        <Suspense fallback={null}>
          <WaitlistCTA
            title="Your AI tools deserve better context"
            subtitle="Your AI tools are only as good as the context they have. Fix that in 30 seconds."
            buttonText="Don't Miss Out"
            location="pre-footer"
          />
        </Suspense>
        <Footer />
      </main>
    </WaitlistProvider>
  );
}
