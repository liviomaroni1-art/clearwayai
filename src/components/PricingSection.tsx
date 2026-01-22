import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Diamond, Crown, Building2, MapPin, Clock, Zap, Star } from "lucide-react";

const plans = [
  {
    name: "Solo Launch",
    emoji: "🟢",
    icon: Rocket,
    price: "$1,497",
    setup: "$997",
    idealFor: "Solo providers testing AI—low risk, high reward",
    color: "emerald",
    features: [
      { text: "1,000 minutes/month", bold: true },
      { text: "24/7 AI call handling", bold: false },
      { text: "Google/Outlook calendar sync", bold: false },
      { text: "Call summaries via email", bold: false },
      { text: "3 voice options", bold: false },
      { text: "1 phone number", bold: false },
      { text: "Basic analytics", bold: false },
      { text: "Email support (48h)", bold: false }
    ],
    popular: false
  },
  {
    name: "Pro Practice",
    emoji: "🟣",
    icon: Diamond,
    price: "$2,497",
    setup: "$1,497",
    idealFor: "Growing teams ready to capture every lead",
    color: "violet",
    features: [
      { text: "Everything in Solo Launch +", bold: true, italic: true },
      { text: "2,000 minutes/month", bold: true },
      { text: "CRM sync (Salesforce, HubSpot, SimplePractice)", bold: true },
      { text: "SMS/email reminders (custom templates)", bold: true },
      { text: "Weekly performance reports", bold: false },
      { text: "10+ voice options + custom tone", bold: false },
      { text: "2 phone numbers", bold: false },
      { text: "Priority support (24h)", bold: false }
    ],
    popular: true
  },
  {
    name: "Team Pro",
    emoji: "🟠",
    icon: Crown,
    price: "$3,497",
    setup: "$1,997",
    idealFor: "Busy offices that can't afford to miss a single call",
    color: "amber",
    features: [
      { text: "Everything in Pro Practice +", bold: true, italic: true },
      { text: "3,000 minutes/month", bold: true },
      { text: "Advanced call routing (by staff/department)", bold: true },
      { text: "Multi-calendar team scheduling", bold: true },
      { text: "Bi-weekly AI optimization calls", bold: false },
      { text: "Custom IVR menus", bold: false },
      { text: "5 phone numbers", bold: false },
      { text: "Phone + chat support (12h)", bold: false }
    ],
    popular: false
  },
  {
    name: "Concierge AI",
    emoji: "⚫",
    icon: Building2,
    price: "$4,997+",
    setup: "$2,997",
    idealFor: "Enterprise & multi-location—white glove service",
    color: "slate",
    features: [
      { text: "Everything in Team Pro +", bold: true, italic: true },
      { text: "8,000+ minutes (custom scaling)", bold: true },
      { text: "EHR integration (Epic, Cerner)", bold: true },
      { text: "HIPAA compliance + BAA included", bold: true },
      { text: "Dedicated account manager (weekly)", bold: false },
      { text: "Unlimited phone numbers", bold: false },
      { text: "Custom voice cloning", bold: false },
      { text: "24/7 white-glove support", bold: false }
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
            <span className="text-muted-foreground">Swiss precision, global reach</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-sm border border-amber-500/30">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-medium">Only 5 onboarding slots left this month</span>
          </div>
        </motion.div>

        {/* Header with Value Anchoring */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Invest Once, <span className="gradient-text">Save Forever</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-4">
            A full-time receptionist costs $4,500/month. Your AI never takes sick days, never quits, never sleeps.
          </p>
          <p className="text-lg text-gray-500">
            No hidden fees. Cancel with 3 months notice. ROI guaranteed or your money back.
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
                className={`relative bg-gradient-to-b ${colors.bg} backdrop-blur-xl rounded-3xl p-6 md:p-8 border-2 ${colors.border} transition-all duration-300 flex flex-col min-h-[620px]`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      Best Value
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
                    One-time setup: <span className="font-semibold">{plan.setup}</span>
                  </div>
                </div>

                {/* Ideal For */}
                <div className={`bg-white/5 rounded-2xl px-4 py-4 text-center mb-8 border border-white/10`}>
                  <p className="text-sm md:text-base text-muted-foreground leading-tight">
                    <span className="font-semibold text-foreground block mb-1">Perfect for:</span> 
                    {plan.idealFor}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                      <span className={`${feature.italic ? 'italic text-muted-foreground/80' : 'text-muted-foreground'} ${feature.bold ? 'font-semibold text-foreground' : ''}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  onClick={() => bookDemo(plan.name)}
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-white/10 hover:bg-white/20 text-foreground'} font-bold text-lg py-7 rounded-2xl transition-all`}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Claim This Plan
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* 36-Month Savings with Urgency */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border-2 border-primary/40 rounded-3xl p-10 md:p-14 text-center shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]">
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30 mb-6">
                <span className="text-4xl">💰</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Exclusive: Long-Term Partnership Savings
              </h3>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                Commit to <span className="text-primary font-bold">36 months</span> and save{" "}
                <span className="text-primary font-bold text-3xl md:text-4xl">20%</span> + get $0 setup
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary font-semibold px-6 py-3 rounded-full text-lg border border-primary/30">
                  <Check className="w-5 h-5" />
                  $0 setup fee (save up to $2,997)
                </div>
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary font-semibold px-6 py-3 rounded-full text-lg border border-primary/30">
                  <Check className="w-5 h-5" />
                  Priority onboarding included
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                ⏰ Only available for new clients this quarter
              </p>
            </div>
          </div>
        </motion.div>

        {/* Included Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground bg-white/5 border border-white/10 rounded-2xl px-8 py-4">
            <span>✅ <strong className="text-foreground">Unlimited</strong> missed call texts</span>
            <span className="hidden md:inline">•</span>
            <span>📊 Overage: <strong className="text-foreground">$0.50/min</strong></span>
            <span className="hidden md:inline">•</span>
            <span>🎁 Annual: <strong className="text-primary">2 months free</strong></span>
            <span className="hidden md:inline">•</span>
            <span>📋 Cancel: <strong className="text-foreground">3-month notice</strong></span>
          </div>
        </motion.div>

        {/* Custom Solution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-10"
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
