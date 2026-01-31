import Navbar from "@/components/Navbar";
import UrgencyBanner from "@/components/UrgencyBanner";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import TransformationSection from "@/components/TransformationSection";
import CoreBenefitsSection from "@/components/CoreBenefitsSection";
import ReliabilitySection from "@/components/ReliabilitySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import CostCalculator from "@/components/CostCalculator";
import PricingSection from "@/components/PricingSection";
import ProofSection from "@/components/ProofSection";
import WhoItsFor from "@/components/WhoItsFor";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
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
      <HeroSection />
      <ProblemSection />
      <TransformationSection />
      <CoreBenefitsSection />
      <ReliabilitySection />
      <HowItWorksSection />
      <IntegrationsSection />
      <CostCalculator />
      <PricingSection />
      <section id="proof">
        <ProofSection />
      </section>
      <WhoItsFor />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
