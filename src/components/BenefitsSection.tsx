import { motion } from "framer-motion";
import { Clock, TrendingUp, Shield, Zap } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save 20+ Hours Weekly",
    description:
      "Automate repetitive tasks and reclaim your time for strategic decisions.",
  },
  {
    icon: TrendingUp,
    title: "Scale Without Hiring",
    description:
      "Handle 10x more inquiries without adding headcount to your team.",
  },
  {
    icon: Zap,
    title: "Instant Response Times",
    description:
      "Never leave a customer waiting. AI responds in seconds, not hours.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Your data is protected with bank-level encryption and compliance standards.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Focus on Growth, <br />
              <span className="gradient-text">Not Busywork</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Every minute spent on routine tasks is a minute not spent growing your business. 
              Clearway AI eliminates the bottlenecks so you can concentrate on what you do best.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Trusted by 100+ businesses</span>
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
                className="glass-card p-6 rounded-xl"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
