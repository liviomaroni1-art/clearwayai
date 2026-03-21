import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-36 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-zinc-400 mb-10 text-base md:text-lg leading-relaxed">{t('cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" className="px-8" asChild>
              <Link to="/contact" onClick={() => trackEvent({ event_name: "cta_click", event_category: "cta", metadata: { location: "bottom_cta", label: t('cta.button') } })}>
                {t('cta.button')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="px-8" asChild>
              <a href="#features">{t('hero.seeHow')}</a>
            </Button>
          </div>
          <p className="text-xs text-zinc-500 mt-8">{t('cta.note')}</p>
          <p className="text-xs text-zinc-600 mt-3">{t('pricing.hint')}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
