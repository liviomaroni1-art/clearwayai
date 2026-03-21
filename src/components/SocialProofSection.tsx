import { motion } from "framer-motion";
import { TrendingUp, Calendar, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const SocialProofSection = () => {
  const { t } = useLanguage();

  const results = [
    {
      icon: Calendar,
      metric: t('proof.r1.metric'),
      desc: t('proof.r1.desc'),
      label: t('proof.r1.label'),
    },
    {
      icon: Users,
      metric: t('proof.r2.metric'),
      desc: t('proof.r2.desc'),
      label: t('proof.r2.label'),
    },
    {
      icon: TrendingUp,
      metric: t('proof.r3.metric'),
      desc: t('proof.r3.desc'),
      label: t('proof.r3.label'),
    },
  ];

  return (
    <section className="py-16 md:py-24 border-t border-border bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-10 text-center"
        >
          {t('proof.heading')}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <r.icon className="w-6 h-6 text-foreground/40 mx-auto mb-4" strokeWidth={1.5} />
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {r.metric}
              </div>
              <p className="text-sm text-foreground/80 font-medium mb-1">{r.desc}</p>
              <p className="text-xs text-muted-foreground">{r.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
