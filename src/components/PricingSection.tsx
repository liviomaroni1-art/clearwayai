import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/pricing/PricingCard";
import PricingFootnotes from "@/components/pricing/PricingFootnotes";
import HowToChoose from "@/components/pricing/HowToChoose";
import LongTermSavings from "@/components/pricing/LongTermSavings";
import { Link } from "react-router-dom";

import { plans, billingRules } from "@/components/pricing/PricingData";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleCTA = (planName: string, ctaText: string) => {
    if (ctaText === "Talk to Sales") {
      window.open('https://calendly.com/clearwayai/enterprise', '_blank');
    } else {
      window.location.href = '/contact';
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
          <div className="inline-flex items-center gap-3 bg-card/50 border border-border rounded-full px-4 py-2 mb-6">
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
                Save {billingRules.annualDiscount}
              </span>
            </button>
          </div>

          {/* Add-ons Link - Prominent placement */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Need additional services?</span>
            <Link 
              to="/add-ons" 
              className="text-sm text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
            >
              View Add-On Services →
            </Link>
          </div>
        </motion.div>

        {/* Core Plans */}
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

        {/* How to Choose */}
        <HowToChoose />

        {/* Footnotes */}
        <PricingFootnotes />

        {/* 36-Month Savings */}
        <LongTermSavings />

      </div>
    </section>
  );
};

export default PricingSection;
