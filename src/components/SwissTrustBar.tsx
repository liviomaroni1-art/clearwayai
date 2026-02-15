import { motion } from "framer-motion";
import { MapPin, Shield, Phone, Globe } from "lucide-react";

const SwissTrustBar = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap items-center justify-center gap-3 md:gap-4 py-4"
    >
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-full text-xs md:text-sm">
        <MapPin className="w-4 h-4 text-red-500" />
        <span className="text-muted-foreground">🇨🇭 Based in Freienbach, Switzerland</span>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-full text-xs md:text-sm">
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-muted-foreground">30+ Languages</span>
      </div>
      
      <a 
        href={`tel:${demoNumber.replace(/\s/g, '')}`}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs md:text-sm hover:bg-emerald-500/30 transition-colors"
      >
        <Phone className="w-4 h-4 text-emerald-400" />
        <span className="text-emerald-400 font-medium">Live Demo: {demoNumber}</span>
      </a>
    </motion.div>
  );
};

export default SwissTrustBar;
