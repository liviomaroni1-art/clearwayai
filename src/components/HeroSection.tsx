import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-24 pb-12 md:pb-16">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-8"
          >
            <span className="text-primary font-medium">Trusted by clinics, law firms & service businesses</span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-5 md:mb-6 text-foreground"
          >
            Clearway AI: Every Call Answered.
            <br />
            <span className="gradient-text">Every Lead Captured.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
          >
            AI receptionist that answers calls, qualifies leads, and books appointments into your calendar — 24/7, in 30+ languages. Live in ~72 hours.
          </motion.p>

          {/* CTA Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 md:mb-6"
          >
            <Button 
              variant="hero" 
              size="lg"
              className="w-full sm:w-auto min-h-[52px] md:min-h-[56px] text-sm md:text-base btn-glow hover:scale-[1.03] transition-all px-8" 
              asChild
            >
              <Link to="/contact" onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "hero", label: "Book Your Free Demo" } })}>
                Book Your Free Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <a 
              href={`tel:${demoNumber.replace(/\s/g, '')}`}
              onClick={() => trackEvent({ event_name: "demo_call_click", event_category: "cta", metadata: { location: "hero" } })}
              className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] border border-border/50 rounded-full px-6 hover:border-primary/30"
            >
              <Phone className="w-4 h-4" />
              Hear the AI live: {demoNumber}
            </a>
          </motion.div>

          {/* Trust microcopy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 md:mb-14"
          >
            {["15-min demo, no obligation", "Live in ~72 hours", "No long-term contract"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* Proof Row — hard numbers */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto pt-8 md:pt-10 border-t border-border/50"
          >
            {[
              { value: "<2s", label: "Average pickup" },
              { value: "24/7", label: "Always answering" },
              { value: "30+", label: "Languages" },
              { value: "99.9%", label: "Uptime target" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
