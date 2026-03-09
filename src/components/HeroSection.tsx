import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Zap, Bot, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12">
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(222_20%_15%/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(222_20%_15%/0.3)_1px,transparent_1px)] bg-[size:60px_60px] animate-grid-fade" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs mb-8"
            >
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-primary font-medium">AI-Powered Revenue Systems</span>
            </motion.div>

            <span className="sr-only">Clearway AI</span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-foreground"
            >
              Your Leads Are
              <br />
              <span className="gradient-text">Dying in the CRM.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              We install AI outbound & follow-up systems that convert your existing leads into revenue — without more ad spend.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Button
                variant="hero"
                size="lg"
                className="w-full sm:w-auto min-h-[52px] text-sm md:text-base btn-glow px-8"
                asChild
              >
                <Link to="/contact" onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "hero", label: "Book a Strategy Call" } })}>
                  Book a Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] border border-border/50 rounded-full px-6 hover:border-primary/30"
              >
                <ArrowDown className="w-4 h-4" />
                See How It Works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Trusted by growth teams at</p>
              <div className="flex items-center gap-6 opacity-30">
                {["Company A", "Company B", "Company C", "Company D"].map((name) => (
                  <div key={name} className="text-xs font-semibold text-muted-foreground tracking-wide">
                    {name}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Abstract AI visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Orbital rings */}
              <div className="absolute inset-0 rounded-full border border-primary/10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-6 rounded-full border border-secondary/10 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-12 rounded-full border border-primary/5 animate-[spin_25s_linear_infinite]" />

              {/* Center node */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-2xl bg-card border border-border/40 flex items-center justify-center shadow-[0_0_60px_-10px_hsl(199_89%_60%/0.3)]">
                  <Bot className="w-10 h-10 text-primary" />
                </div>
              </div>

              {/* Floating nodes */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 w-14 h-14 rounded-xl bg-card/80 border border-border/30 flex items-center justify-center backdrop-blur-xl"
              >
                <BarChart3 className="w-6 h-6 text-secondary" />
              </motion.div>
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-12 left-4 w-14 h-14 rounded-xl bg-card/80 border border-border/30 flex items-center justify-center backdrop-blur-xl"
              >
                <Zap className="w-6 h-6 text-primary" />
              </motion.div>

              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-primary/3 rounded-full blur-[80px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
