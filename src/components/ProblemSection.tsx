import { motion } from "framer-motion";
import { Clock, UserX, TrendingDown, Database, AlertTriangle } from "lucide-react";

const pains = [
  { icon: TrendingDown, text: "Leads come in but don't convert — no structured follow-up" },
  { icon: Clock, text: "Response times are too slow — prospects go cold" },
  { icon: UserX, text: "Founders stuck doing manual outreach instead of closing" },
  { icon: Database, text: "CRM full of untouched leads — revenue sitting on the table" },
  { icon: AlertTriangle, text: "No outbound engine — pipeline depends on inbound luck" },
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
              You Don't Have a Traffic Problem.
            </h2>
            <p className="text-muted-foreground">
              You have a conversion problem.
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
            Most B2B companies spend heavily on generating demand — then let it die in the CRM. 
            The gap isn't attention. It's converting existing demand into revenue.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
