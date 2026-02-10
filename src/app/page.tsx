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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Analytics />
      <ExitIntentPopup />
      <Navigation />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <ContextFilesPreview />
      <GetStarted />
      <Footer />
    </main>
  );
}
