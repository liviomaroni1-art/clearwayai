import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const TrustedBySection = () => {
  const { t } = useLanguage();

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
    <section className="py-20 md:py-28 border-t border-white/8 relative overflow-hidden">
      {/* Dot pattern background */}
      <div className="absolute inset-0 pointer-events-none bg-dots opacity-15" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title + subtitle */}
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
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
            {t('trusted.subtitle')}
          </p>
          <a
            href="#outcomes"
            className="inline-block mt-4 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4 decoration-blue-400/30 hover:decoration-blue-300/60"
          >
            {t('trusted.link')}
          </a>
        </motion.div>

        {/* Industry name tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {industries.map((industry, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-full glass-card text-sm font-medium text-zinc-400 border border-white/8 hover:text-zinc-200 hover:border-white/16 transition-colors duration-200"
            >
              {industry}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
