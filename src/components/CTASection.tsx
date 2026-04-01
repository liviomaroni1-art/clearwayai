import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Multi-layer mesh gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[200px]"
          style={{ background: 'hsl(224 76% 58% / 0.15)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[100px]"
          style={{ background: 'hsl(262 83% 58% / 0.08)' }}
        />
        <div className="bg-grid absolute inset-0 opacity-15" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{
              border: '1px solid hsl(224 76% 58% / 0.2)',
              color: '#4B7BF5',
              background: 'hsl(224 76% 58% / 0.06)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t('hero.stats.companies')}
          </motion.div>

          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.08] tracking-tight">
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 20%, #4B7BF5 60%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('cta.title')}
            </span>
          </h2>
          <p className="mb-10 text-base md:text-lg leading-[1.7] max-w-lg mx-auto" style={{ color: '#7E8594' }}>
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="hero"
              size="lg"
              className="text-sm px-8 gap-2.5"
              asChild
            >
              <Link
                to="https://funnel.clearwayai.co/"
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
            <Button
              variant="heroOutline"
              size="lg"
              className="text-sm px-8"
              asChild
            >
              <a href="#how-it-works">{t('hero.seeHow')}</a>
            </Button>
          </div>

          <p className="text-xs mt-10" style={{ color: '#7E8594' }}>
            {t('cta.note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
