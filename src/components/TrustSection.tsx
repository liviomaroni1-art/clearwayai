import { motion } from "framer-motion";
import { Quote, Shield, Clock, Zap, Users } from "lucide-react";

const testimonials = [
  {
    quote: "We went from missing 40% of calls to capturing every single inquiry. The AI handles scheduling better than we ever could manually.",
    role: "Operations Director",
    industry: "Healthcare Practice"
  },
  {
    quote: "Response time dropped from hours to seconds. Our customers noticed immediately—and so did our conversion rate.",
    role: "Managing Partner",
    industry: "Professional Services Firm"
  }
];

const benefits = [
  { icon: Shield, title: "Enterprise security", description: "HIPAA-ready, encrypted, SOC 2 compliant infrastructure" },
  { icon: Clock, title: "Always available", description: "24/7/365 coverage without sick days or holidays" },
  { icon: Zap, title: "Instant response", description: "Under 2-second answer time, every call" },
  { icon: Users, title: "Scales with you", description: "Handle 1 or 1,000 calls without hiring" },
];

const TrustSection = () => {
  return (
    <section className="section-calm">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Why teams trust <span className="gradient-text">Clearway AI</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Confidence comes from clarity. Here's what our partners experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 text-center hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="elevated-card p-8 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
              <p className="text-foreground/80 leading-relaxed mb-6 text-lg">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-medium text-foreground">{testimonial.role}</p>
                <p className="text-sm text-muted-foreground">{testimonial.industry}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-12 text-center"
        >
          {[
            { value: "99.9%", label: "Uptime SLA" },
            { value: "<2s", label: "Avg response" },
            { value: "24/7/365", label: "Availability" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 mx-auto max-w-lg"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-2xl px-6 py-5 text-center glow-effect">
            <p className="text-sm font-medium text-primary">
              💰 36-month commitment: $0 setup fee + 20% off monthly
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground mb-3">Powered by</p>
          <div className="flex flex-wrap justify-center gap-4 text-muted-foreground text-sm">
            {["Retell.ai", "n8n", "Google Calendar", "HubSpot"].map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-accent border border-border rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
