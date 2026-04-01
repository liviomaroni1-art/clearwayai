import { motion } from "framer-motion";
import { Rocket, UserCheck, BarChart3, Eye } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const BenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    { icon: Rocket, title: t('benefits.b1.title'), desc: t('benefits.b1.desc'), accent: '#4B7BF5' },
    { icon: UserCheck, title: t('benefits.b2.title'), desc: t('benefits.b2.desc'), accent: '#7C3AED' },
    { icon: BarChart3, title: t('benefits.b3.title'), desc: t('benefits.b3.desc'), accent: '#4B7BF5' },
    { icon: Eye, title: t('benefits.b4.title'), desc: t('benefits.b4.desc'), accent: '#7C3AED' },
  ];

  return (
    <section id="outcomes" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-section pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Left: header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28"
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
              {t('nav.results') || 'Benefits'}
            </motion.div>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-white mb-5 leading-[1.15] tracking-tight">
              {t('benefits.title')}
            </h2>
            <p className="text-base md:text-lg leading-[1.7]" style={{ color: '#7E8594' }}>
              {t('benefits.subtitle')}
            </p>
          </motion.div>

          {/* Right: cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-2xl p-7 transition-all duration-500 relative overflow-hidden"
                style={{
                  background: 'hsl(225 18% 8%)',
                  border: '1px solid hsl(225 14% 14%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${benefit.accent}33`;
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${benefit.accent}0D, 0 8px 32px -4px ${benefit.accent}15`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(225 14% 14%)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `${benefit.accent}0A` }}
                />
                <div className="relative z-10">
                  <div
                    className="inline-flex p-3 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-500"
                    style={{ background: `${benefit.accent}0D` }}
                  >
                    <benefit.icon className="w-5 h-5" style={{ color: benefit.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-white text-base mb-3 leading-snug tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-[1.7]" style={{ color: '#7E8594' }}>
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
