import { motion } from "framer-motion";
import { Brain, Target, Calendar, BarChart3, RefreshCw, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t('features.f1.title'),
      desc: t('features.f1.desc'),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      icon: Target,
      title: t('features.f2.title'),
      desc: t('features.f2.desc'),
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
    {
      icon: Calendar,
      title: t('features.f3.title'),
      desc: t('features.f3.desc'),
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      icon: BarChart3,
      title: t('features.f4.title'),
      desc: t('features.f4.desc'),
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
    {
      icon: RefreshCw,
      title: t('features.f5.title'),
      desc: t('features.f5.desc'),
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/20',
    },
    {
      icon: MessageSquare,
      title: t('features.f6.title'),
      desc: t('features.f6.desc'),
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/20',
    },
  ];

  return (
    <section id="features" className="py-24 md:py-36 border-t border-white/8 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-violet-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight">
            {t('features.title')}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-card rounded-xl p-6 hover:border-white/14 transition-all duration-300 group"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.bg} border ${feature.border} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
