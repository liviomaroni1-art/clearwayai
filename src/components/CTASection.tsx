import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const CTASection = () => {
  return (
    <section className="section-padding border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-5">
            Stop Leaving Revenue in Your CRM.
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Book a free strategy call. We'll map the gaps in your funnel and show you what we'd build. You decide.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact" onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "bottom_cta", label: "Book Your Strategy Call" } })}>
              Book Your Strategy Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-5">
            No hard pitch — just a clear action plan for your pipeline.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
