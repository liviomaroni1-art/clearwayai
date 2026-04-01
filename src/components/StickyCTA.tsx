import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-0 right-0 z-40 flex justify-center md:hidden px-4"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-xl blur-xl scale-110 pointer-events-none"
              style={{ background: 'hsl(224 76% 58% / 0.25)' }}
            />
            <Button
              variant="hero"
              size="lg"
              className="relative px-7 gap-2 text-sm"
              style={{ boxShadow: '0 8px 32px -4px rgba(0,0,0,0.5), 0 0 20px -4px hsl(224 76% 58% / 0.3)' }}
              asChild
            >
              <Link to="https://funnel.clearwayai.co/">
                {t('hero.cta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
