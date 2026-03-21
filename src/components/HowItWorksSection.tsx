import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const steps = [
    { num: "01", title: t('how.step1.title'), desc: t('how.step1.desc') },
    { num: "02", title: t('how.step2.title'), desc: t('how.step2.desc') },
    { num: "03", title: t('how.step3.title'), desc: t('how.step3.desc') },
    { num: "04", title: t('how.step4.title'), desc: t('how.step4.desc') },
  ];

  return (
    <section id="how-it-works" className="section-padding border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-xl"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('how.title')}
          </h2>
          <p className="text-muted-foreground text-base">{t('how.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative"
            >
              <div className="text-4xl font-bold text-border font-display mb-4">{step.num}</div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
