import { motion } from "framer-motion";
import { TrendingUp, Quote } from "lucide-react";

const caseStudies = [
  {
    metric: "+32%",
    description: "more sales opportunities in 60 days",
    industry: "B2B SaaS",
  },
  {
    metric: "3x",
    description: "demo-to-close rate after AI follow-up",
    industry: "Professional Services",
  },
  {
    metric: "–70%",
    description: "reduction in manual outreach time",
    industry: "FinTech",
  },
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
    <section id="results" className="section-padding bg-muted/20 angled-top">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Results That Compound
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Real outcomes from companies that stopped leaving revenue in the CRM.
          </p>
        </motion.div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-16">
          {caseStudies.map((cs, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-7 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-4" />
              <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">{cs.metric}</div>
              <p className="text-sm text-muted-foreground mb-3">{cs.description}</p>
              <span className="text-xs text-primary/50 font-medium uppercase tracking-widest">{cs.industry}</span>
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
              className="glass-card p-6 relative"
            >
              <Quote className="w-5 h-5 text-secondary/40 mb-4" />
              <p className="text-sm text-foreground/85 leading-relaxed mb-5 italic">"{t.quote}"</p>
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
