import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/pricing/PricingCard";
import TrustBadges from "@/components/pricing/TrustBadges";
import PricingFootnotes from "@/components/pricing/PricingFootnotes";
import HowToChoose from "@/components/pricing/HowToChoose";
import LongTermSavings from "@/components/pricing/LongTermSavings";
import { plans } from "@/components/pricing/PricingData";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleCTA = (planName: string, ctaText: string) => {
    if (ctaText === "Talk to Sales") {
      window.open('https://calendly.com/clearwayai/enterprise', '_blank');
    } else if (ctaText === "Book a Demo") {
      window.open('https://calendly.com/clearwayai/demo', '_blank');
    } else {
      window.open(`https://calendly.com/clearwayai/${planName.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Choose the plan that fits your practice. Scale up anytime as you grow.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-card/50 border border-border rounded-full px-4 py-2">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !isAnnual 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isAnnual 
                  ? 'bg-primary-foreground/20' 
                  : 'bg-primary/20 text-primary'
              }`}>
                Save 10%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <TrustBadges />

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              icon={plan.icon}
              price={plan.price}
              priceAnnual={plan.priceAnnual}
              setup={plan.setup}
              tagline={plan.tagline}
              idealFor={plan.idealFor}
              color={plan.color}
              features={plan.features}
              setupIncludes={plan.setupIncludes}
              ctaText={plan.ctaText}
              ctaAction={() => handleCTA(plan.name, plan.ctaText)}
              popular={plan.popular}
              label={'label' in plan ? plan.label : undefined}
              notes={'notes' in plan ? plan.notes : undefined}
              index={index}
              isAnnual={isAnnual}
            />
          ))}
        </div>

        {/* Footnotes */}
        <PricingFootnotes />

        {/* How to Choose */}
        <HowToChoose />

        {/* 36-Month Savings */}
        <LongTermSavings />

        {/* Custom Solution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">
            Need something custom? We build tailored solutions for unique workflows.
          </p>
          <Button 
            variant="outline"
            onClick={() => handleCTA('custom', 'Talk to Sales')}
            className="border-border hover:bg-muted px-6 py-5"
          >
            Request Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
