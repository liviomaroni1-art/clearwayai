import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const SocialProofSection = lazy(() => import("@/components/SocialProofSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const CaseStudiesSection = lazy(() => import("@/components/CaseStudiesSection"));
const CoreBenefitsSection = lazy(() => import("@/components/CoreBenefitsSection"));
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
        title="Clearway AI — AI Receptionist for Small Businesses | 24/7 Call Answering"
        description="Clearway AI answers your business calls 24/7, books appointments, and logs leads to your CRM. Built for clinics, law firms & service businesses. Live in ~72 hours."
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
          <HowItWorksSection />
          <CaseStudiesSection />
          <CoreBenefitsSection />
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
