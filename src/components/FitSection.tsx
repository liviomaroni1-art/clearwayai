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
    <section className="section-padding border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Is This Right For You?
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            We work with a specific type of company. Here's how to know.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="minimal-card p-6"
          >
            <h3 className="font-display text-base font-bold text-foreground mb-5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-foreground" />
              Good fit
            </h3>
            <ul className="space-y-3">
              {goodFit.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="minimal-card p-6"
          >
            <h3 className="font-display text-base font-bold text-foreground mb-5 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-muted-foreground" />
              Not a fit
            </h3>
            <ul className="space-y-3">
              {notFit.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <XCircle className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
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
