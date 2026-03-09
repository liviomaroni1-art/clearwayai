import { motion } from "framer-motion";
import { Clock, UserX, TrendingDown, Database, AlertTriangle } from "lucide-react";

const pains = [
  { icon: TrendingDown, text: "Leads come in but don't convert — no structured follow-up in place" },
  { icon: Clock, text: "Response times are too slow — prospects go cold before you reach out" },
  { icon: UserX, text: "Founders are stuck doing manual outreach instead of closing deals" },
  { icon: Database, text: "Your CRM is full of untouched leads — money sitting on the table" },
  { icon: AlertTriangle, text: "No consistent outbound engine — pipeline depends on inbound luck" },
];

const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              You Don't Have a Traffic Problem.
            </h2>
            <p className="text-lg text-muted-foreground">
              You have a conversion problem.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 mb-10"
          >
            {pains.map((pain, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/30">
                <pain.icon className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-foreground/90">{pain.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            Most B2B companies spend heavily on generating demand — then let it die in the CRM. 
            The gap isn't attention. It's <span className="text-primary font-medium">converting existing demand into revenue</span>.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
