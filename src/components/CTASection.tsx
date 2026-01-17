import { motion } from "framer-motion";
import { ArrowRight, Phone, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const demoNumber = "+41 44 000 00 00"; // Replace with actual demo number
  
  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-card rounded-3xl p-10 md:p-16 overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/30 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Main CTA */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm mb-6"
                >
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">In 48 Stunden live</span>
                </motion.div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Bereit Ihre Praxis zu
                  <br />
                  <span className="gradient-text">automatisieren?</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-lg mb-8">
                  Kostenlose 30-Minuten Demo. Wir analysieren Ihre Workflows und zeigen Ihnen 
                  genau, wie viel Sie mit KI sparen können.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button variant="hero" size="xl" className="min-h-[56px]" asChild>
                    <Link to="/contact">
                      Kostenlose Demo buchen
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
                
                {/* Trust points */}
                <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                  {["Keine Kreditkarte", "Keine Verpflichtung", "Sofort-Ergebnis"].map((point) => (
                    <div key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Call Demo */}
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-xl"
                />
                <div className="relative glass-card border border-emerald-500/30 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="w-10 h-10 text-emerald-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Live Demo anrufen
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Hören Sie unsere KI-Rezeptionistin jetzt live — 24/7 verfügbar
                  </p>
                  
                  <a
                    href={`tel:${demoNumber.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-xl transition-all hover:scale-105 shadow-lg hover:shadow-emerald-500/30 w-full justify-center"
                  >
                    <Phone className="w-6 h-6" />
                    {demoNumber}
                  </a>
                  
                  <p className="text-xs text-muted-foreground mt-4">
                    Sie erleben: Begrüssung → Terminbuchung → CRM-Sync → SMS-Bestätigung
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

export default CTASection;
