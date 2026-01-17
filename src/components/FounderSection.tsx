import { motion } from "framer-motion";
import { MapPin, Linkedin } from "lucide-react";

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
              <div className="md:col-span-1 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/50">F</span>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Built by Someone Who <span className="gradient-text">Gets It</span>
                </h2>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  After years in AI automation, I saw too many service businesses 
                  lose customers simply because no one picked up the phone. Clearway AI 
                  exists to solve that—giving every business the power of a 24/7 receptionist 
                  without the overhead.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Zurich, Switzerland</span>
                  </div>
                  <a 
                    href="https://linkedin.com/in/founder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm italic text-muted-foreground">
                    "My mission: Help service businesses never miss an opportunity again."
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
