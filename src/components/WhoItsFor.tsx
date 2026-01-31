import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const WhoItsFor = () => {
  const idealFor = [
    { text: "20+ calls/day", detail: "Volume where AI receptionist ROI makes sense" },
    { text: "Losing calls during peak hours", detail: "When you're too busy to answer" },
    { text: "Want booked calendar + CRM logging", detail: "Automated scheduling and lead capture" },
    { text: "Willing to invest in growth", detail: "Premium solution for serious businesses" },
  ];

  const notFor = [
    { text: "Under 10 calls/day", detail: "ROI may not justify the investment" },
    { text: "Looking for the cheapest option", detail: "We're premium, not budget" },
    { text: "Highly specialized triage", detail: "Complex medical intake without enterprise setup" },
    { text: "Unwilling to do onboarding call", detail: "We need 30 min to configure your AI" },
  ];

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Is Clearway AI <span className="gradient-text">Right For You?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're not for everyone—and that's by design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Perfect Fit */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border-primary/30"
          >
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <Check className="w-6 h-6" />
              Perfect Fit
            </h3>
            <ul className="space-y-4">
              {idealFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium">{item.text}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not For */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border-muted/50"
          >
            <h3 className="text-2xl font-bold text-muted-foreground mb-6 flex items-center gap-2">
              <X className="w-6 h-6" />
              Not The Best Fit
            </h3>
            <ul className="space-y-4">
              {notFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground/80 font-medium">{item.text}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
