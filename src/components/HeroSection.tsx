import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Phone, CheckCircle2, Zap } from "lucide-react";
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
          
          {/* Scarcity + Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Trusted by 200+ clinics, law firms & service businesses</span>
          </motion.div>

          {/* Main Heading - Benefit-Focused with Emotional Trigger */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-gray-100"
          >
            Stop Losing Clients
            <br />
            <span className="gradient-text">to Missed Calls</span>
          </motion.h1>

          {/* Benefit-driven subhead with transformation promise */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed font-medium"
          >
            Your AI receptionist answers calls in under 2 seconds—24/7. Books appointments, qualifies leads, and syncs your CRM automatically.
          </motion.p>
          
          {/* Urgency + Simplicity statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
          >
            <span className="text-amber-400 font-medium">⚡ Go live in 72 hours</span> — no tech skills required.
          </motion.p>

          {/* Strong CTAs with Low-Friction Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button 
              variant="hero" 
              size="xl" 
              className="w-full sm:w-auto min-h-[60px] text-lg btn-glow hover:scale-105 transition-all px-8" 
              asChild
            >
              <Link to="/contact">
                <Zap className="w-5 h-5" />
                Unlock Your Free Strategy Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl" 
              className="w-full sm:w-auto min-h-[60px] text-lg border-gray-700 text-gray-300 hover:bg-white/5 hover:border-gray-600" 
              asChild
            >
              <a href="#how-it-works">
                <Play className="w-5 h-5" />
                See It In Action
              </a>
            </Button>
          </motion.div>

          {/* Trust indicators with specific outcomes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {["3-month cancellation notice", "99.9% uptime target", "Done-for-you setup"].map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* Live Demo Call Box with Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-md mx-auto"
          >
            <div className="glass-card border-primary/30 p-6 rounded-2xl">
              <p className="text-sm text-gray-400 mb-1">Experience it yourself—call now:</p>
              <p className="text-xs text-emerald-400 mb-3">🟢 AI is live and ready</p>
              <a
                href={`tel:${demoNumber.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-black px-6 py-4 rounded-xl font-bold text-xl transition-all hover:scale-[1.02] btn-glow"
              >
                <Phone className="w-6 h-6" />
                {demoNumber}
              </a>
              <p className="text-xs text-gray-500 mt-3">30+ languages • Instant pickup • Zero wait time</p>
            </div>
          </motion.div>

          {/* Stats with Anchoring Psychology */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-12 border-t border-white/10"
          >
            {[
              { value: "72h", label: "To go live" },
              { value: "99.9%", label: "Uptime target" },
              { value: "24/7", label: "Always on" },
              { value: "$54K+", label: "Avg. saved/year*" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
