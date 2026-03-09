import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const CTASection = () => {
  return (
    <section className="section-padding relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="elevated-card p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
            
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
              Stop Leaving Revenue
              <br />
              <span className="gradient-text">in Your CRM.</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Book a free strategy call. We'll map the gaps in your funnel and show you what we'd build. You decide.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="btn-glow px-8"
              asChild
            >
              <Link to="/contact" onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "bottom_cta", label: "Book Your Strategy Call" } })}>
                Book Your Strategy Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-5">
              No hard pitch — just a clear action plan for your pipeline.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
