import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Scale, Users, Briefcase, GraduationCap, Home, Monitor } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const TrustedBySection = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const industries = [
    { name: t('trusted.industry1'), icon: Building2 },
    { name: t('trusted.industry2'), icon: Briefcase },
    { name: t('trusted.industry3'), icon: Scale },
    { name: t('trusted.industry4'), icon: Users },
    { name: t('trusted.industry5'), icon: GraduationCap },
    { name: t('trusted.industry6'), icon: Home },
    { name: t('trusted.industry7'), icon: Monitor },
  ];

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(225 14% 14%), transparent)' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <h2 className="font-bold text-2xl md:text-3xl text-white mb-4 leading-tight tracking-tight">
            {t('trusted.title')}
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#7E8594' }}>
            {t('trusted.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {industries.map((industry, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(isActive ? null : i)}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, hsl(224 76% 58% / 0.15), hsl(262 83% 58% / 0.1))'
                    : 'hsl(225 18% 8%)',
                  border: `1px solid ${isActive ? 'hsl(224 76% 58% / 0.3)' : 'hsl(225 14% 14%)'}`,
                  color: isActive ? '#FFFFFF' : '#7E8594',
                  boxShadow: isActive ? '0 0 24px -8px hsl(224 76% 58% / 0.2)' : 'none',
                }}
              >
                <industry.icon className="w-4 h-4" strokeWidth={1.5} style={{ color: isActive ? '#4B7BF5' : '#7E8594' }} />
                {industry.name}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
