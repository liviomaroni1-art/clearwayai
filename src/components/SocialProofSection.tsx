import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "We went from missing 40% of calls to capturing every single inquiry. The AI handles scheduling better than we ever could manually.",
    author: "Dr. Sarah Mitchell",
    role: "Operations Director",
    company: "Smile Dental Group",
    rating: 5,
  },
  {
    quote: "Response time dropped from hours to seconds. Our clients noticed immediately—and so did our conversion rate. Up 35% in the first month.",
    author: "James Rodriguez",
    role: "Managing Partner",
    company: "Rodriguez Law Firm",
    rating: 5,
  },
  {
    quote: "The AI speaks Spanish as naturally as English. Our bilingual patient base finally feels fully supported, even at midnight.",
    author: "Maria Chen",
    role: "Practice Manager",
    company: "Family Care Medical",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Calls Handled Monthly" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "45%", label: "Increase in Bookings" },
  { value: "<2s", label: "Average Response Time" },
];

const SocialProofSection = () => {
  return (
    <section className="section-calm">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-100">
            Trusted by Growing <span className="gradient-text">Businesses</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See why clinics, law firms, and service businesses choose ClearwayAI to handle their calls.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="elevated-card p-8 relative group hover:border-primary/30 transition-colors"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-white/10 pt-4">
                <p className="font-semibold text-gray-100">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <p className="text-sm text-primary">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 mb-4">Trusted technology partners</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Retell.ai", "n8n", "Google Calendar", "HubSpot", "Twilio"].map((partner) => (
              <span 
                key={partner}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400"
              >
                {partner}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
