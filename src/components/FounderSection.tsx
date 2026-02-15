import { motion } from "framer-motion";
import { MapPin, Mail, Clock } from "lucide-react";

const FounderSection = () => {
  return (
    <section id="about" className="section-calm bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="elevated-card p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Photo placeholder */}
              <div className="md:col-span-1 flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/50">G</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-xl">🇨🇭</span>
                  <span className="text-gray-400">🇨🇭 Swiss Engineering</span>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-100">
                  Built in Switzerland, <span className="gradient-text">for US teams</span>
                </h2>
                
                {/* Founder quote */}
                <blockquote className="text-lg text-gray-400 mb-6 leading-relaxed border-l-4 border-primary/40 pl-4 italic">
                  "We built Clearway AI to help teams focus on what matters—not the noise. 
                  After years in automation, I saw too many practices lose clients simply 
                  because no one could answer the phone. That ends now."
                </blockquote>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>🇨🇭 Freienbach, Switzerland</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>US timezone support: 6am–10pm EST</span>
                  </div>
                  <a 
                    href="mailto:hello@clearwayai.co"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact</span>
                  </a>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-500">
                    Precision engineering meets American service standards. Your AI receptionist 
                    never takes a day off—and neither does our support.
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