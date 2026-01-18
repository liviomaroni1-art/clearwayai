import Navbar from "@/components/Navbar";
import UrgencyBanner from "@/components/UrgencyBanner";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhoItsFor from "@/components/WhoItsFor";
import IntegrationsSection from "@/components/IntegrationsSection";
import CostCalculator from "@/components/CostCalculator";
import PricingSection from "@/components/PricingSection";
import TrustSection from "@/components/TrustSection";
import BenefitsSection from "@/components/BenefitsSection";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import LiveDemoPhone from "@/components/LiveDemoPhone";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead />
      <StructuredData type="organization" />
      <StructuredData type="service" />
      <StructuredData type="faq" />
      
      <Navbar />
      <UrgencyBanner />
      <HeroSection />
      <ProblemSection />
      <WhoItsFor />
      <ServicesSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <CostCalculator />
      <PricingSection />
      <TrustSection />
      <BenefitsSection />
      <AboutSection />
      <FounderSection />
      <FAQSection />
      <CTASection />
      <Footer />
      
      {/* Floating Live Demo Phone */}
      <LiveDemoPhone variant="floating" />
    </div>
  );
};

export default Index;
