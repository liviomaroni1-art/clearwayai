import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "We went from missing 40% of calls to capturing every single inquiry. The AI handles scheduling better than we ever could manually.",
    role: "Operations Director",
    industry: "Healthcare Practice",
  },
  {
    quote: "Response time dropped from hours to seconds. Our customers noticed immediately—and so did our conversion rate.",
    role: "Managing Partner",
    industry: "Professional Services Firm",
  },
];

const TrustSection = () => {
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
            What Teams Are <span className="gradient-text">Saying</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl relative"
            >
              <Quote className="w-8 h-8 text-primary/30 absolute top-6 right-6" />
              <p className="text-foreground/90 leading-relaxed mb-6 text-lg">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border/50 pt-4">
                <p className="font-medium text-foreground">{testimonial.role}</p>
                <p className="text-sm text-muted-foreground">{testimonial.industry}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mt-12 text-center"
        >
          <div>
            <p className="text-3xl font-bold text-primary">99.9%</p>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">&lt;3s</p>
            <p className="text-sm text-muted-foreground">Avg Response</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">100+</p>
            <p className="text-sm text-muted-foreground">Teams Served</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
