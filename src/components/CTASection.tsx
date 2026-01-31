import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card p-10 md:p-16 overflow-hidden rounded-3xl"
        >
          {/* Glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/15 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Main CTA */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                  Ready to Stop
                  <br />
                  <span className="gradient-text">Leaving Money on the Table?</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-lg mb-8">
                  Book your free 15-minute demo. We'll show you exactly how Clearway AI can capture the calls you're missing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="min-h-[56px] btn-glow hover:scale-105 transition-all" 
                    asChild
                  >
                    <Link to="/contact">
                      Book a Demo
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
                
                {/* Microcopy */}
                <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                  {["15 minutes", "No obligation", "We map your call flow"].map((point) => (
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
                <div className="relative glass-card border-primary/30 p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Call the Live Demo
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Experience the AI yourself—right now
                  </p>
                  
                  <a
                    href={`tel:${demoNumber.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-xl transition-all hover:scale-[1.02] w-full justify-center"
                  >
                    <Phone className="w-6 h-6" />
                    {demoNumber}
                  </a>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    24/7 • Greeting → Qualification → Booking
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
