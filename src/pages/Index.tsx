import React, { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const SocialProofSection = lazy(() => import("@/components/SocialProofSection"));
const TrustedBySection = lazy(() => import("@/components/TrustedBySection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection"));
const BenefitsSection = lazy(() => import("@/components/BenefitsSection"));
const FitSection = lazy(() => import("@/components/FitSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const Footer = lazy(() => import("@/components/Footer"));
const StickyCTA = lazy(() => import("@/components/StickyCTA"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Clearway AI – Done-for-You Lead-Generierung für Dienstleistungsunternehmen"
        description="Wir schalten Ihre Meta-Anzeigen, verwalten den Funnel und liefern qualifizierte Leads oder gebuchte Verkaufsgespräche. Done-for-you Lead-Generierung im DACH-Raum."
      />
      <StructuredData type="website" />
      <StructuredData type="organization" />

      <Navbar />
      <HeroSection />

      <Suspense fallback={null}>
        <SocialProofSection />
        <StickyCTA />
        <FeaturesSection />
        <TrustedBySection />
        <HowItWorksSection />
        <BenefitsSection />
        <FitSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
