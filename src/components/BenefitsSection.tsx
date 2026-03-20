import { motion } from "framer-motion";
import { CheckCircle, Clock, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: TrendingUp, title: t('benefits.b1.title'), desc: t('benefits.b1.desc') },
    { icon: Users, title: t('benefits.b2.title'), desc: t('benefits.b2.desc') },
    { icon: Clock, title: t('benefits.b3.title'), desc: t('benefits.b3.desc') },
    { icon: CheckCircle, title: t('benefits.b4.title'), desc: t('benefits.b4.desc') },
  ];

  return (
    <section id="outcomes" className="section-padding border-t border-border bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-xl"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('benefits.title')}
          </h2>
          <p className="text-muted-foreground text-sm">{t('benefits.subtitle')}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <benefit.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
