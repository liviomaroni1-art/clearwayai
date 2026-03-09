import { motion } from "framer-motion";
import { TrendingUp, Quote } from "lucide-react";

const caseStudies = [
  {
    metric: "+32%",
    description: "more sales opportunities in 60 days from existing leads",
    industry: "B2B SaaS",
  },
  {
    metric: "3x",
    description: "increase in demo-to-close rate after AI follow-up sequences",
    industry: "Professional Services",
  },
  {
    metric: "–70%",
    description: "reduction in manual outreach time for the founding team",
    industry: "FinTech",
  },
];

const testimonials = [
  {
    quote: "Clearway rebuilt our entire follow-up engine in two weeks. We went from 8% to 22% lead-to-meeting conversion.",
    name: "[Client Name]",
    role: "[Role], [Company]",
  },
  {
    quote: "We had thousands of stale leads sitting in HubSpot. Clearway's AI sequences brought 15% of them back to life.",
    name: "[Client Name]",
    role: "[Role], [Company]",
  },
];

const ResultsSection = () => {
  return (
    <section id="results" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Results That Speak for Themselves
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Real outcomes from companies that stopped leaving revenue in the CRM.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-14">
          {caseStudies.map((cs, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{cs.metric}</div>
              <p className="text-sm text-muted-foreground mb-3">{cs.description}</p>
              <span className="text-xs text-primary/60 font-medium uppercase tracking-wider">{cs.industry}</span>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <Quote className="w-5 h-5 text-primary/40 mb-3" />
              <p className="text-sm text-foreground/90 leading-relaxed mb-4 italic">"{t.quote}"</p>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
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
