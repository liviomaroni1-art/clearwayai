import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Rocket, Diamond, Crown, Building2, MapPin, Clock, Zap, Star, HelpCircle } from "lucide-react";

const plans = [
  {
    name: "Solo Launch",
    icon: Rocket,
    price: "$1,497",
    setup: "$997",
    tagline: "Professional AI reception for independent practices.",
    idealFor: "Solo practitioners who need reliable 24/7 call coverage without hiring staff.",
    color: "emerald",
    features: [
      { text: "1,000 included minutes/month", bold: true },
      { text: "24/7 AI call answering & routing", bold: false },
      { text: "Google Calendar or Outlook sync", bold: false },
      { text: "Call summaries delivered via email", bold: false },
      { text: "1 dedicated phone number included", bold: false },
      { text: "3 professional voice options", bold: false },
      { text: "Basic call analytics dashboard", bold: false },
      { text: "Email support (<24h response)", bold: false }
    ],
    popular: false
  },
  {
    name: "Pro Practice",
    icon: Diamond,
    price: "$2,497",
    setup: "$1,497",
    tagline: "Capture more leads with CRM sync and automated reminders.",
    idealFor: "Growing practices that need seamless lead tracking and client follow-up.",
    color: "violet",
    features: [
      { text: "2,000 included minutes/month", bold: true },
      { text: "Everything in Solo Launch, plus:", bold: false, italic: true },
      { text: "CRM integration (Salesforce, HubSpot, SimplePractice)", bold: true },
      { text: "Automated SMS & email appointment reminders", bold: true },
      { text: "Weekly performance reports", bold: false },
      { text: "2 dedicated phone numbers included", bold: false },
      { text: "10+ voice options with custom tone", bold: false },
      { text: "Email + chat support (<12h response)", bold: false }
    ],
    popular: true
  },
  {
    name: "Team Pro",
    icon: Crown,
    price: "$3,497",
    setup: "$1,997",
    tagline: "Built for multi-staff offices with complex scheduling needs.",
    idealFor: "Teams of 3+ who need intelligent call routing and shared calendars.",
    color: "amber",
    features: [
      { text: "3,000 included minutes/month", bold: true },
      { text: "Everything in Pro Practice, plus:", bold: false, italic: true },
      { text: "Smart call routing by staff or department", bold: true },
      { text: "Multi-calendar team scheduling", bold: true },
      { text: "Custom IVR menus & call flows", bold: false },
      { text: "Bi-weekly optimization calls with our team", bold: false },
      { text: "5 dedicated phone numbers included", bold: false },
      { text: "Phone + chat support (<8h response)", bold: false }
    ],
    popular: false
  },
  {
    name: "Concierge AI",
    label: "Enterprise",
    icon: Building2,
    price: "From $4,997",
    setup: "$2,997",
    tagline: "White-glove service for multi-location and compliance-focused organizations.",
    idealFor: "Enterprise teams, healthcare systems, and multi-location businesses.",
    color: "slate",
    features: [
      { text: "8,000+ minutes (custom scaling available)", bold: true },
      { text: "Everything in Team Pro, plus:", bold: false, italic: true },
      { text: "Dedicated account manager (weekly calls)", bold: true },
      { text: "Custom voice cloning for brand consistency", bold: true },
      { text: "Unlimited phone numbers", bold: false },
      { text: "Priority 24/7 support (<4h response)", bold: false },
      { text: "Custom integrations & API access", bold: false }
    ],
    notes: [
      "HIPAA/BAA available—scoped to your specific systems and workflows.",
      "EHR integration (Epic, Cerner, etc.) quoted separately based on requirements."
    ],
    popular: false
  }
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  emerald: {
    bg: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    text: "text-emerald-400"
  },
  violet: {
    bg: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-500/30 hover:border-violet-500/50",
    text: "text-violet-400"
  },
  amber: {
    bg: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/30 hover:border-amber-500/50",
    text: "text-amber-400"
  },
  slate: {
    bg: "from-slate-400/20 to-slate-500/10",
    border: "border-slate-400/30 hover:border-slate-400/50",
    text: "text-slate-300"
  }
};

