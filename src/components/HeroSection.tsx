import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/clearway-logo.png";

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
              {/* Main Heading */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                AI That Answers Calls, Emails & Schedules—
                <br />
                <span className="gradient-text">So You Don't Have To</span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
                We build and deploy AI-powered systems that handle inbound calls, respond to emails, 
                book appointments, and manage customer inquiries—giving your team time back for high-value work.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-8">
                Built for service-based teams that rely on calls, emails, and bookings to grow.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/contact">
                    Book Free Consultation
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <a href="#services">See How It Works</a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Trusted By - Company Logos Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <p className="text-sm text-muted-foreground mb-6">Trusted by service-focused teams across industries</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground/70">
              {["Healthcare", "Logistics", "Professional Services", "Real Estate"].map((industry) => (
                <div 
                  key={industry}
                  className="px-4 py-2 text-sm font-medium tracking-wide border border-border/30 rounded-full"
                >
                  {industry}
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
