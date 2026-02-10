import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ContextFilesPreview from "@/components/ContextFilesPreview";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import WaitlistCTA from "@/components/WaitlistCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Analytics />
      <ExitIntentPopup />
      <Navigation />
      <Hero />
      <Problem />
      <HowItWorks />
      <WaitlistCTA 
        title="Ready to try it?"
        subtitle="Get early access when we launch"
        location="mid-page"
      />
      <Features />
      <ContextFilesPreview />
      <GetStarted />
      <WaitlistCTA 
        title="Don't miss out"
        subtitle="Join 100+ developers on the waitlist"
        location="pre-footer"
      />
      <Footer />
    </main>
  );
}
