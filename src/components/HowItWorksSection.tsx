import { motion } from "framer-motion";
import { Search, Wrench, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Audit",
    description: "We analyze your current call flow to identify where opportunities are slipping through.",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Build",
    description: "We design and deploy your custom AI receptionist, tailored to your practice.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Optimize",
    description: "We monitor performance and continuously improve for better conversion rates.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-calm bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            A calm, proven process. We handle the complexity so you can focus on your practice.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-8 text-center hover:border-primary/30 transition-colors"
            >
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 text-xs font-bold text-black bg-primary rounded-full w-7 h-7 flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-100">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Connector line */}
        <div className="hidden md:block max-w-4xl mx-auto mt-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;