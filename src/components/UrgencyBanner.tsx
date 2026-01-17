import { motion } from "framer-motion";
import { Clock, TrendingUp, Zap } from "lucide-react";

const UrgencyBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-y border-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 py-3 text-sm">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-primary font-medium"
          >
            <Clock className="w-4 h-4" />
            <span>Only 3 Signature spots left Q1 2026</span>
          </motion.div>
          
          <span className="hidden md:block text-muted-foreground">•</span>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-emerald-400 font-medium"
          >
            <TrendingUp className="w-4 h-4" />
            <span>CHF 54K annual savings vs human staff</span>
          </motion.div>
          
          <span className="hidden md:block text-muted-foreground">•</span>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-amber-400 font-medium"
          >
            <Zap className="w-4 h-4" />
            <span>Live in 48 hours guaranteed</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyBanner;
