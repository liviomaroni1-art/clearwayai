import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
    const demoNumber = "+1 (888) 560-2165";
  
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-24 pb-0">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-10 md:mb-12"
          >
            <span className="text-primary font-medium">AI-powered lead capture for service businesses</span>
          </motion.div>

          <span className="sr-only">Clearway AI</span>

          {/* H1 — two lines max */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 md:mb-8 text-foreground"
          >
            Turn Missed Calls Into Booked Jobs.
            <br />
            <span className="gradient-text">On Autopilot.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed"
          >
            AI that captures every lead, follows up automatically, and brings back old customers — for home-service and local businesses.
          </motion.p>

          {/* 3 Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-10 md:mb-14"
          >
            {[
              "More booked jobs, same traffic",
              "Old customers come back",
              "Fewer no-shows, less admin",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* CTA Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 md:mb-8"
          >
            <Button 
              variant="hero" 
              size="lg"
              className="w-full sm:w-auto min-h-[52px] md:min-h-[56px] text-sm md:text-base btn-glow hover:scale-[1.03] transition-all px-8" 
              asChild
            >
              <Link to="/contact" onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "hero", label: "Book a Free Growth Audit" } })}>
                Book a Free Growth Audit
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
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
          >
            {["15-min audit, no obligation", "Live in ~72 hours", "No long-term contract"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground py-1">
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats band — separate from hero content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full mt-14 md:mt-20 py-10 md:py-14 border-t border-border/50 bg-card/30"
      >
        <div className="container mx-auto px-6">
          <p className="text-xs text-muted-foreground text-center mb-6 uppercase tracking-widest">What you get</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[
              { value: "24/7", label: "Lead capture" },
              { value: "<2s", label: "Response time" },
              { value: "3x", label: "More repeat business" },
              { value: "72h", label: "Average go-live" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
