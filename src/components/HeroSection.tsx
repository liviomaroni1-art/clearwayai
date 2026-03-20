import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <span className="sr-only">Clearway AI</span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-foreground"
          >
            {t('hero.headline1')} <br />
            <span className="text-muted-foreground">{t('hero.headline2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 mb-12"
          >
            <Button variant="hero" size="lg" className="w-full sm:w-auto px-8" asChild>
              <Link
                to="/contact"
                onClick={() =>
                  trackEvent({
                    event_name: "cta_click",
                    event_category: "cta",
                    metadata: { location: "hero", label: t('hero.cta') },
                  })
                }
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[48px] border border-border rounded-full px-6"
            >
              <ArrowDown className="w-4 h-4" />
              {t('hero.seeHow')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
              {t('hero.chooseModel')}
            </p>
            <div className="flex items-center gap-6">
              <div className="text-xs font-semibold text-muted-foreground tracking-wide">
                {t('hero.qualifiedLeads')}
              </div>
              <div className="text-xs font-semibold text-muted-foreground tracking-wide">
                {t('hero.bookedCalls')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
