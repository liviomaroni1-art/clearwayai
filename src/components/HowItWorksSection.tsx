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
  },
  {
    icon: Cpu,
    step: "02",
    title: "Build AI Outreach Systems",
    description: "AI-driven sequences across email, LinkedIn, and SMS — personalized at scale.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch Multi-Channel Sequences",
    description: "Campaigns go live. Every lead gets timely touchpoints that drive action.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Optimize & Scale",
    description: "We test messaging, timing, and targeting to compound results.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-card/30 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            From Leaking Pipeline to Revenue Machine
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            A proven 4-step system to turn your existing leads into predictable revenue.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="minimal-card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-muted-foreground font-mono">{step.step}</span>
                <step.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg" asChild>
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
