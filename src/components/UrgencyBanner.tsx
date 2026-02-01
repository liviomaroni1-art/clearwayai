import { motion } from "framer-motion";
import { Clock, TrendingUp, Zap, Phone, Globe, Shield } from "lucide-react";

const UrgencyBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-y border-primary/30 mt-[112px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 py-3 text-sm">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-amber-400 font-medium"
          >
            <Zap className="w-4 h-4" />
            <span>⚡ Live ~72h after onboarding</span>
          </motion.div>
          
          <span className="hidden md:block text-muted-foreground">•</span>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 text-emerald-400 font-medium"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Up to $54K+/year in potential savings</span>
          </motion.div>
          
          <span className="hidden md:block text-muted-foreground">•</span>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-primary font-medium"
          >
            <Globe className="w-4 h-4" />
            <span>30+ languages</span>
          </motion.div>
          
          <span className="hidden lg:block text-muted-foreground">•</span>
          
          <motion.a 
            href="tel:+18887783091"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="hidden lg:flex items-center gap-2 bg-primary/20 text-primary font-semibold hover:bg-primary/30 transition-colors px-4 py-1.5 rounded-full"
          >
            <Phone className="w-4 h-4" />
            <span>Try Live Demo: +1 (888) 778-3091</span>
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default UrgencyBanner;
