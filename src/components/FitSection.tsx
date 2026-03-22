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
    <section id="who-its-for" className="py-24 md:py-36 border-t border-white/8">
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
          <p className="text-zinc-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
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
            className="glass-card rounded-xl p-7 border border-emerald-500/15"
          >
            <h3 className="font-bold text-white text-base mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              {t('fit.good.heading')}
            </h3>
            <ul className="space-y-4">
              {goodFit.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500/60 flex-shrink-0 mt-0.5" />
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
            className="glass-card rounded-xl p-7 border border-red-500/10"
          >
            <h3 className="font-bold text-white text-base mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <XCircle className="w-4 h-4 text-red-400" />
              </div>
              {t('fit.notgood.heading')}
            </h3>
            <ul className="space-y-4">
              {notFit.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                  <XCircle className="w-4 h-4 text-red-500/40 flex-shrink-0 mt-0.5" />
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
