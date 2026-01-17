import { motion } from "framer-motion";
import { MapPin, Shield, Phone } from "lucide-react";

const SwissTrustBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap items-center justify-center gap-4 md:gap-6 py-4"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm">
        <MapPin className="w-4 h-4 text-red-500" />
        <span className="text-muted-foreground">Built in Freienbach, Switzerland</span>
        <span className="text-lg">🇨🇭</span>
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm">
        <Shield className="w-4 h-4 text-emerald-500" />
        <span className="text-muted-foreground">GDPR Compliant</span>
      </div>
      
      <a 
        href="tel:+41000000000" 
        className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full text-sm hover:bg-primary/30 transition-colors"
      >
        <Phone className="w-4 h-4 text-primary" />
        <span className="text-primary font-medium">+41 Live Demo</span>
      </a>
    </motion.div>
  );
};

export default SwissTrustBar;
