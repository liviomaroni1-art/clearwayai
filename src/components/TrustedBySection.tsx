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
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-8"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('trusted.title')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {t('trusted.subtitle')}
          </p>
          <a href="#outcomes" className="inline-block mt-3 text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
            {t('trusted.link')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center gap-x-10 gap-y-6 pt-8 border-t border-border"
        >
          {industries.map((industry, i) => (
            <span
              key={i}
              className="text-lg md:text-xl font-display font-bold text-foreground/70 tracking-tight"
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
