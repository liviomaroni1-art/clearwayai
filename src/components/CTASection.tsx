import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section
      className="py-20 md:py-28 border-t border-[#1E1E2E] relative overflow-hidden"
      style={{ background: '#0F0F1A' }}
    >
      {/* Multi-layer glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'rgba(79, 110, 247, 0.1)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[80px]"
          style={{ background: 'rgba(124, 58, 237, 0.06)' }}
        />
        <div className="bg-dots absolute inset-0 opacity-20" />
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
              background: 'linear-gradient(135deg, #ffffff 30%, #4F6EF7 70%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('cta.title')}
          </h2>
          <p className="mb-10 text-base md:text-lg leading-relaxed" style={{ color: '#8B8BA3' }}>
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
          <p className="text-xs mt-8" style={{ color: '#8B8BA3' }}>
            {t('cta.note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
