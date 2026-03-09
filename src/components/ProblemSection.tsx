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
    <section className="section-padding relative ambient-glow">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              You Don't Have a Traffic Problem.
            </h2>
            <p className="text-lg text-muted-foreground">
              You have a <span className="text-primary font-medium">conversion</span> problem.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {pains.map((pain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card p-5 flex items-start gap-3"
              >
                <pain.icon className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/85">{pain.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            Most B2B companies spend heavily on generating demand — then let it die in the CRM. 
            The gap isn't attention. It's <span className="gradient-text font-semibold">converting existing demand into revenue</span>.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
