import { motion } from "framer-motion";
import { Megaphone, Filter, Bot, LineChart } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const icons = [Megaphone, Filter, Bot, LineChart];
  const accents = ['#4B7BF5', '#7C3AED', '#4B7BF5', '#7C3AED'];

  const steps = [
    { num: "01", title: t('how.step1.title'), desc: t('how.step1.desc') },
    { num: "02", title: t('how.step2.title'), desc: t('how.step2.desc') },
    { num: "03", title: t('how.step3.title'), desc: t('how.step3.desc') },
    { num: "04", title: t('how.step4.title'), desc: t('how.step4.desc') },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'hsl(225 16% 7%)' }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              border: '1px solid hsl(262 83% 58% / 0.2)',
              color: '#7C3AED',
              background: 'hsl(262 83% 58% / 0.06)',
            }}
          >
            {t('how.title')}
          </motion.div>
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-white mb-5 leading-[1.15] tracking-tight">
            {t('how.subtitle')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px" style={{ background: 'linear-gradient(90deg, hsl(224 76% 58% / 0.2), hsl(262 83% 58% / 0.2))' }} />

          {steps.map((step, i) => {
            const Icon = icons[i];
            const accent = accents[i];
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl p-7 relative overflow-hidden transition-all duration-500"
                style={{
                  background: 'hsl(225 18% 8%)',
                  border: '1px solid hsl(225 14% 14%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${accent}33`;
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}0D, 0 8px 32px -4px ${accent}15`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'hsl(225 14% 14%)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Step number + icon */}
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `${accent}0D` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} strokeWidth={1.5} />
                  </div>
                  <span
                    className="text-4xl font-bold select-none"
                    style={{
                      background: `linear-gradient(135deg, ${accent}40, ${accent}15)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <h3 className="relative z-10 font-bold text-white text-base mb-3 leading-snug tracking-tight">
                  {step.title}
                </h3>
                <p className="relative z-10 text-sm leading-[1.7]" style={{ color: '#7E8594' }}>
                  {step.desc}
                </p>

                {/* Hover glow */}
                <div
                  className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `${accent}08` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
