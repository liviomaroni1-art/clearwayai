import React, { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const ProblemSection = lazy(() => import("@/components/ProblemSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ResultsSection = lazy(() => import("@/components/ResultsSection"));
const FitSection = lazy(() => import("@/components/FitSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const StickyCTA = lazy(() => import("@/components/StickyCTA"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Clearway AI — AI Lead Generation Agency | Turn Leads Into Revenue"
        description="Clearway AI installs AI-powered outbound and follow-up systems that convert your existing leads into revenue on autopilot. Book a free strategy call."
      />
      <StructuredData type="website" />
      <StructuredData type="organization" />

      <Navbar />
      <HeroSection />

      <Suspense fallback={null}>
        <StickyCTA />
        <ProblemSection />
        <HowItWorksSection />
        <ServicesSection />
        <ResultsSection />
        <FitSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
