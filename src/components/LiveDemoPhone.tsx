import React from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

interface LiveDemoPhoneProps {
  variant?: "hero" | "floating" | "compact";
}

const LiveDemoPhone = React.forwardRef<HTMLDivElement, LiveDemoPhoneProps>(({ variant = "hero" }, ref) => {
  const demoNumber = "+1 (888) 560-2165";
  
  if (variant === "floating") {
    return (
      <motion.a
        href={`tel:${demoNumber.replace(/\s/g, '')}`}
        aria-label={`Call AI demo at ${demoNumber}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3.5 md:px-6 md:py-4 rounded-full shadow-2xl hover:scale-105 transition-all ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
      >
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-pulse">
          <Phone className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="text-left">
          <div className="text-xs md:text-sm font-medium">Try the AI live</div>
          <div className="text-sm md:text-base font-bold">{demoNumber}</div>
        </div>
      </motion.a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={`tel:${demoNumber.replace(/\s/g, '')}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Phone className="w-4 h-4" />
        <span>{demoNumber}</span>
      </a>
    );
  }

  // Hero variant - simplified
  return (
    <div className="mt-6 text-center">
      <a
        href={`tel:${demoNumber.replace(/\s/g, '')}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <Phone className="w-4 h-4" />
        Optional live demo: {demoNumber}
      </a>
    </div>
  );
});

LiveDemoPhone.displayName = "LiveDemoPhone";

export default LiveDemoPhone;
