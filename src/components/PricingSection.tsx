import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Diamond, Crown, Building2, Wrench, Shield, MapPin, Clock } from "lucide-react";

const PricingSection = () => {
  const bookDemo = (type: string) => {
    window.open(`https://calendly.com/clearwayai/${type}`, '_blank');
  };

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Red Urgency Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 md:p-8 mb-10 text-center shadow-2xl shadow-red-500/20"
        >
          <div className="text-2xl md:text-4xl font-extrabold text-white mb-3 flex items-center justify-center gap-3">
            ⚡ ONLY 3 SIGNATURE SPOTS LEFT Q1 2026
          </div>
          <div className="text-lg md:text-xl text-red-100 font-semibold">
            💰 $54,000 savings vs $4,500/month human staff
          </div>
        </motion.div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-16">
          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10 pb-8 border-b border-white/10"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
              <MapPin className="w-4 h-4 text-red-400" />
              <span className="text-slate-300">Based in Freienbach, Switzerland</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-slate-300">Live in 48 hours</span>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              Premium AI Receptionist
            </h2>
            <p className="text-xl text-slate-300 mb-2">
              Replaces $4,500+/month receptionists. Precision engineering.
            </p>
            <p className="text-emerald-400 font-medium">
              💰 Save $54,000/year compared to human staff
            </p>
          </motion.div>

          {/* Pricing Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Signature Plan */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden"
            >
              <div className="absolute top-6 right-6 bg-violet-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Diamond className="w-4 h-4" /> SIGNATURE
              </div>
              
              <div className="text-5xl font-extrabold text-violet-500 mb-5">
                $2,500<span className="text-xl">/month</span>
              </div>
              
              <div className="bg-violet-500/20 text-violet-400 px-6 py-4 rounded-2xl text-lg font-semibold mb-8">
                Perfect for solo practices & service providers
              </div>

              <ul className="space-y-5 mb-8">
                {[
                  "Up to 2,000 minutes/month",
                  "24/7 calls + auto appointment booking",
                  "Call summaries (email/SMS) + CRM sync",
                  "Google Calendar + 24h reminders",
                  "Weekly reports + full setup"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-200">
                    <Check className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-black/30 p-6 rounded-2xl mb-6 text-center">
                <div className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <Wrench className="w-6 h-6" /> Setup: $1,000
                </div>
                <div className="text-slate-400">Done-for-you Retell.ai/n8n (4-6 hours)</div>
              </div>

              {/* Value comparison */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl mb-6 text-center">
                <p className="text-sm text-emerald-400">
                  <strong>vs Human Receptionist:</strong> Save $2,000+/month
                </p>
              </div>

              <Button 
                onClick={() => bookDemo('signature')}
                className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white py-6 text-lg font-bold rounded-2xl min-h-[56px]"
              >
                🚀 Book Signature Demo — See It Live
              </Button>
            </motion.div>

            {/* Elite Plan */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden"
            >
              <div className="absolute top-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Crown className="w-4 h-4" /> ELITE
              </div>
              
              <div className="text-5xl font-extrabold text-amber-500 mb-5">
                $3,500<span className="text-xl">/month</span>
              </div>
              
              <div className="bg-amber-500/20 text-amber-400 px-6 py-4 rounded-2xl text-lg font-semibold mb-8">
                Ideal for clinics, legal offices & teams
              </div>

              <ul className="space-y-5 mb-8">
                {[
                  "Everything in Signature",
                  "Up to 3,000 minutes/month",
                  "Custom voice + advanced routing",
                  "Multi-service calendar sync",
                  "Bi-weekly performance tuning"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-200">
                    <Check className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-black/30 p-6 rounded-2xl mb-6 text-center">
                <div className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <Wrench className="w-6 h-6" /> Setup: $1,500
                </div>
                <div className="text-slate-400">Enterprise-grade implementation</div>
              </div>

              {/* Value comparison */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl mb-6 text-center">
                <p className="text-sm text-emerald-400">
                  <strong>Most Popular:</strong> Best value for growing teams
                </p>
              </div>

              <Button 
                onClick={() => bookDemo('elite')}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 text-lg font-bold rounded-2xl min-h-[56px]"
              >
                🚀 Book Elite Demo — See It Live
              </Button>
            </motion.div>
          </div>

          {/* Enterprise */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/15 rounded-3xl p-10 md:p-16 text-center border-2 border-amber-400 mb-12"
          >
            <div className="text-4xl text-amber-400 mb-5 flex items-center justify-center gap-3">
              <Building2 className="w-10 h-10" /> Enterprise Concierge
            </div>
            <div className="text-5xl md:text-6xl font-extrabold text-amber-100 mb-6">
              $5,000+/month
            </div>
            <p className="text-xl text-slate-300 mb-5">
              Multi-location • HIPAA • Custom EMR/EHR • Dedicated manager
            </p>
            <div className="inline-block bg-black/40 px-8 py-4 rounded-xl text-lg text-slate-300 mb-8">
              Custom quoted • Unlimited minutes
            </div>
            <div>
              <Button 
                onClick={() => bookDemo('enterprise')}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 px-12 py-6 text-xl font-bold rounded-2xl"
              >
                👉 Request Enterprise Quote
              </Button>
            </div>
          </motion.div>

          {/* Savings Plan */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-emerald-500/20 rounded-3xl p-8 md:p-10 border-l-8 border-emerald-500 mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-6">
              📉 36-Month Commitment = 20% OFF Forever
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">$2,000/mo</div>
                <div className="text-slate-300">Signature</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">$2,800/mo</div>
                <div className="text-slate-300">Elite</div>
              </div>
              <div className="flex items-center">
                <div className="text-lg text-emerald-500 font-semibold">+ No setup fees (annual pay)</div>
              </div>
            </div>
          </motion.div>

          {/* Custom */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl p-10 md:p-14 text-center"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 flex items-center justify-center gap-3">
              <Wrench className="w-8 h-8" /> AI Assistant Plus
            </h3>
            <p className="text-2xl text-pink-100 mb-4">Your Request, Your Rules™</p>
            <p className="text-lg text-pink-100/90 mb-8 max-w-2xl mx-auto">
              Unique workflows? Industry-specific logic? Crazy ideas? We build it. Scoped in 48hrs.
            </p>
            <Button 
              onClick={() => bookDemo('custom')}
              className="bg-white hover:bg-slate-100 text-pink-500 px-12 py-6 text-xl font-bold rounded-2xl"
            >
              Request Custom Concierge Fix
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
