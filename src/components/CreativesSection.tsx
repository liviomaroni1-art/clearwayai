import React, { useState, useEffect, useRef } from "react";

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
      if (diff > 0) {
        next();
      } else {
        prev();
      }
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
        transform: "translateX(65%) scale(0.76) translateZ(-120px)",
        zIndex: 5,
        opacity: 0.6,
        filter: "brightness(0.6)",
      };
    }
    if (offset === -1 || offset === (n - 1)) {
      return {
        transform: "translateX(-65%) scale(0.76) translateZ(-120px)",
        zIndex: 5,
        opacity: 0.6,
        filter: "brightness(0.6)",
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
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            So sehen unsere Kampagnen aus
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Beispiel-Anzeigen aus unserer laufenden Arbeit. Kundenkampagnen zeigen wir aus Datenschutzgruenden nicht.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold border"
            style={{ borderColor: '#4F6EF7', color: '#4F6EF7', background: 'rgba(79,110,247,0.1)' }}
          >
            {current.industry}
          </span>
        </div>

        <div
          className="relative flex items-center justify-center"
          style={{ height: "580px", perspective: "1000px" }}
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
                  transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  cursor: normOffset === 0 ? "default" : "pointer",
                  ...style,
                }}
              >
                <img
                  src={creative.url}
                  alt={creative.alt}
                  className="w-full h-auto rounded-xl shadow-2xl"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {creatives.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); resetAutoPlay(); }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-primary w-6" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativesSection;
