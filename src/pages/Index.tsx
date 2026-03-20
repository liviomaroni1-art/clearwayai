import React, { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const BenefitsSection = lazy(() => import("@/components/BenefitsSection"));
const FitSection = lazy(() => import("@/components/FitSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const StickyCTA = lazy(() => import("@/components/StickyCTA"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Clearway AI — Done-For-You Lead Generation for Service Businesses"
        description="We run your Meta ads, manage our funnel, and deliver qualified leads or booked sales calls directly to you. Done-for-you B2B lead generation."
      />
      <StructuredData type="website" />
      <StructuredData type="organization" />

      <Navbar />
      <HeroSection />

      <Suspense fallback={null}>
        <StickyCTA />
        <HowItWorksSection />
        <BenefitsSection />
        <FitSection />
        <CTASection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
