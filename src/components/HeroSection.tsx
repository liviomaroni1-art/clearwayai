import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, AlertTriangle, PhoneForwarded, MessageSquare, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
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
          
          {/* Trust Badge - Safe claim */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm mb-8"
          >
            <span className="text-primary font-medium">Used by clinics, law firms, and service businesses across the US</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-foreground"
          >
            Never Miss a Call Again
            <br />
            <span className="gradient-text">Your AI Receptionist Answers, Qualifies, and Books Appointments 24/7</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            Built for clinics, law firms, and service businesses that lose revenue when calls go unanswered. 
            Answers in under 2 seconds, books directly into your calendar, qualifies leads, and logs every call into your CRM.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full sm:w-auto min-h-[60px] text-lg btn-glow hover:scale-105 transition-all px-8" 
              asChild
            >
              <Link to="/contact">
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl" 
              className="w-full sm:w-auto min-h-[60px] text-lg border-border text-foreground hover:bg-muted" 
              asChild
            >
              <a href={`tel:${demoNumber.replace(/\s/g, '')}`}>
                <Phone className="w-5 h-5" />
                Call the Live Demo: {demoNumber}
              </a>
            </Button>
          </motion.div>

          {/* Microcopy bullets */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              "15 minutes. No obligation.",
              "We map your call flow + routing.",
              "Live ~72h after onboarding."
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
            <div className="glass-card border-amber-500/30 p-6 rounded-2xl bg-amber-500/5">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-foreground">If the AI isn't sure, it doesn't guess.</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <PhoneForwarded className="w-4 h-4 text-primary" />
                  Transfers to your staff or department
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Captures voicemail + SMS follow-up
                </li>
                <li className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Creates a call summary + tags in your CRM
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-12 border-t border-border"
          >
            {[
              { value: "~72h", label: "After onboarding" },
              { value: "99.9%", label: "Uptime target" },
              { value: "24/7", label: "Always on" },
              { value: "<2s", label: "Answer time (target)" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
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
