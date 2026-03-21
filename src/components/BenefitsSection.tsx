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
    <section id="outcomes" className="py-24 md:py-36 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-xl"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            {t('benefits.title')}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">{t('benefits.subtitle')}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-7 rounded-xl hover:border-white/15 transition-all duration-300"
            >
              <b.icon className="w-7 h-7 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-bold text-white mb-3 text-lg">{b.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
