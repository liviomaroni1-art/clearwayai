import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/clearway-logo.png";
import LiveDemoPhone from "./LiveDemoPhone";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Large Background Logo - Premium watermark effect */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.img 
          src={logo} 
          alt="" 
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.25, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-[100vw] md:w-[80vw] lg:w-[70vw] max-w-[1200px] h-auto brightness-150"
        />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />
      
      {/* Cyan glow accent */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Early Access Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Early Access: First 5 practices get 50% OFF setup</span>
          </motion.div>

          {/* Main Heading - High contrast white text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-100"
          >
            AI that clears the noise—
            <br />
            <span className="gradient-text">so you can see the way forward.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            ClearwayAI helps teams make confident, intelligent decisions—fast. 
            Our AI receptionist answers every call, books appointments, and keeps your focus clear.
          </motion.p>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <span className="text-sm text-gray-500 font-medium">
              Built for clinics, law firms, and agencies
            </span>
            <span className="flex items-center gap-1.5 text-sm text-primary font-medium">
              <Globe className="w-4 h-4" />
              30+ languages
            </span>
          </motion.div>

          {/* CTA Buttons with glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full sm:w-auto min-h-[56px] text-base btn-glow hover:scale-105 transition-all" 
              asChild
            >
              <Link to="/contact">
                See It in Action
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl" 
              className="w-full sm:w-auto min-h-[56px] text-base border-gray-700 text-gray-300 hover:bg-white/5 hover:border-gray-600" 
              asChild
            >
              <a href="#how-it-works">
                <Play className="w-5 h-5" />
                How It Works
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12 mt-12 pt-10 border-t border-white/10"
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
                <div className="text-2xl md:text-3xl font-bold text-gray-100">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
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

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10"
          >
            <p className="text-xs text-gray-500 mb-3">Powered by industry leaders</p>
            <div className="flex flex-wrap justify-center gap-3 text-gray-500 text-sm">
              {["Retell.ai", "n8n", "Google Calendar", "HubSpot"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
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