import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const goodFit = [
  "You're a service business (clinic, law firm, agency, coach, contractor)",
  "You have an offer that's working — you just need more leads",
  "You want a done-for-you system, not another tool to manage",
  "You're ready to invest in Meta ads to grow predictably",
  "You want qualified leads or booked calls, not just clicks",
];

const notFit = [
  "You don't have a clear offer or service to sell yet",
  "You're looking for organic-only growth with no ad spend",
  "You want to run campaigns yourself — you just need a course",
  "You expect guaranteed results regardless of market or budget",
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
            We work best with businesses that have a proven offer and want more predictable lead flow.
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
