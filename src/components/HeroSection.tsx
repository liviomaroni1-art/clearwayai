import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";

const industryKeys = [
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
      setCurrentIndex((prev) => (prev + 1) % industryKeys.length);
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
    { key: 'hero.process.ad' },
    { key: 'hero.process.lead' },
    { key: 'hero.process.call' },
    { key: 'hero.process.close' },
  ];



  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 overflow-hidden">
      {/* Background glow + dot pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="bg-dots absolute inset-0 opacity-40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[55vh]">
          {/* Left side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card text-xs font-semibold text-blue-400 mb-6 border border-blue-500/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              B2B Lead Generation — Done For You
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-bold text-4xl sm:text-5xl md:text-6xl leading-[1.08] mb-6 text-white"
            >
              {(() => {
                const headline = t('hero.headline1');
                const keyword = headline.includes('qualifizierten') ? 'qualifizierten' : 'Qualified';
                const parts = headline.split(keyword);
                if (parts.length > 1) {
                  return (
                    <>
                      {parts[0]}
                      <span className="gradient-text-blue">{keyword}</span>
                      {parts[1]}
                    </>
                  );
                }
                return headline;
              })()}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base md:text-lg text-zinc-400 max-w-md mb-10 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                variant="hero"
                size="lg"
                className="w-full sm:w-auto px-8 text-sm gap-2"
                asChild
              >
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
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="heroOutline"
                size="lg"
                className="w-full sm:w-auto px-8 text-sm"
                asChild
              >
                <a href="#how-it-works">{t('hero.seeHow')}</a>
              </Button>
            </motion.div>
          </div>

          {/* Right side — scrolling industry names */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex flex-col items-start justify-center relative"
          >
            <div className="relative w-full" style={{ height: '360px' }}>
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[hsl(var(--background))] to-transparent z-10 pointer-events-none" />

              <div className="flex flex-col gap-2 absolute inset-0 overflow-hidden">
                {industryKeys.map((key, i) => {
                  const distance = Math.abs(i - currentIndex);
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.3 : 0.12;
                  const scale = distance === 0 ? 1 : 0.94;

                  return (
                    <motion.div
                      key={key}
                      animate={{
                        opacity,
                        scale,
                        y: -(currentIndex * 58) + 140,
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="font-bold text-white whitespace-nowrap"
                      style={{
                        fontSize: distance === 0 ? '3rem' : '2.5rem',
                        ...(distance === 0 ? {
                          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        } : {}),
                      }}
                    >
                      {t(key)}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>


        {/* Animated process flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-14 pt-10 border-t border-white/8"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
            {processSteps.map((step, i) => (
              <div key={step.key} className="flex items-center gap-2 md:gap-3">
                <motion.div
                  animate={{
                    scale: activeStep === i ? 1.05 : 1,
                    opacity: activeStep === i ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-colors duration-300 ${
                    activeStep === i
                      ? 'border-blue-500/40 bg-blue-500/10 text-blue-300'
                      : 'border-white/10 bg-white/[0.03] text-zinc-400'
                  }`}
                >
                  <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
                    {t(step.key)}
                  </span>
                </motion.div>
                {i < processSteps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
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
