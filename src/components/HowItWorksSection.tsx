import { motion } from "framer-motion";
import { Search, Cpu, Rocket, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Diagnose Your Funnel",
    description: "We audit your pipeline and map the highest-impact conversion points.",
    outcome: "Clear picture of revenue left on the table.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Build AI Outreach Systems",
    description: "AI-driven sequences across email, LinkedIn, and SMS — personalized at scale.",
    outcome: "Consistent pipeline without manual work.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch Multi-Channel Sequences",
    description: "Campaigns go live. Every lead gets timely touchpoints that drive action.",
    outcome: "More meetings booked, more deals in pipeline.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Optimize & Scale",
    description: "We test messaging, timing, and targeting to compound results.",
    outcome: "Revenue growth from the same lead base.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-muted/30 angled-top angled-bottom">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            From Leaking Pipeline to Revenue Machine
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A proven 4-step system to turn your existing leads into predictable revenue.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 relative group"
            >
              <div className="absolute top-4 right-4 font-display text-3xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                {step.step}
              </div>
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
              <p className="text-sm text-primary/80 font-medium">→ {step.outcome}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Button variant="hero" size="lg" className="btn-glow" asChild>
            <Link to="/contact">
              Book a Strategy Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
