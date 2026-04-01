import { motion } from "framer-motion";
import { Brain, Target, Calendar, BarChart3, Bell, CalendarCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Brain, title: t('features.f1.title'), desc: t('features.f1.desc'), accent: '#4B7BF5' },
    { icon: Target, title: t('features.f2.title'), desc: t('features.f2.desc'), accent: '#7C3AED' },
    { icon: Calendar, title: t('features.f3.title'), desc: t('features.f3.desc'), accent: '#4B7BF5' },
    { icon: BarChart3, title: t('features.f4.title'), desc: t('features.f4.desc'), accent: '#7C3AED' },
    { icon: Bell, title: t('features.f5.title'), desc: t('features.f5.desc'), accent: '#4B7BF5' },
    { icon: CalendarCheck, title: t('features.f6.title'), desc: t('features.f6.desc'), accent: '#7C3AED' },
  ];

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-section pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              border: '1px solid hsl(224 76% 58% / 0.15)',
              color: '#4B7BF5',
              background: 'hsl(224 76% 58% / 0.06)',
            }}
          >
            {t('nav.product')}
          </motion.div>
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-white mb-5 leading-[1.15] tracking-tight">
            {t('features.title')}
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: '#7E8594' }}>
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group relative rounded-2xl p-7 transition-all duration-500 cursor-default overflow-hidden"
              style={{
                background: 'hsl(225 18% 8%)',
                border: '1px solid hsl(225 14% 14%)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${feature.accent}33`;
                e.currentTarget.style.boxShadow = `0 0 0 1px ${feature.accent}0D, 0 8px 32px -4px ${feature.accent}15`;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'hsl(225 14% 14%)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `${feature.accent}0A` }}
              />

              <div className="relative z-10">
                <div
                  className="inline-flex p-3 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-500"
                  style={{ background: `${feature.accent}0D` }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: feature.accent }} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-white text-[1.05rem] mb-2.5 leading-snug tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm leading-[1.7]" style={{ color: '#7E8594' }}>
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
