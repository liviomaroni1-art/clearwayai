import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const SocialProofSection = lazy(() => import("@/components/SocialProofSection"));
const WhoItsFor = lazy(() => import("@/components/WhoItsFor"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const CoreBenefitsSection = lazy(() => import("@/components/CoreBenefitsSection"));
const GetStartedSteps = lazy(() => import("@/components/GetStartedSteps"));
const CaseStudiesSection = lazy(() => import("@/components/CaseStudiesSection"));
const HomeServicesCallout = lazy(() => import("@/components/HomeServicesCallout"));
const IntegrationsSection = lazy(() => import("@/components/IntegrationsSection"));
const SecurityComplianceSection = lazy(() => import("@/components/SecurityComplianceSection"));
const CostCalculator = lazy(() => import("@/components/CostCalculator"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const LiveDemoPhone = lazy(() => import("@/components/LiveDemoPhone"));
const StickyCTA = lazy(() => import("@/components/StickyCTA"));

const Index = () => {
  const [showDeferredContent, setShowDeferredContent] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowDeferredContent(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Clearway AI — AI Growth System for Service Businesses | Capture, Follow Up, Retain"
        description="Clearway AI helps service businesses grow with AI that captures every lead, follows up automatically, reactivates old customers, and brings in more 5-star reviews. Built for HVAC, plumbing, electrical & more."
      />
      <StructuredData type="website" />
      <StructuredData type="organization" />
      <StructuredData type="localBusiness" />
      <StructuredData type="service" />
      <StructuredData type="faq" />

      <Navbar />
      <HeroSection />

      <Suspense fallback={null}>
        <LiveDemoPhone variant="floating" />
        <StickyCTA />
      </Suspense>

      {showDeferredContent && (
        <Suspense fallback={null}>
          <SocialProofSection />
          <WhoItsFor />
          <HowItWorksSection />
          <CoreBenefitsSection />
          <GetStartedSteps />
          <CaseStudiesSection />
          <HomeServicesCallout />
          <IntegrationsSection />
          <SecurityComplianceSection />
          <CostCalculator />
          <PricingSection />
          <FAQSection />
          <CTASection />
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
