import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const LongTermSavings: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-4xl mx-auto mb-12"
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 border border-primary/30 rounded-2xl p-8 md:p-10 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        
        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            Long-Term Partnership
          </h3>
          <p className="text-base md:text-lg text-muted-foreground mb-4">
            Commit to <span className="text-primary font-semibold">36 months</span> → <span className="text-primary font-semibold">20% off</span> monthly fees + <span className="text-primary font-semibold">$0 setup</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary font-medium px-4 py-2 rounded-full text-sm border border-primary/25">
              <Check className="w-4 h-4" />
              Save up to $3,000 on setup
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/15 text-primary font-medium px-4 py-2 rounded-full text-sm border border-primary/25">
              <Check className="w-4 h-4" />
              Priority onboarding
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LongTermSavings;
