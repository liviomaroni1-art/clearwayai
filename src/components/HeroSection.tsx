import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, AlertTriangle, PhoneForwarded, MessageSquare, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-24 pb-12 md:pb-16">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Floating orbs for visual interest */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/8 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-8"
          >
            <span className="text-primary font-medium">Built for clinics, law firms & service businesses</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 md:mb-6 text-foreground"
          >
            Stop Losing Clients
            <br />
            <span className="gradient-text">to Missed Calls</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-2 sm:px-0"
          >
            An AI receptionist that picks up every call, qualifies leads, and books appointments into your calendar—24/7. Live in ~72 hours.
          </motion.p>

          {/* CTAs - Single primary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 md:mb-6 px-2 sm:px-0"
          >
            <Button 
              variant="hero" 
              size="lg"
              className="w-full sm:w-auto min-h-[48px] md:min-h-[56px] text-sm md:text-base btn-glow hover:scale-105 transition-all px-6 md:px-8" 
              asChild
            >
              <Link to="/contact">
                Book Your Free Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <a 
              href={`tel:${demoNumber.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px]"
            >
              <Phone className="w-4 h-4" />
              Or try the live demo: {demoNumber}
            </a>
          </motion.div>

          {/* Microcopy bullets */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 md:mb-12 px-2"
          >
            {[
              "15-min setup call",
              "Live in ~72 hours",
              "No long-term contract required"
            ].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* Safety/Handoff Micro-block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <div className="glass-card border-warning/20 p-6 rounded-2xl bg-warning/5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <h3 className="font-semibold text-foreground">When it's unsure, it escalates—never guesses.</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <PhoneForwarded className="w-4 h-4 text-primary" />
                  Transfers to your team with full context
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Takes a message and sends SMS follow-up
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Logs call summary and tags in your CRM
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 mt-10 md:mt-16 pt-8 md:pt-12 border-t border-border"
          >
            {[
              { value: "~72h", label: "Go-live after onboarding" },
              { value: "99.9%", label: "Uptime target" },
              { value: "24/7", label: "Always answering" },
              { value: "<2s", label: "Pickup speed (target)" },
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
