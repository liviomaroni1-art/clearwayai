import React, { useState, useRef, useCallback } from "react";

interface Creative {
  url: string;
  alt: string;
  industry: string;
}

const creatives: Creative[] = [
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/9110f47d-d168-4e42-8fda-082196413433/838b53e1-7281-4526-9cfa-ec39e5d4044e/v1-1774210293766.png",
    alt: "Mehr Umsatz, weniger Aufwand",
    industry: "Steuerberatung",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/9110f47d-d168-4e42-8fda-082196413433/c08e9f0b-3796-4cfa-83a3-f7f5cdf655de/v1-1774210285926.png",
    alt: "Automatisch zu neuen Kunden",
    industry: "Coaching",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/7df9703a-cfe1-4675-9ba2-aafd934502ad/v1-1774186027653.png",
    alt: "Meta Ads auf Autopilot",
    industry: "Handwerk",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/9110f47d-d168-4e42-8fda-082196413433/adf8ac7a-dd28-496f-8964-4aa8d7674dc6/v1-1774210283040.png",
    alt: "Mehr Umsatz weniger Aufwand Kampagne",
    industry: "Agenturen",
  },
  {
    url: "https://www.vibiz.ai/media/org_3BIjs02VoMt4mvY0wjBCIq8fnv1/cd143fc0-da99-4e75-a84e-4be49410a553/eb9cb143-ae7b-4668-8811-9954ac477641/v1-1774185951726.png",
    alt: "Leads kommen von allein",
    industry: "Immobilien",
  },
];

const CreativesSection = () => {
  const [active, setActive] = useState(0);
  const n = creatives.length;
  const prev = () => setActive((active - 1 + n) % n);
  const next = () => setActive((active + 1) % n);

  // Touch swipe handling – one slide per swipe regardless of distance
  const touchStartX = useRef<number | null>(null);
  const swiped = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    swiped.current = false;
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null || swiped.current) return;
      const diff = e.touches[0].clientX - touchStartX.current;
      const threshold = 30; // minimal px to register a swipe
      if (Math.abs(diff) > threshold) {
        swiped.current = true;
        if (diff < 0) {
          next();
        } else {
          prev();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [active],
  );

  const onTouchEnd = useCallback(() => {
    touchStartX.current = null;
    swiped.current = false;
  }, []);

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

        {/* Active creative context bar */}
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
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {creatives.map((creative, i) => {
            const offset = ((i - active + n) % n + n) % n;
            const normOffset = offset > n / 2 ? offset - n : offset;
            const style = getStyle(normOffset);
            return (
              <div
                key={i}
                onClick={() => setActive(i)}
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

          <button
            onClick={prev}
            aria-label="Previous"
            style={{ position: "absolute", left: "calc(50% - 260px)", zIndex: 20 }}
            className="hidden md:flex w-12 h-12 rounded-full bg-white/10 hover:bg-primary/70 border border-white/20 text-white items-center justify-center text-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          >
            &#8592;
          </button>
          <button
            onClick={next}
            aria-label="Next"
            style={{ position: "absolute", right: "calc(50% - 260px)", zIndex: 20 }}
            className="hidden md:flex w-12 h-12 rounded-full bg-white/10 hover:bg-primary/70 border border-white/20 text-white items-center justify-center text-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm"
          >
            &#8594;
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {creatives.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-primary w-6" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreativesSection;
