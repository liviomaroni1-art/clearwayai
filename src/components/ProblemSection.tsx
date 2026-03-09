import { motion } from "framer-motion";
import { Clock, UserX, TrendingDown, Database, AlertTriangle } from "lucide-react";

const pains = [
  { icon: TrendingDown, text: "Running ads but leads aren't converting into paying clients" },
  { icon: Clock, text: "Leads go cold because no one follows up fast enough" },
  { icon: UserX, text: "Spending on traffic with no system to capture and qualify it" },
  { icon: Database, text: "No clear pipeline — leads scattered across inboxes and spreadsheets" },
  { icon: AlertTriangle, text: "Relying on referrals and word-of-mouth for new business" },
];

const ProblemSection = () => {
  return (
    <section className="section-padding border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ads Without a System
            </h2>
            <p className="text-muted-foreground">
              Are just expensive brand awareness.
            </p>
          </motion.div>

          <div className="space-y-3 mb-12">
            {pains.map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-center gap-4 py-3 px-4 rounded-lg border border-border/50 bg-card/50"
              >
                <pain.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-foreground/85">{pain.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mx-auto"
          >
            Most businesses spend on Meta ads without a proper funnel or follow-up system.
            The result? Wasted budget and missed opportunities.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
