import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const PricingSection = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('pricing.starter.name'),
      price: t('pricing.starter.price'),
      desc: t('pricing.starter.desc'),
      features: [
        t('pricing.starter.f1'),
        t('pricing.starter.f2'),
        t('pricing.starter.f3'),
        t('pricing.starter.f4'),
      ],
      highlighted: false,
      badge: null,
      ctaVariant: 'heroOutline' as const,
    },
    {
      name: t('pricing.growth.name'),
      price: t('pricing.growth.price'),
      desc: t('pricing.growth.desc'),
      features: [
        t('pricing.growth.f1'),
        t('pricing.growth.f2'),
        t('pricing.growth.f3'),
        t('pricing.growth.f4'),
        t('pricing.growth.f5'),
        t('pricing.growth.f6'),
      ],
      highlighted: true,
      badge: t('pricing.growth.badge'),
      ctaVariant: 'hero' as const,
    },
    {
      name: t('pricing.enterprise.name'),
      price: t('pricing.enterprise.price'),
      desc: t('pricing.enterprise.desc'),
      features: [
        t('pricing.enterprise.f1'),
        t('pricing.enterprise.f2'),
        t('pricing.enterprise.f3'),
        t('pricing.enterprise.f4'),
        t('pricing.enterprise.f5'),
      ],
      highlighted: false,
      badge: null,
      ctaVariant: 'heroOutline' as const,
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-36 border-t border-white/8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/8 rounded-full blur-[120px]" />
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
            {t('pricing.title')}
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-xl p-7 flex flex-col ${
                plan.highlighted
                  ? 'bg-blue-600/10 border border-blue-500/30 glow-blue-sm'
                  : 'glass-card'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bold text-xl text-white mb-1">{plan.name}</h3>
                <p className="text-zinc-500 text-sm">{plan.desc}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-4xl text-white">{plan.price}</span>
                  {plan.price !== t('pricing.enterprise.price') && (
                    <span className="text-zinc-500 text-sm">/mo</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-zinc-300">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'text-blue-400' : 'text-zinc-500'
                      }`}
                      strokeWidth={2.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.ctaVariant}
                size="default"
                className="w-full gap-2"
                asChild
              >
                <Link to="/contact">
                  {plan.highlighted ? t('hero.cta') : t('nav.bookACall')}
                  {plan.highlighted && <ArrowRight className="w-4 h-4" />}
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-zinc-600 mt-8"
        >
          {t('pricing.hint')}
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
