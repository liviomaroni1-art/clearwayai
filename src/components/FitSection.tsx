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
    <section id="who-its-for" className="py-24 md:py-32" style={{ background: 'hsl(225 16% 7%)' }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
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
            {t('nav.solutions')}
          </motion.div>
          <h2 className="font-bold text-3xl md:text-4xl lg:text-[2.75rem] text-white mb-5 leading-[1.15] tracking-tight">
            {t('fit.title')}
          </h2>
          <p className="text-base md:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: '#7E8594' }}>
            {t('fit.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {/* Good fit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{
              background: 'hsl(225 18% 8%)',
              border: '1px solid hsl(160 84% 39% / 0.12)',
            }}
          >
            {/* Subtle green glow */}
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg, hsl(160 84% 39% / 0.4), transparent)' }}
            />
            <h3 className="font-bold text-white text-base mb-7 flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'hsl(160 84% 39% / 0.08)' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: '#10B981' }} />
              </div>
              {t('fit.good.heading')}
            </h3>
            <ul className="space-y-4">
              {goodFit.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-[1.7]"
                  style={{ color: '#7E8594' }}
                >
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
            className="rounded-2xl p-7 relative overflow-hidden"
            style={{
              background: 'hsl(225 18% 8%)',
              border: '1px solid hsl(0 84% 60% / 0.08)',
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg, hsl(0 84% 60% / 0.3), transparent)' }}
            />
            <h3 className="font-bold text-white text-base mb-7 flex items-center gap-3">
              <div className="p-2 rounded-xl" style={{ background: 'hsl(0 84% 60% / 0.08)' }}>
                <XCircle className="w-4 h-4" style={{ color: '#EF4444' }} />
              </div>
              {t('fit.notgood.heading')}
            </h3>
            <ul className="space-y-4">
              {notFit.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-[1.7]"
                  style={{ color: '#7E8594' }}
                >
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
