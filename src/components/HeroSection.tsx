import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const industries = [
  'hero.industry1',
  'hero.industry2',
  'hero.industry3',
  'hero.industry4',
  'hero.industry5',
  'hero.industry6',
  'hero.industry7',
];

const HeroSection = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[60vh]">
          {/* Left side - Content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] mb-6 text-foreground"
            >
              {t('hero.headline1')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base md:text-lg text-muted-foreground max-w-md mb-10 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button variant="hero" size="lg" className="w-full sm:w-auto px-8 uppercase tracking-wider text-sm" asChild>
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
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" className="w-full sm:w-auto px-8 uppercase tracking-wider text-sm" asChild>
                <a href="#how-it-works">
                  {t('hero.seeHow')}
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right side - Scrolling industry names like Assembly */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex flex-col items-start justify-center relative"
          >
            <div className="relative w-full overflow-hidden" style={{ height: '360px' }}>
              {/* Fade gradient at top and bottom */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />

              <div className="flex flex-col gap-2 relative">
                {industries.map((key, i) => {
                  const distance = Math.abs(i - currentIndex);
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.35 : 0.15;
                  const scale = distance === 0 ? 1 : 0.95;

                  return (
                    <motion.div
                      key={key}
                      animate={{
                        opacity,
                        scale,
                        y: -(currentIndex * 56) + 140,
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="font-display font-bold text-foreground whitespace-nowrap"
                      style={{ fontSize: distance === 0 ? '3rem' : '2.5rem' }}
                    >
                      {t(key)}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
