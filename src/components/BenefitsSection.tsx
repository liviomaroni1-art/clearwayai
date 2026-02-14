import { motion } from "framer-motion";
import { Clock, TrendingUp, Shield, Zap } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Reclaim 20+ hours weekly",
    description:
      "Stop juggling calls during appointments. Let AI handle the interruptions.",
  },
  {
    icon: TrendingUp,
    title: "Capture 3–5× more leads",
    description:
      "Every call answered means every opportunity captured—automatically.",
  },
  {
    icon: Zap,
    title: "Respond in under 2 seconds",
    description:
      "Clients get instant answers, day or night. No more voicemail limbo.",
  },
  {
    icon: Shield,
    title: "Enterprise-grade security",
    description:
      "HIPAA-ready infrastructure with 99.9% uptime SLA. Your data stays protected.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="section-calm relative">
      {/* Removed teal glow — neutral ambient only */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-100">
              Clear your path to
              <br />
              <span className="gradient-text">better decisions</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Every minute spent answering routine calls is a minute not spent with patients 
              or clients. Clearway AI removes the noise so you can focus on what you do best.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-semibold text-gray-400"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Trusted by practices across the US</span>
            </div>
          </motion.div>

          {/* Right Content - Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-100">{benefit.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;