import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
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
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industries.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(stepInterval);
  }, []);

  const processSteps = [
    { key: 'hero.process.ad', icon: '📣' },
    { key: 'hero.process.lead', icon: '👤' },
    { key: 'hero.process.call', icon: '📞' },
    { key: 'hero.process.close', icon: '✅' },
  ];

  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[55vh]">
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

          {/* Right side - Scrolling industry names */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex flex-col items-start justify-center relative"
          >
            <div className="relative w-full overflow-hidden" style={{ height: '360px' }}>
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

        {/* Animated process flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 md:mt-24 pt-12 border-t border-border"
        >
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            {processSteps.map((step, i) => (
              <div key={step.key} className="flex items-center gap-2 md:gap-4">
                <motion.div
                  animate={{
                    scale: activeStep === i ? 1.05 : 1,
                    opacity: activeStep === i ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-colors duration-300 ${
                    activeStep === i
                      ? 'border-foreground/30 bg-foreground/5'
                      : 'border-border bg-transparent'
                  }`}
                >
                  <span className="text-base">{step.icon}</span>
                  <span className="text-xs md:text-sm font-semibold text-foreground whitespace-nowrap">
                    {t(step.key)}
                  </span>
                </motion.div>
                {i < processSteps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
