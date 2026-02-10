import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ContextFilesPreview from "@/components/ContextFilesPreview";
import ComparisonTable from "@/components/ComparisonTable";
import GetStarted from "@/components/GetStarted";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <ContextFilesPreview />
      <ComparisonTable />
      <GetStarted />
      <Footer />
    </main>
  );
}
