import { motion } from "framer-motion";
import { PhoneCall, TrendingUp, Clock, UserCheck } from "lucide-react";

const outcomes = [
  {
    icon: PhoneCall,
    title: "More Qualified Calls",
    description: "Your calendar fills up with leads who've already been asked the right questions — budget, timeline, and fit — before they ever talk to your team.",
  },
  {
    icon: TrendingUp,
    title: "Higher Show-Up Rates",
    description: "Automated reminders and pre-call nurture sequences can help reduce no-shows and keep leads engaged until the meeting happens.",
  },
  {
    icon: Clock,
    title: "Less Manual Follow-Up",
    description: "No more chasing cold leads by hand. The AI agent handles every touchpoint — from first reply to final booking — without your team lifting a finger.",
  },
  {
    icon: UserCheck,
    title: "Better Lead-to-Close Ratio",
    description: "When your sales team only speaks with pre-qualified prospects, close rates tend to improve and sales cycles get shorter.",
  },
];

const OutcomesSection = () => {
  return (
    <section id="outcomes" className="section-padding bg-card/30 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What You Can Expect
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Results depend on your offer, market, and volume — but here's what our AI agents are designed to deliver.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="minimal-card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <outcome.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{outcome.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{outcome.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;
