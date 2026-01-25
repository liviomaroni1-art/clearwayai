import { motion } from "framer-motion";
import { Search, Wrench, BarChart3, Clock } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Audit",
    tagline: "We find the leaks",
    description: "In 15 minutes, we'll analyze your current call flow and show you exactly where opportunities are slipping through—and how much it's costing you.",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Build",
    tagline: "We build your AI",
    description: "Our team designs and deploys your custom AI receptionist in 72 hours—trained on your business, your FAQs, your booking flow. Zero effort from you.",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Optimize",
    tagline: "We make it better",
    description: "We monitor every call, refine responses, and continuously improve conversion rates. You get weekly reports and a dedicated success manager.",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm mb-6">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Done-for-you in 72 hours</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">
            Three Steps to <span className="gradient-text">Capture More Calls</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            We handle everything. You just approve and go live.
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
              className="glass-card p-8 text-center hover:border-primary/30 transition-colors group"
            >
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 text-xs font-bold text-black bg-primary rounded-full w-7 h-7 flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">{step.title}</h3>
              <p className="text-sm text-primary font-medium mb-3">{step.tagline}</p>
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
        
        {/* Urgency note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-8 text-sm"
        >
          💡 <span className="text-gray-400">Most clients are live within 72 hours of their strategy call.</span>
        </motion.p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
