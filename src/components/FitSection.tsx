import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const goodFit = [
  "You already generate leads but conversion is low",
  "CRM has untouched or stale leads",
  "Team too small to hire a full SDR org",
  "You want a system — not another tool",
  "Ready to invest in pipeline infrastructure",
];

const notFit = [
  "Pre-revenue or no leads yet",
  "Need a full-service marketing agency",
  "Looking for the cheapest option",
  "Not willing to share CRM access",
];

const FitSection = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Is This Right For You?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We work with a specific type of company. Here's how to know.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Good fit
            </h3>
            <ul className="space-y-3">
              {goodFit.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-destructive/30 to-transparent" />
            <h3 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              Not a fit
            </h3>
            <ul className="space-y-3">
              {notFit.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                  <XCircle className="w-4 h-4 text-destructive/60 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FitSection;
