import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Diamond, Crown, Building2, MapPin, Clock } from "lucide-react";

const plans = [
  {
    name: "Solo Launch",
    emoji: "🟢",
    icon: Rocket,
    price: "$1,500",
    setup: "$1,000",
    idealFor: "Solo providers & micro businesses",
    color: "emerald",
    features: [
      "1,000 minutes/month",
      "AI call handling 24/7",
      "Basic calendar sync",
      "Call summaries via email",
      "Standard voice"
    ],
    popular: false
  },
  {
    name: "Pro Practice",
    emoji: "🟣",
    icon: Diamond,
    price: "$2,500",
    setup: "$1,250",
    idealFor: "Growing solo teams or small clinics",
    color: "violet",
    features: [
      "2,000 minutes/month",
      "Everything in Solo Launch",
      "CRM sync integration",
      "SMS/email reminders",
      "Weekly performance reports"
    ],
    popular: true
  },
  {
    name: "Team Pro",
    emoji: "🟠",
    icon: Crown,
    price: "$3,500",
    setup: "$1,750",
    idealFor: "Busy offices, law firms, clinics",
    color: "amber",
    features: [
      "3,000 minutes/month",
      "Everything in Pro Practice",
      "Advanced call routing",
      "Multi-calendar support",
      "Bi-weekly performance tuning"
    ],
    popular: false
  },
  {
    name: "Concierge AI",
    emoji: "⚫",
    icon: Building2,
    price: "$5,000+",
    setup: "Custom",
    idealFor: "Enterprise & multi-location",
    color: "slate",
    features: [
      "8,000+ minutes/month",
      "Everything in Team Pro",
      "Advanced logic & EHR integration",
      "HIPAA compliance included",
      "Dedicated account manager"
    ],
    popular: false
  }
];

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  emerald: {
    bg: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    text: "text-emerald-400",
    badge: "bg-emerald-500"
  },
  violet: {
    bg: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-500/30 hover:border-violet-500/50",
    text: "text-violet-400",
    badge: "bg-violet-500"
  },
  amber: {
    bg: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/30 hover:border-amber-500/50",
    text: "text-amber-400",
    badge: "bg-amber-500"
  },
  slate: {
    bg: "from-slate-400/20 to-slate-500/10",
    border: "border-slate-400/30 hover:border-slate-400/50",
    text: "text-slate-300",
    badge: "bg-slate-600"
  }
};

const PricingSection = () => {
  const bookDemo = (plan: string) => {
    window.open(`https://calendly.com/clearwayai/${plan.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
  };

  return (
    <section id="pricing" className="py-28 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Trust Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Based in Freienbach, Switzerland</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Live in 72 hours</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your practice. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => {
            const colors = colorClasses[plan.color];
            const Icon = plan.icon;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gradient-to-b ${colors.bg} backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 ${colors.border} transition-all duration-300 flex flex-col min-h-[580px]`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-bold px-5 py-2 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8 pt-4 flex flex-col items-center justify-center">
                  <div className={`inline-flex items-center justify-center gap-3 ${colors.text} mb-4`}>
                    <Icon className="w-7 h-7" />
                    <span className="text-xl md:text-2xl font-bold whitespace-nowrap">{plan.name} {plan.emoji}</span>
                  </div>
                  
                  <div className={`text-5xl md:text-6xl font-extrabold ${colors.text} mb-2 text-center`}>
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/mo</span>
                  </div>
                  
                  <div className="text-base text-muted-foreground text-center">
                    Setup: <span className="font-semibold">{plan.setup}</span>
                  </div>
                </div>

                {/* Ideal For */}
                <div className={`bg-white/5 rounded-2xl px-4 py-4 text-center mb-8 border border-white/10`}>
                  <p className="text-sm md:text-base text-muted-foreground leading-tight">
                    <span className="font-semibold text-foreground block mb-1">Ideal for:</span> 
                    {plan.idealFor}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-base">
                      <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  onClick={() => bookDemo(plan.name)}
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-white/10 hover:bg-white/20 text-foreground'} font-bold text-lg py-7 rounded-2xl transition-all`}
                >
                  Book Demo
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* 36-Month Savings Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-2 border-primary/20 rounded-3xl p-8 md:p-10 text-center">
            <p className="text-xl md:text-2xl font-semibold text-foreground flex items-center justify-center gap-4 flex-wrap">
              <span className="text-3xl">💬</span>
              <span>
                Commit to <span className="text-primary font-bold">36 months</span> and save{" "}
                <span className="text-primary font-bold">20%</span> — setup fee waived.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Custom Solution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Need something custom? We build tailored solutions for unique workflows.
          </p>
          <Button 
            variant="outline"
            onClick={() => bookDemo('custom')}
            className="border-white/20 hover:bg-white/5 text-lg px-8 py-6"
          >
            Request Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
