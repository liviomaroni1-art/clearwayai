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
    <section id="how-it-works" className="py-24 md:py-36 border-t border-white/8 relative overflow-hidden">
      {/* Background dot pattern */}
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
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
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
              className="glass-card rounded-xl p-6 relative overflow-hidden group hover:border-white/14 transition-all duration-300"
            >
              {/* Step number with gradient glow */}
              <div className="mb-5">
                <div
                  className="text-6xl font-bold leading-none select-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.7) 0%, rgba(139,92,246,0.5) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(37,99,235,0.25))',
                  }}
                >
                  {step.num}
                </div>
              </div>

              <h3 className="font-bold text-white text-base mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Subtle corner glow on hover */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
