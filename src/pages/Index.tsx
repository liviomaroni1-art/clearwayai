import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofSection from "@/components/SocialProofSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CoreBenefitsSection from "@/components/CoreBenefitsSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import SecurityComplianceSection from "@/components/SecurityComplianceSection";
import CostCalculator from "@/components/CostCalculator";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import LiveDemoPhone from "@/components/LiveDemoPhone";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <StructuredData type="organization" />
      <StructuredData type="service" />
      <StructuredData type="faq" />
      
      <Navbar />
      <HeroSection />
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
    </div>
  );
};

export default Index;
