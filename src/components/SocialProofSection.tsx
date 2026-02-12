import { motion } from "framer-motion";
import { Quote, Star, CheckCircle2, MapPin, Globe } from "lucide-react";

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

const SocialProofSection = () => {
  return (
    <section className="py-12 md:py-20 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Early-stage trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10 md:mb-14"
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-full text-xs md:text-sm">
            <MapPin className="w-4 h-4 text-destructive" />
            <span className="text-muted-foreground">Built in Switzerland</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-full text-xs md:text-sm">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Designed for US service businesses</span>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            Real Results From <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            See what happens when every call gets answered.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-6 md:p-8 relative hover:border-primary/30 transition-colors"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
                <CheckCircle2 className="w-3 h-3" />
                {testimonial.result}
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
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

        {/* Tech partners */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 md:mt-14 text-center"
        >
          <p className="text-xs text-muted-foreground mb-3">Powered by industry-leading technology</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Retell.ai", "n8n", "Google Calendar", "HubSpot", "Twilio", "Salesforce"].map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1.5 bg-muted/50 border border-border/50 rounded-full text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
