import { motion } from "framer-motion";

const integrations = [
  { name: "Google Calendar", category: "Scheduling" },
  { name: "Calendly", category: "Scheduling" },
  { name: "Cal.com", category: "Scheduling" },
  { name: "HubSpot", category: "CRM" },
  { name: "Salesforce", category: "CRM" },
  { name: "Pipedrive", category: "CRM" },
  { name: "Twilio", category: "Telephony" },
  { name: "Retell.ai", category: "Voice AI" },
  { name: "n8n", category: "Automation" },
  { name: "Zapier", category: "Automation" },
  { name: "Slack", category: "Notifications" },
  { name: "Email/SMS", category: "Notifications" },
];

const IntegrationsSection = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connects With Your <span className="gradient-text">Existing Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No rip-and-replace. Our AI plugs directly into the tools you already use.
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
                <p className="text-xs text-muted-foreground mt-1">{integration.category}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-muted-foreground mt-8"
          >
            Don't see your tool? We build custom integrations for Enterprise clients.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
