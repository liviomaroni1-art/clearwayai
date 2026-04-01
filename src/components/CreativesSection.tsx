import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

interface Creative {
  url: string;
  alt: string;
  industry: string;
}

const creatives: Creative[] = [
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/9110f47d-d168-4e42-8fda-082196413433/ba8219f4-210b-421f-b661-015cedf79c44/v1-1774709771554.png",
    alt: "Keine Zeit für Akquise? Wir übernehmen.",
    industry: "Steuerberatung",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/9110f47d-d168-4e42-8fda-082196413433/e251ac25-3bb5-49c2-abc0-e69165dc92af/v1-1774710931758.png",
    alt: "15+ Leads oder gratis arbeiten",
    industry: "Coaching",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/9110f47d-d168-4e42-8fda-082196413433/502e7c22-f7b6-4b26-bf54-f1e626b1291d/v1-1774709762907.png",
    alt: "Planbar neue Kunden gewinnen",
    industry: "Handwerk",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/9110f47d-d168-4e42-8fda-082196413433/3997ddf1-ad18-469a-81a7-71f35b119ecd/v1-1774711091732.png",
    alt: "Mehr Umsatz weniger Aufwand Kampagne",
    industry: "Agenturen",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/9110f47d-d168-4e42-8fda-082196413433/010efa1b-a38b-4424-96d6-747739595ec7/v1-1774710916175.png",
    alt: "Erfolgsgarantie für Dienstleister",
    industry: "Immobilien",
  },
];

const CreativesSection = () => {
  const { t, language } = useLanguage();
  const [active, setActive] = useState(0);
  const n = creatives.length;
  const touchStartX = useRef<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setActive((prev) => (prev + 1) % n);
  const prev = () => setActive((prev) => (prev - 1 + n) % n);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % n);
    }, 5000);
  };

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next(); else prev();
      resetAutoPlay();
    }
    touchStartX.current = null;
  };

  const getStyle = (offset: number): React.CSSProperties => {
    if (offset === 0) {
      return {
        transform: "translateX(0%) scale(1) translateZ(0px)",
        zIndex: 10,
        opacity: 1,
        filter: "brightness(1)",
      };
    }
    if (offset === 1 || offset === -(n - 1)) {
      return {
        transform: "translateX(65%) scale(0.78) translateZ(-120px)",
        zIndex: 5,
        opacity: 0.5,
        filter: "brightness(0.5)",
      };
    }
    if (offset === -1 || offset === (n - 1)) {
      return {
        transform: "translateX(-65%) scale(0.78) translateZ(-120px)",
        zIndex: 5,
        opacity: 0.5,
        filter: "brightness(0.5)",
      };
    }
    return {
      transform: "translateX(0%) scale(0.5) translateZ(-300px)",
      zIndex: 1,
      opacity: 0,
    };
  };

  const current = creatives[active];

  return (
    <section className="py-24 md:py-32 overflow-hidden relative">
      <div className="absolute inset-0 bg-mesh-section pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white mb-4 tracking-tight">
            {language === 'de' ? 'So sehen unsere Kampagnen aus' : 'What our campaigns look like'}
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#7E8594' }}>
            {language === 'de'
              ? 'Beispiel-Anzeigen aus unserer laufenden Arbeit. Kundenkampagnen zeigen wir aus Datenschutzgründen nicht.'
              : 'Sample ads from our ongoing work. We don\'t show client campaigns for privacy reasons.'}
          </p>
        </motion.div>

        <div className="flex items-center justify-center mb-8">
          <span
            className="px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{
              border: '1px solid hsl(224 76% 58% / 0.2)',
              color: '#4B7BF5',
              background: 'hsl(224 76% 58% / 0.06)',
            }}
          >
            {current.industry}
          </span>
        </div>

        <div
          className="relative flex items-center justify-center"
          style={{ height: "560px", perspective: "1000px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {creatives.map((creative, i) => {
            const offset = ((i - active + n) % n + n) % n;
            const normOffset = offset > n / 2 ? offset - n : offset;
            const style = getStyle(normOffset);
            return (
              <div
                key={i}
                onClick={() => {
                  if (normOffset !== 0) {
                    setActive(i);
                    resetAutoPlay();
                  }
                }}
                style={{
                  position: "absolute",
                  width: "320px",
                  transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  cursor: normOffset === 0 ? "default" : "pointer",
                  ...style,
                }}
              >
                <img
                  src={creative.url}
                  alt={creative.alt}
                  className="w-full h-auto rounded-2xl"
                  style={{
                    boxShadow: normOffset === 0
                      ? '0 20px 60px -12px rgba(0,0,0,0.6), 0 0 40px -8px hsl(224 76% 58% / 0.1)'
                      : '0 8px 24px -4px rgba(0,0,0,0.4)',
                  }}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {creatives.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); resetAutoPlay(); }}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === active ? '24px' : '8px',
                height: '8px',
                background: i === active
                  ? 'linear-gradient(135deg, #4B7BF5, #7C3AED)'
                  : 'hsl(225 14% 20%)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativesSection;
