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
        title="Clearway AI — Meta Ads & AI Lead Generation for Service Businesses"
        description="We run Meta ad campaigns, build high-converting funnels, and deploy AI follow-up agents that turn clicks into qualified leads and booked calls for service businesses."
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
