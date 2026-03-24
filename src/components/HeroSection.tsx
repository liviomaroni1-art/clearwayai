import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown , ShieldCheck} from "lucide-react";
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

  return (
    <section
      className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden"
      style={{ background: '#0A0A0F' }}
    >
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full blur-[160px]"
          style={{ background: 'rgba(79, 110, 247, 0.12)' }}
        />
        <div
          className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'rgba(124, 58, 237, 0.08)' }}
        />
        <div className="bg-dots absolute inset-0 opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[50vh]">
          {/* Left side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ borderColor: '#4F6EF7', color: '#4F6EF7', background: 'rgba(79, 110, 247, 0.08)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#4F6EF7' }} />
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
                const keyword = headline.includes('Wachstum') ? 'Wachstum.' : 'Growth.';
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
              className="text-base md:text-lg max-w-md mb-10 leading-relaxed"
              style={{ color: '#8B8BA3' }}
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
                  <ChevronDown className="w-4 h-4 opacity-60" />
                </a>
              </Button>
            </motion.div>

            {/* Social proof micro-line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-5 text-xs flex items-center gap-1.5"
              style={{ color: '#8B8BA3' }}
            >
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#4F6EF7' }} />
              {t('hero.guarantee')}
            </motion.p>
          </div>

          {/* Right side — scrolling industry names with mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex flex-col items-start justify-center relative"
          >
            <div
              className="relative w-full overflow-hidden"
              style={{
                height: '340px',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
              }}
            >
              <div
                className="flex flex-col gap-2 absolute inset-0"
                style={{ background: 'transparent' }}
              >
                {industryKeys.map((key, i) => {
                  const distance = Math.abs(i - currentIndex);
                  const isActive = distance === 0;
                  const opacity = isActive ? 1 : distance === 1 ? 0.35 : 0.12;
                  const scale = isActive ? 1 : 0.94;
                  return (
                    <motion.div
                      key={key}
                      animate={{
                        opacity,
                        scale,
                        y: -(currentIndex * 58) + 120,
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="font-bold text-white whitespace-nowrap"
                      style={{
                        fontSize: isActive ? '3rem' : '2.5rem',
                        ...(isActive
                          ? {
                              background: 'linear-gradient(135deg, #4F6EF7 0%, #7C3AED 100%)',
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
