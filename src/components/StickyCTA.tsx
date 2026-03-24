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
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 left-0 right-0 z-40 flex justify-center md:hidden px-4"
        >
          {/* Subtle glow behind the button */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl scale-110 pointer-events-none" />
            <Button
              variant="hero"
              size="lg"
              className="relative shadow-2xl px-7 gap-2 text-sm"
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
