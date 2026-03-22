import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: TrendingUp,
      title: t('benefits.b1.title'),
      desc: t('benefits.b1.desc'),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      icon: Users,
      title: t('benefits.b2.title'),
      desc: t('benefits.b2.desc'),
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
    {
      icon: Clock,
      title: t('benefits.b3.title'),
      desc: t('benefits.b3.desc'),
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      icon: CheckCircle,
      title: t('benefits.b4.title'),
      desc: t('benefits.b4.desc'),
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
  ];

  return (
    <section id="outcomes" className="py-24 md:py-36 border-t border-white/8 relative overflow-hidden">
      {/* Subtle left glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-blue-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-xl"
        >
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight">
            {t('benefits.title')}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 hover:border-white/14 transition-all duration-300 group"
            >
              <div className={`inline-flex p-3 rounded-lg ${benefit.bg} border ${benefit.border} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-white text-base mb-3 leading-snug">
                {benefit.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {benefit.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
