import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const CTASection = () => {
  const { t } = useLanguage();

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
            {t('cta.title')}
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            {t('cta.subtitle')}
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link
              to="/contact"
              onClick={() =>
                trackEvent({
                  event_name: "cta_click",
                  event_category: "cta",
                  metadata: { location: "bottom_cta", label: t('cta.button') },
                })
              }
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-5">
            {t('cta.note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
