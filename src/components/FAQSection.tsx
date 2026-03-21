import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
  ];

  return (
    <section id="faq" className="py-24 md:py-36 border-t border-white/8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-violet-600/5 rounded-full blur-[100px]" />
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
            <p className="text-zinc-500 text-sm mt-4 leading-relaxed max-w-xs">
              {t('cta.note')}
            </p>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-white/8 last:border-b last:border-white/8">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-semibold text-sm md:text-base text-zinc-200 group-hover:text-white transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <span className="mt-0.5 flex-shrink-0 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    {openIndex === i ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === i ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-zinc-500 text-sm leading-relaxed pr-10">
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
