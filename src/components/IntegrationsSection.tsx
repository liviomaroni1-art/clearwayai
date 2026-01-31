import { motion } from "framer-motion";

const integrations = [
  { name: "Google Calendar", category: "Scheduling", native: true },
  { name: "Outlook", category: "Scheduling", native: true },
  { name: "Calendly", category: "Scheduling", native: false },
  { name: "Cal.com", category: "Scheduling", native: false },
  { name: "HubSpot", category: "CRM", native: true },
  { name: "Salesforce", category: "CRM", native: true },
  { name: "Pipedrive", category: "CRM", native: true },
  { name: "SimplePractice", category: "CRM", native: true },
  { name: "Twilio", category: "Telephony", native: true },
  { name: "Retell.ai", category: "Voice AI", native: true },
  { name: "Zapier", category: "Automation", native: false },
  { name: "n8n", category: "Automation", native: false },
];

const IntegrationsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Connects With Your <span className="gradient-text">Existing Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Native + via Zapier/n8n. We set it up for you.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-4 rounded-xl text-center hover:border-primary/50 transition-colors"
              >
                <p className="font-medium text-foreground">{integration.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {integration.category}
                  {integration.native && (
                    <span className="text-primary ml-1">• Native</span>
                  )}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-8"
          >
            If it's not listed, we can integrate via API. Enterprise plans include custom integrations.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
