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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 md:gap-3 bg-muted/80 backdrop-blur-sm border border-border/50 text-foreground px-3 py-2.5 md:px-4 md:py-3 rounded-full shadow-lg hover:border-primary/50 hover:scale-105 transition-all"
      >
        <Phone className="w-4 h-4 text-primary" />
        <div className="text-left hidden sm:block">
          <div className="text-[10px] text-muted-foreground">Optional live demo</div>
          <div className="text-xs font-medium">{demoNumber}</div>
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
