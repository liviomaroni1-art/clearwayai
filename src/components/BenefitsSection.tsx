import { motion } from "framer-motion";
import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: TrendingUp, title: t('benefits.b1.title'), desc: t('benefits.b1.desc'), iconColor: '#4F6EF7' },
    { icon: Users, title: t('benefits.b2.title'), desc: t('benefits.b2.desc'), iconColor: '#7C3AED' },
    { icon: Clock, title: t('benefits.b3.title'), desc: t('benefits.b3.desc'), iconColor: '#4F6EF7' },
    { icon: CheckCircle, title: t('benefits.b4.title'), desc: t('benefits.b4.desc'), iconColor: '#7C3AED' },
  ];

  return (
    <section id="outcomes" className="py-16 md:py-20 border-t border-[#1E1E2E] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'rgba(79, 110, 247, 0.06)' }}
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-xl"
        >
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight">
            {t('benefits.title')}
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: '#8B8BA3' }}>
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
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
                <benefit.icon className="w-5 h-5" style={{ color: benefit.iconColor }} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-white text-base mb-3 leading-snug">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8B8BA3' }}>
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
