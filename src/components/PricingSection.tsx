import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Diamond, Crown, Building2, Wrench } from "lucide-react";

const PricingSection = () => {
  const bookDemo = (type: string) => {
    window.open(`https://calendly.com/clearwayai/${type}`, '_blank');
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-16">
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
            <p className="text-xl text-slate-300">
              Replaces entire reception teams. Custom Swiss engineering.
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
                CHF 2,500<span className="text-xl">/month</span>
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
                  <Wrench className="w-6 h-6" /> Setup: CHF 1,000
                </div>
                <div className="text-slate-400">Done-for-you Retell.ai/n8n (4-6 hours)</div>
              </div>

              <Button 
                onClick={() => bookDemo('signature')}
                className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white py-6 text-lg font-bold rounded-2xl"
              >
                🚀 Book Signature Demo
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
                CHF 3,500<span className="text-xl">/month</span>
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
                  <Wrench className="w-6 h-6" /> Setup: CHF 1,500
                </div>
                <div className="text-slate-400">Enterprise-grade implementation</div>
              </div>

              <Button 
                onClick={() => bookDemo('elite')}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 text-lg font-bold rounded-2xl"
              >
                🚀 Book Elite Demo
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
              CHF 5,000+/month
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
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">CHF 2,000/mo</div>
                <div className="text-slate-300">Signature</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-400">CHF 2,800/mo</div>
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
