import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const CTASection = () => {
  const demoNumber = "+1 (888) 560-2165";
  
  return (
    <section id="contact" className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card p-6 md:p-10 lg:p-16 overflow-hidden rounded-3xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/15 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">
              More Leads Captured. More Jobs Closed.
              <br />
              <span className="gradient-text">More Customers Coming Back.</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto mb-6 md:mb-8">
              Book a free 15-minute growth audit. We'll map exactly where leads are falling through, which old customers you could reactivate, and how to turn it all into booked jobs — without hiring extra staff.
            </p>
            
            <Button 
              variant="hero" 
              size="lg" 
              className="min-h-[48px] md:min-h-[56px] btn-glow hover:scale-105 transition-all"
              asChild
            >
              <Link to="/contact" onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "bottom_cta", label: "Book a Free Growth Audit" } })}>
                Book a Free Growth Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <div className="flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-8 justify-center">
              {["15 minutes", "No obligation", "We reply within 24–48h"].map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Or hear the AI yourself:{" "}
              <a href={`tel:${demoNumber.replace(/\s/g, '')}`} className="text-primary hover:underline">
                {demoNumber}
              </a>
              {" "}(live demo line, available 24/7)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
