import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck, Zap, Clock, TrendingUp } from "lucide-react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % industryKeys.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Zap, value: t('hero.trustbar.leads'), sub: t('hero.trustbar.leads.sub') },
    { icon: Clock, value: t('hero.trustbar.time'), sub: t('hero.trustbar.time.sub') },
    { icon: TrendingUp, value: t('hero.trustbar.roas'), sub: t('hero.trustbar.roas.sub') },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-mesh-hero" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[15%] w-[500px] h-[500px] rounded-full blur-[180px]"
          style={{ background: 'hsl(224 76% 58% / 0.15)' }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] right-[5%] w-[400px] h-[400px] rounded-full blur-[180px]"
          style={{ background: 'hsl(262 83% 58% / 0.1)' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[55vh]">
          {/* Left side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold mb-8"
              style={{
                border: '1px solid hsl(224 76% 58% / 0.2)',
                color: '#4B7BF5',
                background: 'hsl(224 76% 58% / 0.06)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4B7BF5] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4B7BF5]" />
              </span>
              B2B Lead Generation — Done For You
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-bold text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[3.75rem] leading-[1.06] mb-7"
            >
              {(() => {
                const headline = t('hero.headline1');
                const keyword = headline.includes('Wachstum') ? 'Wachstum.' : 'Growth.';
                const parts = headline.split(keyword);
                if (parts.length > 1) {
                  return (
                    <>
                      <span className="gradient-text-white">{parts[0]}</span>
                      <span className="gradient-text-blue">{keyword}</span>
                      {parts[1]}
                    </>
                  );
                }
                return <span className="gradient-text-white">{headline}</span>;
              })()}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base md:text-lg max-w-lg mb-10 leading-[1.7]"
              style={{ color: '#7E8594' }}
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
                className="w-full sm:w-auto px-8 text-sm gap-2.5"
                asChild
              >
                <Link
                  to="https://funnel.clearwayai.co/"
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
                className="w-full sm:w-auto px-8 text-sm gap-2"
                asChild
              >
                <a href="#how-it-works">
                  {t('hero.seeHow')}
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </a>
              </Button>
            </motion.div>

            {/* Guarantee */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-xs flex items-center gap-2"
              style={{ color: '#7E8594' }}
            >
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-[#4B7BF5]" />
              {t('hero.guarantee')}
            </motion.p>
          </div>

          {/* Right side — scrolling industry names with stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex flex-col items-start justify-center relative"
          >
            {/* Industry scroller */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                height: '300px',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              }}
            >
              <div className="flex flex-col gap-2 absolute inset-0">
                {industryKeys.map((key, i) => {
                  const distance = Math.abs(i - currentIndex);
                  const isActive = distance === 0;
                  const opacity = isActive ? 1 : distance === 1 ? 0.3 : 0.08;
                  const scale = isActive ? 1 : 0.92;
                  return (
                    <motion.div
                      key={key}
                      animate={{
                        opacity,
                        scale,
                        y: -(currentIndex * 54) + 105,
                      }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="font-bold text-white whitespace-nowrap"
                      style={{
                        fontSize: isActive ? '2.75rem' : '2.25rem',
                        letterSpacing: '-0.02em',
                        ...(isActive
                          ? {
                              background: 'linear-gradient(135deg, #4B7BF5 0%, #7C3AED 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }
                          : {}),
                      }}
                    >
                      {t(key)}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 mt-4 w-full">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 flex-1"
                >
                  <div
                    className="p-2 rounded-xl flex-shrink-0"
                    style={{ background: 'hsl(224 76% 58% / 0.08)' }}
                  >
                    <stat.icon className="w-4 h-4 text-[#4B7BF5]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{stat.value}</div>
                    <div className="text-[#7E8594] text-xs mt-0.5">{stat.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, hsl(228 14% 4%))' }}
      />
    </section>
  );
};

export default HeroSection;
