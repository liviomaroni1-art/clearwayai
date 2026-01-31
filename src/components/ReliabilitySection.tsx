import { motion } from "framer-motion";
import { ShieldCheck, PhoneForwarded, MessageSquare, Bell, FileText, Users, Phone } from "lucide-react";

const ReliabilitySection = () => {
  const demoNumber = "+1 (888) 778-3091";
  
  const features = [
    {
      icon: PhoneForwarded,
      title: "Department routing + warm transfer",
      description: "AI routes calls to the right person or department, with context passed along."
    },
    {
      icon: MessageSquare,
      title: "After-hours capture",
      description: "Voicemail + SMS follow-up ensures no lead slips through overnight."
    },
    {
      icon: Bell,
      title: "Appointment confirmations & reminders",
      description: "Automated SMS and email reminders reduce no-shows."
    },
    {
      icon: FileText,
      title: "Audit trail",
      description: "Call summaries, transcripts, and tags for every conversation."
    },
    {
      icon: Users,
      title: "Optional human review",
      description: "Flag edge cases for your team to review and handle personally."
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-sm mb-6">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-medium">Built-in guardrails</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            When the AI Isn't 100% Sure, <span className="gradient-text">It Escalates</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Guardrails, routing rules, and fallbacks—so your team stays in control.
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
              className="glass-card p-6 rounded-xl hover:border-amber-500/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call the Live Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">Experience it yourself—call the live demo:</p>
          <a
            href={`tel:${demoNumber.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02]"
          >
            <Phone className="w-5 h-5" />
            {demoNumber}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ReliabilitySection;
