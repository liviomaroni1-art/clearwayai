import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-24 pb-0">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-10 md:mb-12"
          >
            <span className="text-primary font-medium">AI-powered revenue systems for B2B</span>
          </motion.div>

          <span className="sr-only">Clearway AI</span>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6 md:mb-8 text-foreground"
          >
            Turn Leads Into Revenue.
            <br />
            <span className="gradient-text">On Autopilot.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 md:mb-14 leading-relaxed"
          >
            We install AI-powered outbound and follow-up systems that convert your existing leads, trials, and demo requests into revenue — without needing more traffic.
          </motion.p>

          {/* CTA Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8"
          >
            <Button
              variant="hero"
              size="lg"
              className="w-full sm:w-auto min-h-[52px] md:min-h-[56px] text-sm md:text-base btn-glow hover:scale-[1.03] transition-all px-8"
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

          {/* Trusted by */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 md:mt-16"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">Trusted by growth teams at</p>
            <div className="flex items-center justify-center gap-8 md:gap-12 opacity-40">
              {["Company A", "Company B", "Company C", "Company D"].map((name) => (
                <div key={name} className="text-sm font-semibold text-muted-foreground tracking-wide">
                  {name}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
