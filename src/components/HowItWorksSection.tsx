import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const steps = [
    { num: "01", title: t('how.step1.title'), desc: t('how.step1.desc') },
    { num: "02", title: t('how.step2.title'), desc: t('how.step2.desc') },
    { num: "03", title: t('how.step3.title'), desc: t('how.step3.desc') },
    { num: "04", title: t('how.step4.title'), desc: t('how.step4.desc') },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-36 border-t border-[#1E1E2E] relative overflow-hidden" style={{ background: '#0F0F1A' }}>
      <div className="absolute inset-0 pointer-events-none bg-dots opacity-20" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-xl"
        >
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight">
            {t('how.title')}
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: '#8B8BA3' }}>
            {t('how.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl p-6 relative overflow-hidden group transition-all duration-300"
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
              <div className="mb-5">
                <div
                  className="text-6xl font-bold leading-none select-none"
                  style={{
                    background: 'linear-gradient(135deg, #4F6EF7 0%, #7C3AED 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {step.num}
                </div>
              </div>

              <h3 className="font-bold text-white text-base mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8B8BA3' }}>
                {step.desc}
              </p>

              <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'rgba(79, 110, 247, 0.08)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
