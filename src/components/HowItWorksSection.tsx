import { motion } from "framer-motion";
import { Search, Wrench, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Audit",
    description: "We analyze your current workflows to identify where AI can save time and reduce costs.",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Build",
    description: "We design and deploy custom AI systems tailored to your operations and tools.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Optimize",
    description: "We monitor performance and continuously improve your automation for better results.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A simple, proven process to get your AI systems up and running.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 text-xs font-bold text-primary bg-background border border-primary/30 rounded-full w-6 h-6 flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
