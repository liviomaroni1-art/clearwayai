import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/clearway-logo.png";
import SwissTrustBar from "./SwissTrustBar";
import LiveDemoPhone from "./LiveDemoPhone";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Large Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.img 
          src={logo} 
          alt="" 
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-[100vw] md:w-[80vw] lg:w-[70vw] max-w-[1200px] h-auto brightness-150"
        />
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/60 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Early Bird Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-primary/20 border border-amber-500/30 rounded-full text-sm mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-semibold">🚀 Early Access: First 5 Swiss practices get 50% OFF setup</span>
          </motion.div>

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Gradient border glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-3xl blur-sm opacity-50" />
            
            <div className="relative bg-card/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 border border-primary/20">
              {/* Main Heading - Swiss-focused */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ihre CHF 4'500 Empfangsdame ersetzen
                <br />
                <span className="gradient-text">Mit KI für CHF 2'500/Monat — 24/7 aktiv</span>
              </h1>

              {/* Description - Benefit focused */}
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
                Kein verpasster Anruf mehr. Unsere KI-Rezeptionistin antwortet sofort, bucht Termine 
                und synchronisiert mit Ihrem CRM—auch um 3 Uhr morgens. Swiss-made. In 48 Stunden live.
              </p>
              
              {/* Trust line */}
              <p className="text-sm text-primary/80 mb-8 font-medium">
                Entwickelt für Schweizer Praxen, Kanzleien und Agenturen in Zürich, Zug und der ganzen Schweiz
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" className="w-full sm:w-auto min-h-[56px] text-base" asChild>
                  <Link to="/contact">
                    Kostenlose Demo buchen
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto min-h-[56px] text-base" asChild>
                  <a href="#calculator">
                    <TrendingDown className="w-5 h-5" />
                    ROI berechnen
                  </a>
                </Button>
              </div>

              {/* Quick stats row */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-border/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">48h</div>
                  <div className="text-xs text-muted-foreground">Setup</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">24/7</div>
                  <div className="text-xs text-muted-foreground">Erreichbar</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">CHF 54K</div>
                  <div className="text-xs text-muted-foreground">Ersparnis/Jahr</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* LIVE DEMO PHONE - TOP PRIORITY */}
          <LiveDemoPhone variant="hero" />

          {/* Swiss Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8"
          >
            <SwissTrustBar />
          </motion.div>

          {/* Tech Stack Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
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
