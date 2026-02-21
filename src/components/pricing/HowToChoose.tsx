import React from "react";
import { motion } from "framer-motion";

const HowToChoose: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto text-center mb-12"
    >
      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">How to Choose</h3>
      <div className="text-left bg-card/50 border border-border rounded-2xl px-6 py-5 space-y-2 md:space-y-3 text-sm md:text-base text-muted-foreground">
        <p>
          → <strong className="text-foreground">Solo Launch</strong> if you're a solo provider or small business that needs reliable 24/7 call coverage.
        </p>
        <p>
          → <strong className="text-foreground">Pro Practice</strong> if you need CRM sync, automated reminders, or consistent lead tracking.
        </p>
        <p>
          → <strong className="text-foreground">Team Pro</strong> if you have multiple staff and need intelligent routing + shared calendars.
        </p>
        <p>
          → <strong className="text-foreground">Concierge AI</strong> if you're multi-location, need compliance support, or require custom integrations.
        </p>
      </div>
    </motion.div>
  );
};

export default HowToChoose;
