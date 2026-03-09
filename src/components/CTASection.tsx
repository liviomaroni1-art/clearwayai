import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Stop Leaving Revenue in Your CRM.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Book a free strategy call. We'll map the gaps in your funnel and show you exactly what we'd build. You decide if you want us to implement it.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="btn-glow hover:scale-[1.03] transition-all px-8"
              asChild
            >
              <Link to="/contact" onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "bottom_cta", label: "Book Your Strategy Call" } })}>
                Book Your Strategy Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              No hard pitch — just a clear action plan for your pipeline.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
