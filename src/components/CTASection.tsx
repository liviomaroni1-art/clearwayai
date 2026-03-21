import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-36 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-muted-foreground mb-10 text-base md:text-lg leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" className="uppercase tracking-widest text-sm px-8" asChild>
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
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="uppercase tracking-widest text-sm px-8" asChild>
              <a href="#how-it-works">{t('hero.seeHow')}</a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-8">
            {t('cta.note')}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-3 border-t border-border pt-4 max-w-md mx-auto">
            {t('pricing.hint')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
