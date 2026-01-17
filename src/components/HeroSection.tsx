import { motion } from "framer-motion";
import { ArrowRight, Phone, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/clearway-logo.png";
import SwissTrustBar from "./SwissTrustBar";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Large Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.img 
          src={logo} 
          alt="" 
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-[100vw] md:w-[80vw] lg:w-[70vw] max-w-[1200px] h-auto brightness-150"
        />
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* ROI Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm mb-6"
          >
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium">Save CHF 54,000/year vs human receptionist</span>
          </motion.div>

          {/* Hero Card - Morningside Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Gradient border glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-3xl blur-sm opacity-50" />
            
            <div className="relative bg-card/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 border border-primary/20">
              {/* Main Heading - Conversion Optimized */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Replace Your CHF 4,500 Receptionist
                <br />
                <span className="gradient-text">With AI That Works 24/7 for CHF 2,500</span>
              </h1>

              {/* Description - Benefit focused */}
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
                Never miss a call again. Your AI receptionist answers instantly, books appointments, 
                and syncs with your CRM—even at 3 AM. Swiss-built. Live in 48 hours.
              </p>
              
              {/* Trust line */}
              <p className="text-sm text-primary/80 mb-8 font-medium">
                Trusted by Swiss clinics, law firms, and professional service teams
              </p>

              {/* CTA Buttons - Mobile optimized */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" className="w-full sm:w-auto min-h-[48px]" asChild>
                  <Link to="/contact">
                    Book Free Demo — See It Live
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto min-h-[48px]" asChild>
                  <a href="#calculator">
                    <TrendingDown className="w-5 h-5" />
                    Calculate Your Savings
                  </a>
                </Button>
              </div>

              {/* Quick stats row */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-border/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">48h</div>
                  <div className="text-xs text-muted-foreground">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">24/7</div>
                  <div className="text-xs text-muted-foreground">Availability</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">&lt;3s</div>
                  <div className="text-xs text-muted-foreground">Response</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Swiss Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <SwissTrustBar />
          </motion.div>

          {/* Tech Stack Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6"
          >
            <p className="text-xs text-muted-foreground mb-3">Powered by</p>
            <div className="flex flex-wrap justify-center gap-3 text-muted-foreground/60 text-sm font-medium">
              <span className="px-3 py-1 border border-border/50 rounded-full">Retell.ai</span>
              <span className="px-3 py-1 border border-border/50 rounded-full">n8n</span>
              <span className="px-3 py-1 border border-border/50 rounded-full">Google Calendar</span>
              <span className="px-3 py-1 border border-border/50 rounded-full">HubSpot</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