const PricingSection = () => {
  const bookDemo = (plan: string) => {
    window.open(`https://calendly.com/clearwayai/${plan.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
  };

  return (
    <section id="pricing" className="py-28 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your practice. Scale up anytime as you grow.
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
                className={`relative bg-gradient-to-b ${colors.bg} backdrop-blur-xl rounded-3xl p-6 md:p-8 border-2 ${colors.border} transition-all duration-300 flex flex-col`}
              >
                {/* Popular / Enterprise Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      Best Value
                    </span>
                  </div>
                )}
                {'label' in plan && plan.label && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-slate-700 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg">
                      {plan.label}
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6 pt-4">
                  <div className={`inline-flex items-center justify-center gap-3 ${colors.text} mb-4`}>
                    <Icon className="w-6 h-6" />
                    <span className="text-xl md:text-2xl font-bold">{plan.name}</span>
                  </div>
                  
                  <div className={`text-4xl md:text-5xl font-extrabold ${colors.text} mb-1`}>
                    {plan.price}
                    <span className="text-base font-normal text-muted-foreground">/mo</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-4">
                    One-time setup: <span className="font-semibold">{plan.setup}</span>
                  </div>

                  <p className="text-sm text-foreground font-medium leading-snug">
                    {plan.tagline}
                  </p>
                </div>

                {/* Perfect For */}
                <div className="bg-white/5 rounded-xl px-4 py-3 text-center mb-6 border border-white/10">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Perfect for:</span> {plan.idealFor}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                      <span className={`${feature.italic ? 'italic text-muted-foreground/80' : 'text-muted-foreground'} ${feature.bold ? 'font-semibold text-foreground' : ''}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Enterprise Notes */}
                {'notes' in plan && plan.notes && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 mb-6">
                    <p className="text-xs text-amber-400/90 font-medium mb-1">Important:</p>
                    {plan.notes.map((note, i) => (
                      <p key={i} className="text-xs text-muted-foreground leading-relaxed">
                        • {note}
                      </p>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Button 
                  onClick={() => bookDemo(plan.name)}
                  className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-white/10 hover:bg-white/20 text-foreground'} font-bold text-base py-6 rounded-xl transition-all`}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Footnotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
              Plan Details
            </h4>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Minutes:</strong> Total talk time across inbound & outbound calls.</p>
              <p><strong className="text-foreground">Overage:</strong> $0.50/min beyond included minutes.</p>
              <p><strong className="text-foreground">Additional numbers:</strong> $25/mo per number.</p>
              <p><strong className="text-foreground">SMS:</strong> Carrier fees may apply for high-volume messaging.</p>
              <p><strong className="text-foreground">Cancellation:</strong> 3-month written notice required.</p>
              <p><strong className="text-foreground">Annual discount:</strong> Pay yearly, get 2 months free.</p>
            </div>
          </div>
        </motion.div>

        {/* How to Choose */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">How to Choose</h3>
          <div className="text-left bg-white/5 border border-white/10 rounded-2xl px-6 py-5 space-y-2 text-sm text-muted-foreground">
            <p>→ <strong className="text-foreground">Solo Launch</strong> if you're a solo or 1–2 person practice needing 24/7 coverage.</p>
            <p>→ <strong className="text-foreground">Pro Practice</strong> if you need CRM sync, automated reminders, or lead tracking.</p>
            <p>→ <strong className="text-foreground">Team Pro</strong> if you have multiple staff and need smart routing + team calendars.</p>
            <p>→ <strong className="text-foreground">Concierge AI</strong> if you're multi-location, need compliance support, or want custom integrations.</p>
          </div>
        </motion.div>

        {/* 36-Month Savings */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 border-2 border-primary/40 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Long-Term Partnership Savings
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground mb-5">
                Commit to <span className="text-primary font-bold">36 months</span> → <span className="text-primary font-bold">20% off monthly fees</span> + <span className="text-primary font-bold">$0 setup</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary font-medium px-4 py-2 rounded-full text-sm border border-primary/30">
                  <Check className="w-4 h-4" />
                  Save up to $2,997 on setup
                </div>
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary font-medium px-4 py-2 rounded-full text-sm border border-primary/30">
                  <Check className="w-4 h-4" />
                  Priority onboarding
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
            onClick={() => bookDemo('custom')}
            className="border-white/20 hover:bg-white/5 px-6 py-5"
          >
            Request Custom Quote
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
