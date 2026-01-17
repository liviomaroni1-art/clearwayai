import Navbar from "@/components/Navbar";
import UrgencyBanner from "@/components/UrgencyBanner";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CostCalculator from "@/components/CostCalculator";
import PricingSection from "@/components/PricingSection";
import TrustSection from "@/components/TrustSection";
import BenefitsSection from "@/components/BenefitsSection";
import FounderSection from "@/components/FounderSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <UrgencyBanner />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <HowItWorksSection />
      <CostCalculator />
      <PricingSection />
      <TrustSection />
      <BenefitsSection />
      <FounderSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
