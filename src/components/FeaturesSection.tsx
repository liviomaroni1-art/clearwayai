import { motion } from "framer-motion";
import { Brain, Target, Calendar, BarChart3, RefreshCw, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Brain, title: t('features.f1.title'), desc: t('features.f1.desc') },
    { icon: Target, title: t('features.f2.title'), desc: t('features.f2.desc') },
    { icon: Calendar, title: t('features.f3.title'), desc: t('features.f3.desc') },
    { icon: BarChart3, title: t('features.f4.title'), desc: t('features.f4.desc') },
    { icon: RefreshCw, title: t('features.f5.title'), desc: t('features.f5.desc') },
    { icon: MessageSquare, title: t('features.f6.title'), desc: t('features.f6.desc') },
  ];

  return (
    <section id="features" className="py-24 md:py-36 border-t border-[#1E1E2E] relative overflow-hidden" style={{ background: '#0F0F1A' }}>
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full blur-[120px]" style={{ background: 'rgba(124, 58, 237, 0.06)' }} />
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
          <p className="text-base md:text-lg leading-relaxed" style={{ color: '#8B8BA3' }}>
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
              className="rounded-2xl p-6 transition-all duration-300 group"
              style={{
                background: '#13131F',
                border: '1px solid #1E1E2E',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4F6EF7';
                e.currentTarget.style.boxShadow = '0 0 24px -4px rgba(79, 110, 247, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1E1E2E';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="inline-flex p-3 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: '#1A1A2E' }}
              >
                <feature.icon className="w-5 h-5" style={{ color: '#4F6EF7' }} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8B8BA3' }}>
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
