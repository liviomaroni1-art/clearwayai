import { motion } from "framer-motion";
import { ShieldCheck, PhoneForwarded, MessageSquare, Bell, FileText, Users, Phone } from "lucide-react";

const ReliabilitySection = () => {
  const demoNumber = "+41 76 471 56 78";
  
  const features = [
    {
      icon: PhoneForwarded,
      title: "Smart routing & warm transfers",
      description: "Calls go to the right person with full context—no cold handoffs."
    },
    {
      icon: MessageSquare,
      title: "After-hours capture",
      description: "Voicemail + SMS follow-up so no lead slips through overnight."
    },
    {
      icon: Bell,
      title: "Reminders that reduce no-shows",
      description: "Automated SMS and email confirmations keep your schedule full."
    },
    {
      icon: FileText,
      title: "Complete audit trail",
      description: "Summaries, transcripts, and tags for every conversation."
    },
    {
      icon: Users,
      title: "Human review when needed",
      description: "Edge cases get flagged for your team to handle personally."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/10 border border-warning/20 rounded-full text-sm mb-6">
            <ShieldCheck className="w-4 h-4 text-warning" />
            <span className="text-warning font-medium">Built-in guardrails</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            When Uncertain, <span className="gradient-text">It Escalates</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your AI never guesses. Smart routing, warm transfers, and automatic fallbacks keep you in control.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-xl hover:border-warning/20 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demoted phone CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            Want to hear it in action?{" "}
            <a
              href={`tel:${demoNumber.replace(/\s/g, '')}`}
              className="text-primary hover:underline font-medium"
            >
              Call the optional live demo: {demoNumber}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ReliabilitySection;
