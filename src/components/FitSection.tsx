import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const goodFit = [
  "You already generate leads (inbound, paid, referrals) but conversion is low",
  "You have a CRM with untouched or stale leads",
  "Your team is too small to hire a full SDR team",
  "You want a system — not just another tool to manage",
  "You're ready to invest in pipeline infrastructure",
];

const notFit = [
  "You're pre-revenue or don't have any leads yet",
  "You need a full-service marketing agency",
  "You're looking for the cheapest option on the market",
  "You're not willing to share CRM access for setup",
];

const FitSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Is This Right For You?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We work with a specific type of company. Here's how to know if we're a fit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              We're a fit if…
            </h3>
            <ul className="space-y-3">
              {goodFit.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-destructive" />
              Not a fit if…
            </h3>
            <ul className="space-y-3">
              {notFit.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                  <XCircle className="w-4 h-4 text-destructive/70 flex-shrink-0 mt-0.5" />
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
