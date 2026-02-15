import { motion } from "framer-motion";


const SocialProofSection = () => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-6">
        {/* Trust bar - compact, enterprise feel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-6"
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-full text-xs md:text-sm">
            <span className="text-base">🇨🇭</span>
            <span className="text-muted-foreground">Built in Switzerland</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-full text-xs md:text-sm">
            <span className="text-base">🇺🇸</span>
            <span className="text-muted-foreground">Designed for US service businesses</span>
          </div>
        </motion.div>

        {/* Tech stack bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <p className="text-xs text-muted-foreground/60 mb-3">Powered by</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Retell.ai", "Twilio", "Google Calendar", "HubSpot", "Salesforce", "n8n"].map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1.5 bg-muted/20 border border-border/30 rounded-full text-xs text-muted-foreground/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
