import { motion } from "framer-motion";
import { TrendingUp, Quote } from "lucide-react";

const scenarios = [
  { metric: "More Leads", description: "Consistent flow of qualified prospects from Meta ads into your pipeline", industry: "Lead Generation" },
  { metric: "Fewer No-Shows", description: "Automated reminders and confirmations can help reduce missed appointments", industry: "AI Follow-Up" },
  { metric: "Better Follow-Up", description: "Every lead gets a fast, personalized response — no more leads slipping through", industry: "Nurture System" },
];

const testimonials = [
  {
    quote: "Before Clearway, we were running ads with no real system behind them. Now leads come in, get followed up instantly, and show up on our calendar.",
    name: "[Client Name]",
    role: "[Role], [Company]",
  },
  {
    quote: "We went from chasing leads manually to having a full pipeline we can actually manage. The AI follow-up alone has been a game changer.",
    name: "[Client Name]",
    role: "[Role], [Company]",
  },
];

const ResultsSection = () => {
  return (
    <section id="results" className="section-padding bg-card/30 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What's Possible
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Example outcomes from businesses using a structured lead generation and follow-up system. Results depend on your offer, market, and budget.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16">
          {scenarios.map((cs, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="minimal-card p-6 text-center"
            >
              <TrendingUp className="w-4 h-4 text-muted-foreground mx-auto mb-4" />
              <div className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">{cs.metric}</div>
              <p className="text-sm text-muted-foreground mb-2">{cs.description}</p>
              <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">{cs.industry}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="minimal-card p-6"
            >
              <Quote className="w-4 h-4 text-muted-foreground/40 mb-4" />
              <p className="text-sm text-foreground/80 leading-relaxed mb-5 italic">"{t.quote}"</p>
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
