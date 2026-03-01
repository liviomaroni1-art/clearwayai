import { useState } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Scheduling",
    integrations: [
      { name: "Google Calendar", native: true },
      { name: "Outlook", native: true },
      { name: "Calendly", native: false },
      { name: "Cal.com", native: false },
    ],
  },
  {
    name: "CRM & Field Service",
    integrations: [
      { name: "HubSpot", native: true },
      { name: "Salesforce", native: true },
      { name: "ServiceTitan", native: false },
      { name: "Housecall Pro", native: false },
      { name: "Jobber", native: false },
      { name: "Pipedrive", native: true },
    ],
  },
  {
    name: "Telephony & AI",
    integrations: [
      { name: "Twilio", native: true },
      { name: "Retell.ai", native: true },
    ],
  },
  {
    name: "Automation",
    integrations: [
      { name: "Zapier", native: false },
      { name: "n8n", native: false },
    ],
  },
];

const IntegrationsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Works With Your <span className="gradient-text">Existing Tools</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            We install and configure everything for you — you don't need to be technical.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {categories[activeTab].integrations.map((integration) => (
              <div
                key={integration.name}
                className="glass-card p-4 rounded-xl text-center hover:border-primary/30 transition-colors"
              >
                <p className="font-medium text-sm text-foreground">{integration.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {integration.native ? (
                    <span className="text-primary">Native</span>
                  ) : (
                    "via Zapier/n8n"
                  )}
                </p>
              </div>
            ))}
          </motion.div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Don't see yours? API + custom integrations available on Enterprise plans.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
