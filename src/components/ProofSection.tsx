import { motion } from "framer-motion";
import { Quote, Star, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "We went from missing about 40% of calls to capturing nearly every inquiry. The AI handles after-hours calls we'd never get before.",
    role: "Practice Manager",
    industry: "Dental clinic (TX)",
    result: "~40% more inquiries captured",
  },
  {
    quote: "The AI speaks Spanish as naturally as English. Our bilingual clients finally feel fully supported—even at midnight.",
    role: "Operations Director",
    industry: "Medical practice (CA)",
    result: "Bilingual support 24/7",
  },
  {
    quote: "Response time dropped from hours to seconds. We've seen a noticeable uptick in new cases from after-hours calls.",
    role: "Managing Partner",
    industry: "Law firm (FL)",
    result: "Faster response, more leads",
  },
];

const ProofSection = () => {
  const demoNumber = "+1 (888) 778-3091";

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Real Results From <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what happens when every call gets answered.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-8 relative group hover:border-primary/30 transition-colors"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
              
              {/* Result Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
                <CheckCircle2 className="w-3 h-3" />
                {testimonial.result}
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.role}</p>
                <p className="text-sm text-muted-foreground">{testimonial.industry}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="hero" size="lg" className="btn-glow" asChild>
            <Link to="/contact">
              Book Your Free Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Want to hear it first?{" "}
            <a href={`tel:${demoNumber.replace(/\s/g, '')}`} className="text-primary hover:underline">
              Call the optional live demo: {demoNumber}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;
