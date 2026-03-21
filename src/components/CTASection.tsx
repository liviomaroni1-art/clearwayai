import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-36 border-t border-white/8 relative overflow-hidden">
      {/* Multi-layer glow behind the section */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-600/12 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/8 rounded-full blur-[80px]" />
        <div className="bg-dots absolute inset-0 opacity-25" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2
            className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 30%, #93c5fd 70%, #c4b5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('cta.title')}
          </h2>

          <p className="text-zinc-400 mb-10 text-base md:text-lg leading-relaxed">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="hero"
              size="lg"
              className="text-sm px-8 gap-2"
              asChild
            >
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
            <Button
              variant="heroOutline"
              size="lg"
              className="text-sm px-8"
              asChild
            >
              <a href="#how-it-works">{t('hero.seeHow')}</a>
            </Button>
          </div>

          <p className="text-xs text-zinc-600 mt-8">
            {t('cta.note')}
          </p>
          <p className="text-xs text-zinc-700 mt-3 border-t border-white/8 pt-4 max-w-md mx-auto">
            {t('pricing.hint')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
