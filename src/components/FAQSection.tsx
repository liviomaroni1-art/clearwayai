import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const FAQSection = () => {
  const { t, language } = useLanguage();
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0, 1, 2]));

  const toggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const faqs = [
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 relative overflow-hidden" style={{ background: 'hsl(225 16% 7%)' }}>
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
          {/* Left: title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                border: '1px solid hsl(224 76% 58% / 0.15)',
                color: '#4B7BF5',
                background: 'hsl(224 76% 58% / 0.06)',
              }}
            >
              FAQ
            </motion.div>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-[1.15] tracking-tight">
              {t('faq.title')}
            </h2>
            <p className="text-sm mt-4 leading-relaxed max-w-xs" style={{ color: '#7E8594' }}>
              {t('cta.note')}
            </p>
            <div
              className="inline-flex items-center gap-2 mt-6 px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{
                border: '1px solid hsl(225 14% 14%)',
                color: '#7E8594',
                background: 'hsl(225 18% 8%)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              {faqs.length} {language === 'de' ? 'häufige Fragen beantwortet' : 'common questions answered'}
            </div>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((faq, i) => {
              const isOpen = openIndices.has(i);
              return (
                <div
                  key={i}
                  className="border-b border-white/[0.06] first:border-t"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                  >
                    <span className={`font-semibold text-sm md:text-[15px] leading-snug transition-colors duration-200 ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                      {faq.q}
                    </span>
                    <span className="mt-0.5 flex-shrink-0">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{
                          background: isOpen ? 'hsl(224 76% 58% / 0.1)' : 'transparent',
                          border: `1px solid ${isOpen ? 'hsl(224 76% 58% / 0.2)' : 'hsl(225 14% 18%)'}`,
                        }}
                      >
                        {isOpen ? (
                          <Minus className="w-3.5 h-3.5 text-[#4B7BF5]" />
                        ) : (
                          <Plus className="w-3.5 h-3.5 text-[#7E8594]" />
                        )}
                      </div>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm leading-[1.8] pr-14 pb-6" style={{ color: '#7E8594' }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
