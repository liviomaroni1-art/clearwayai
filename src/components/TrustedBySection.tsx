import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const TrustedBySection = () => {
  const { t } = useLanguage();

  const stats = [t('trusted.stat1'), t('trusted.stat2'), t('trusted.stat3'), t('trusted.stat4')];
  const industries = [
    t('trusted.industry1'), t('trusted.industry2'), t('trusted.industry3'),
    t('trusted.industry4'), t('trusted.industry5'), t('trusted.industry6'), t('trusted.industry7'),
  ];

  return (
    <section className="py-20 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-3xl mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">{t('trusted.title')}</h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">{t('trusted.subtitle')}</p>
          <a href="#outcomes" className="inline-block mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors">{t('trusted.link')} →</a>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-10 pb-10 border-b border-white/5"
        >
          {stats.map((stat, i) => (
            <span key={i} className="text-sm text-zinc-300 font-semibold">{stat}</span>
          ))}
        </motion.div>

        {/* Industry tags */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-x-10 gap-y-5"
        >
          {industries.map((industry, i) => (
            <span key={i} className="text-xl md:text-2xl font-bold text-zinc-600 tracking-tight">{industry}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
