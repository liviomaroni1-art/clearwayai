import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LiveDemoPhone from "./LiveDemoPhone";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Calm gradient background with subtle motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 50%, hsl(175 70% 42% / 0.08), transparent)",
          }}
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Early Access Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Early Access: First 5 practices get 50% OFF setup</span>
          </motion.div>

          {/* Main Heading - Emotional clarity */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground"
          >
            AI that clears the noise—
            <br />
            <span className="gradient-text">so you can see the way forward.</span>
          </motion.h1>

          {/* Subheadline - Calm confidence */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            Make faster, calmer, more confident decisions. Our AI receptionist answers every call, 
            books appointments, and keeps your team focused on what matters.
          </motion.p>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <span className="text-sm text-muted-foreground font-medium">
              Built for clinics, law firms, and agencies
            </span>
            <span className="flex items-center gap-1.5 text-sm text-primary font-medium">
              <Globe className="w-4 h-4" />
              30+ languages
            </span>
          </motion.div>

          {/* CTA Buttons - Emotionally progressive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="xl" className="w-full sm:w-auto min-h-[56px] text-base shadow-lg hover:shadow-xl transition-shadow" asChild>
              <Link to="/contact">
                See It in Action
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto min-h-[56px] text-base" asChild>
              <a href="#how-it-works">
                <Play className="w-5 h-5" />
                How It Works
              </a>
            </Button>
          </motion.div>

          {/* Stats - Social proof with calm presentation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12 pt-10 border-t border-border/40"
          >
            {[
              { value: "48h", label: "Setup time" },
              { value: "99.9%", label: "Uptime" },
              { value: "24/7", label: "Availability" },
              { value: "$54K+", label: "Avg. saved/year" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* LIVE DEMO PHONE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <LiveDemoPhone variant="hero" />
          </motion.div>

          {/* Tech Stack - Minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10"
          >
            <p className="text-xs text-muted-foreground mb-3">Powered by industry leaders</p>
            <div className="flex flex-wrap justify-center gap-3 text-muted-foreground/70 text-sm">
              {["Retell.ai", "n8n", "Google Calendar", "HubSpot"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-secondary/50 border border-border/30 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;