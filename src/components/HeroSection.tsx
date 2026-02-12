import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-24 pb-12 md:pb-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/8 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-8"
          >
            <span className="text-primary font-medium">Built for clinics, law firms & service businesses</span>
          </motion.div>

          {/* H1 – specific headline: who + main benefit */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 md:mb-6 text-foreground"
          >
            Never Lose a Client
            <br />
            <span className="gradient-text">to a Missed Call Again</span>
          </motion.h1>

          {/* Subheadline – one sentence explaining what the AI receptionist does */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-2 sm:px-0"
          >
            Clearway AI answers every call, qualifies leads, and books appointments directly into your calendar—24/7, in 30+ languages.
          </motion.p>

          {/* 3 outcome-focused bullets */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 px-2"
          >
            {[
              "Fewer missed calls, more revenue",
              "Appointments booked automatically",
              "No extra staff needed"
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* Primary CTA + Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 md:mb-6 px-2 sm:px-0"
          >
            <Button 
              variant="hero" 
              size="lg"
              className="w-full sm:w-auto min-h-[48px] md:min-h-[56px] text-sm md:text-base btn-glow hover:scale-105 transition-all px-6 md:px-8" 
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
              className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px]"
            >
              <Phone className="w-4 h-4" />
              Or hear the AI live: {demoNumber}
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs text-muted-foreground"
          >
            Live in ~72 hours · 99.9% uptime target · No long-term contract required
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 mt-10 md:mt-16 pt-8 md:pt-12 border-t border-border"
          >
            {[
              { value: "<2s", label: "Pickup speed" },
              { value: "24/7", label: "Always answering" },
              { value: "30+", label: "Languages" },
              { value: "~72h", label: "Go-live time" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
