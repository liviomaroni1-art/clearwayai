import React, { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const WhoItsForSection = lazy(() => import("@/components/WhoItsForSection"));
const OutcomesSection = lazy(() => import("@/components/OutcomesSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const StickyCTA = lazy(() => import("@/components/StickyCTA"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Clearway AI — AI Lead Qualification & Booking Agents for B2B"
        description="AI agents that plug into your funnels, qualify every lead via email & SMS, and book sales calls directly into your calendar. More qualified calls, less manual work."
      />
      <StructuredData type="website" />
      <StructuredData type="organization" />

      <Navbar />
      <HeroSection />

      <Suspense fallback={null}>
        <StickyCTA />
        <HowItWorksSection />
        <WhoItsForSection />
        <OutcomesSection />
        <CTASection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
