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
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  return (
    <section id="faq" className="py-24 md:py-36 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {t('faq.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {faqs.map((faq, i) => (
              <div key={i} className="border-t border-foreground/10 last:border-b">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-7 text-left group"
                >
                  <span className="font-display font-bold text-base md:text-lg text-foreground group-hover:text-muted-foreground transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <span className="mt-0.5 flex-shrink-0 text-foreground/60">
                    {openIndex === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === i ? "max-h-96 pb-7" : "max-h-0"
                  }`}
                >
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed pr-12">
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
