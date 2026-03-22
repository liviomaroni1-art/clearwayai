import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const FitSection = () => {
  const { t } = useLanguage();

  const goodFit = [
    t('fit.good.1'),
    t('fit.good.2'),
    t('fit.good.3'),
    t('fit.good.4'),
    t('fit.good.5'),
  ];

  const notFit = [
    t('fit.bad.1'),
    t('fit.bad.2'),
    t('fit.bad.3'),
    t('fit.bad.4'),
  ];

  return (
    <section id="who-its-for" className="py-24 md:py-36 border-t border-[#1E1E2E]" style={{ background: '#0F0F1A' }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 leading-tight">
            {t('fit.title')}
          </h2>
          <p className="text-base md:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: '#8B8BA3' }}>
            {t('fit.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Good fit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-7"
            style={{
              background: '#13131F',
              border: '1px solid #1E1E2E',
            }}
          >
            <h3 className="font-bold text-white text-base mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: '#10B981' }} />
              </div>
              {t('fit.good.heading')}
            </h3>
            <ul className="space-y-4">
              {goodFit.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: '#8B8BA3' }}>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#10B981' }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not a fit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="rounded-2xl p-7"
            style={{
              background: '#13131F',
              border: '1px solid #1E1E2E',
            }}
          >
            <h3 className="font-bold text-white text-base mb-6 flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <XCircle className="w-4 h-4" style={{ color: '#EF4444' }} />
              </div>
              {t('fit.notgood.heading')}
            </h3>
            <ul className="space-y-4">
              {notFit.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: '#8B8BA3' }}>
                  <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FitSection;
