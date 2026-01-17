import { motion } from "framer-motion";
import { MapPin, Linkedin, Shield, Award } from "lucide-react";

const FounderSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Photo placeholder */}
              <div className="md:col-span-1 flex flex-col items-center gap-4">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/50">G</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-2xl">🇨🇭</span>
                  <span className="text-muted-foreground">Swiss Quality</span>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Gründer aus <span className="gradient-text">Freienbach, Schweiz</span>
                </h2>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Nach Jahren in der KI-Automatisierung habe ich gesehen, wie viele Schweizer 
                  Praxen und Kanzleien Kunden verlieren, nur weil niemand ans Telefon geht. 
                  Clearway AI wurde gegründet, um dieses Problem zu lösen—mit Schweizer Präzision 
                  und modernster KI-Technologie.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Freienbach SZ, Schweiz</span>
                  </div>
                  <a 
                    href="https://linkedin.com/in/founder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Auf LinkedIn vernetzen</span>
                  </a>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">DSGVO/GDPR Konform</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs">
                    <Award className="w-3 h-3 text-primary" />
                    <span className="text-primary">Swiss Made</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-sm italic text-muted-foreground">
                    "Meine Mission: Schweizer Unternehmen sollen nie wieder eine Chance verpassen."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
