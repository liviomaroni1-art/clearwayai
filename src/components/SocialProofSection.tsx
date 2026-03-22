import { motion } from "framer-motion";
import { Calendar, Users, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const SocialProofSection = () => {
  const { t } = useLanguage();

  const results = [
    {
      icon: Calendar,
      metric: t('proof.r1.metric'),
      desc: t('proof.r1.desc'),
      label: t('proof.r1.label'),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      icon: Users,
      metric: t('proof.r2.metric'),
      desc: t('proof.r2.desc'),
      label: t('proof.r2.label'),
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
    {
      icon: TrendingUp,
      metric: t('proof.r3.metric'),
      desc: t('proof.r3.desc'),
      label: t('proof.r3.label'),
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-white/8">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-10 text-center"
        >
          {t('proof.heading')}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 text-center hover:border-white/14 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-lg ${r.bg} border ${r.border} mb-5`}>
                <r.icon className={`w-5 h-5 ${r.color}`} strokeWidth={1.5} />
              </div>
              <div className="font-bold text-4xl md:text-5xl text-white mb-2 tracking-tight">
                {r.metric}
              </div>
              <p className="text-sm text-zinc-300 font-medium mb-1 leading-snug">{r.desc}</p>
              <p className="text-xs text-zinc-500 mt-2 pt-2 border-t border-white/8">{r.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
