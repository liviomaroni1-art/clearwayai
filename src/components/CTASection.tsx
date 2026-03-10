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
            Stop Losing Leads to Slow Follow-Up
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Book a demo and we'll show you exactly how an AI agent can qualify your leads and fill your calendar — without adding headcount.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact" onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "bottom_cta", label: "Book a Demo" } })}>
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-5">
            No commitment — see a live agent in action first.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
