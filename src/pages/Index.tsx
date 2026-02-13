import React, { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const SocialProofSection = lazy(() => import("@/components/SocialProofSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const CoreBenefitsSection = lazy(() => import("@/components/CoreBenefitsSection"));
const IntegrationsSection = lazy(() => import("@/components/IntegrationsSection"));
const SecurityComplianceSection = lazy(() => import("@/components/SecurityComplianceSection"));
const CostCalculator = lazy(() => import("@/components/CostCalculator"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const LiveDemoPhone = lazy(() => import("@/components/LiveDemoPhone"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <StructuredData type="organization" />
      <StructuredData type="service" />
      <StructuredData type="faq" />
      
      <Navbar />
      <HeroSection />
      <Suspense fallback={null}>
        <SocialProofSection />
        <HowItWorksSection />
        <CoreBenefitsSection />
        <IntegrationsSection />
        <SecurityComplianceSection />
        <CostCalculator />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <Footer />
        <LiveDemoPhone variant="floating" />
      </Suspense>
    </div>
  );
};

export default Index;
