import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const FAQSection = () => {
  const { t } = useLanguage();
  // Start with first 3 open so users immediately see value
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set([0, 1, 2]));

  const toggle = (i: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
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
    <section id="faq" className="py-16 md:py-24 border-t border-[#1E1E2E] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full blur-[120px]"
          style={{ background: 'rgba(124, 58, 237, 0.05)' }}
        />
      </div>
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
            <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              {t('faq.title')}
            </h2>
            <p className="text-sm mt-4 leading-relaxed max-w-xs" style={{ color: '#8B8BA3' }}>
              {t('cta.note')}
            </p>
            {/* Quick-answer count badge */}
            <div
              className="inline-flex items-center gap-2 mt-6 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{ borderColor: '#4F6EF7', color: '#4F6EF7', background: 'rgba(79,110,247,0.08)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4F6EF7' }} />
              {faqs.length} häufige Fragen beantwortet
            </div>
          </motion.div>

          {/* Right: accordion — first 3 open by default */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="last:border-b"
                style={{ borderTop: '1px solid #1E1E2E', borderBottomColor: '#1E1E2E' }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                >
                  <span className="font-semibold text-sm md:text-base text-zinc-200 group-hover:text-white transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className="mt-0.5 flex-shrink-0 transition-colors"
                    style={{ color: openIndices.has(i) ? '#4F6EF7' : '#8B8BA3' }}
                  >
                    {openIndices.has(i) ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" style={{ color: '#4F6EF7' }} />
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndices.has(i) ? "max-h-96 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed pr-10" style={{ color: '#8B8BA3' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
