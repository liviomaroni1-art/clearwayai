import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const TrustedBySection = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const industries = [
    t('trusted.industry1'),
    t('trusted.industry2'),
    t('trusted.industry3'),
    t('trusted.industry4'),
    t('trusted.industry5'),
    t('trusted.industry6'),
    t('trusted.industry7'),
  ];

  return (
    <section className="py-20 md:py-28 border-t border-[#1E1E2E] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-dots opacity-15" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <h2 className="font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">
            {t('trusted.title')}
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#8B8BA3' }}>
            {t('trusted.subtitle')}
          </p>
        </motion.div>

        {/* Industry pill buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {industries.map((industry, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeIndex === i
                  ? 'linear-gradient(135deg, #4F6EF7 0%, #7C3AED 100%)'
                  : '#13131F',
                border: `1px solid ${activeIndex === i ? 'transparent' : '#1E1E2E'}`,
                color: activeIndex === i ? '#FFFFFF' : '#8B8BA3',
              }}
            >
              {industry}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
