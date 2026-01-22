import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, Globe, Sparkles, Zap, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <section id="contact" className="section-calm">
      <div className="container mx-auto px-6">
        {/* Empathetic + Urgency closing */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-transition mb-12"
        >
          Every day you wait is another day of lost revenue. Let's fix that.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative elevated-card p-10 md:p-16 overflow-hidden"
        >
          {/* Cyan glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/15 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Main CTA with scarcity */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-sm mb-6"
                >
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400 font-medium">Only 5 onboarding slots left this month</span>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-100">
                  Ready to stop
                  <br />
                  <span className="gradient-text">leaving money on the table?</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-lg mb-8">
                  Book your free 15-minute strategy call. We'll audit your call flow, 
                  show you exactly what you're losing—and build a custom solution in 72 hours.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="min-h-[56px] btn-glow hover:scale-105 transition-all" 
                    asChild
                  >
                    <Link to="/contact">
                      <Zap className="w-5 h-5" />
                      Claim My Free Strategy Call
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
                
                {/* Low-friction trust points */}
                <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                  {["Free, no obligation", "15 minutes", "Get your custom plan"].map((point) => (
                    <div key={point} className="flex items-center gap-2 text-sm text-gray-400">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Call Demo with urgency */}
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-4 bg-primary/5 rounded-3xl blur-xl"
                />
                <div className="relative glass-card border-primary/30 p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-100 mb-2">
                    Don't take our word for it
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Call and experience the AI yourself—right now
                  </p>
                  
                  {/* Languages badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs mb-6">
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    <span className="text-gray-400">30+ languages • Instant pickup</span>
                  </div>
                  
                  <a
                    href={`tel:${demoNumber.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-xl font-bold text-xl transition-all hover:scale-[1.02] btn-glow w-full justify-center"
                  >
                    <Phone className="w-6 h-6" />
                    {demoNumber}
                  </a>
                  
                  <p className="text-xs text-gray-500 mt-4">
                    🎯 Experience: Greeting → Lead qualification → Booking → CRM sync
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
