import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <section id="contact" className="section-calm">
      <div className="container mx-auto px-6">
        {/* Empathetic closing */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-transition mb-12"
        >
          You've seen what's possible. Let's make it clear together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative elevated-card p-10 md:p-16 overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Main CTA */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-6"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium">Live in 48 hours</span>
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                  Ready to clear
                  <br />
                  <span className="gradient-text">the noise?</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-lg mb-8">
                  Free 30-minute consultation. We'll analyze your call flow and show you 
                  exactly what's possible—no pressure, just clarity.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button variant="hero" size="xl" className="min-h-[56px] shadow-lg hover:shadow-xl transition-shadow" asChild>
                    <Link to="/contact">
                      Start Clearing the Noise
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
                
                {/* Trust points */}
                <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                  {["No credit card", "No commitment", "Instant clarity"].map((point) => (
                    <div key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Call Demo */}
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-4 bg-primary/5 rounded-3xl blur-xl"
                />
                <div className="relative glass-card border-primary/20 p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Hear it for yourself
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Call our AI receptionist now—available 24/7
                  </p>
                  
                  {/* Languages badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/50 border border-border/30 rounded-full text-xs mb-6">
                    <Globe className="w-3.5 h-3.5 text-primary" />
                    <span className="text-muted-foreground">30+ languages supported</span>
                  </div>
                  
                  <a
                    href={`tel:${demoNumber.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-xl transition-all hover:scale-[1.02] shadow-lg w-full justify-center"
                  >
                    <Phone className="w-6 h-6" />
                    {demoNumber}
                  </a>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    Experience: Greeting → Appointment booking → CRM sync → Confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;