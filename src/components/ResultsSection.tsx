import { motion } from "framer-motion";
import { TrendingUp, Quote } from "lucide-react";

const caseStudies = [
  { metric: "+32%", description: "more sales opportunities in 60 days", industry: "B2B SaaS" },
  { metric: "3x", description: "demo-to-close rate after AI follow-up", industry: "Professional Services" },
  { metric: "–70%", description: "reduction in manual outreach time", industry: "FinTech" },
];

const testimonials = [
  {
    quote: "Clearway rebuilt our follow-up engine in two weeks. We went from 8% to 22% lead-to-meeting conversion.",
    name: "[Client Name]",
    role: "[Role], [Company]",
  },
  {
    quote: "Thousands of stale leads sitting in HubSpot. Clearway's AI sequences brought 15% of them back to life.",
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
            Results That Compound
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Real outcomes from companies that stopped leaving revenue in the CRM.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16">
          {caseStudies.map((cs, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="minimal-card p-6 text-center"
            >
              <TrendingUp className="w-4 h-4 text-muted-foreground mx-auto mb-4" />
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">{cs.metric}</div>
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
