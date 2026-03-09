import { motion } from "framer-motion";
import { Search, Cpu, Rocket, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Diagnose Your Funnel",
    description: "We audit your pipeline, identify where leads drop off, and map the highest-impact conversion points.",
    outcome: "Clear picture of revenue you're leaving on the table.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Build AI Outreach & Follow-Up Systems",
    description: "We design and deploy AI-driven sequences across email, LinkedIn, and SMS — personalized at scale.",
    outcome: "Consistent pipeline generation without manual work.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Launch Multi-Channel Sequences",
    description: "Your campaigns go live across channels. Every lead gets timely, relevant touchpoints that drive action.",
    outcome: "More meetings booked, more deals in pipeline.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Optimize & Scale",
    description: "We continuously test messaging, timing, and targeting to improve conversion rates and expand what works.",
    outcome: "Compounding revenue growth from the same lead base.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A proven 4-step system to turn your existing leads into predictable revenue.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 flex gap-5"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Step {step.step}</p>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                <p className="text-sm text-primary/80 font-medium">→ {step.outcome}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg" className="btn-glow hover:scale-[1.03] transition-all" asChild>
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
