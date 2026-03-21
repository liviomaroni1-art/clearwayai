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
    <section className="py-20 md:py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5 leading-tight">
            {t('trusted.title')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
            {t('trusted.subtitle')}
          </p>
          <a href="#outcomes" className="inline-block mt-4 text-sm font-medium text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors">
            {t('trusted.link')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-10 border-t border-border"
        >
          {industries.map((industry, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl font-display font-bold text-foreground/60 tracking-tight"
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
