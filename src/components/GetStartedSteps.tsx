import { motion } from "framer-motion";
import { Search, Settings, Rocket, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Growth Audit",
    description: "We map your calls, leads, follow-up gaps, and inactive customer list to find exactly where revenue is leaking.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Implementation",
    description: "We set up your call flows, AI responses, SMS/email follow-ups, and integrations with your existing tools. You don't touch a thing.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Go Live & Testing",
    description: "Your system goes live within ~72 hours. We test everything end-to-end and fine-tune until it's perfect.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Ongoing Optimization",
    description: "Monthly performance reviews, conversation tuning, and campaign adjustments to keep growing your results.",
  },
];

const GetStartedSteps = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
            How to <span className="gradient-text">Get Started</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            From first call to fully optimized — in four simple steps.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-5 rounded-xl text-center relative"
            >
              <span className="absolute top-3 right-3 text-xs font-bold text-primary/50">{step.step}</span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="hero" size="lg" className="btn-glow" asChild>
            <Link to="/contact">
              Start Your Growth Audit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStartedSteps;
