import { motion } from "framer-motion";
import { Quote, Star, TrendingUp, Shield } from "lucide-react";

const testimonials = [
  {
    quote: "We went from missing 40% of calls to capturing every single inquiry. ROI paid for itself in the first month—and we're saving $54K annually.",
    author: "Dr. Sarah Mitchell",
    role: "Operations Director",
    company: "Smile Dental Group",
    rating: 5,
    result: "45% more bookings",
  },
  {
    quote: "The AI speaks Spanish as naturally as English. Our bilingual clients finally feel fully supported—even at midnight. Conversion rate up 35%.",
    author: "Maria Chen",
    role: "Practice Manager",
    company: "Family Care Medical",
    rating: 5,
    result: "35% conversion lift",
  },
  {
    quote: "Response time dropped from hours to seconds. Clients noticed immediately. We've added 12 new cases this quarter directly from after-hours calls.",
    author: "James Rodriguez",
    role: "Managing Partner",
    company: "Rodriguez Law Firm",
    rating: 5,
    result: "12 new cases/quarter",
  },
];

const stats = [
  { value: "10,000+", label: "Calls Handled Monthly" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "45%", label: "Avg. Booking Increase" },
  { value: "<2s", label: "Response Time" },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Proven results from real businesses</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-100">
            Don't Just Take <span className="gradient-text">Our Word For It</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See why clinics, law firms, and service businesses are switching to Clearway AI—and never looking back.
          </p>
        </motion.div>

        {/* Stats Row with Anchoring */}
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
              className="glass-card p-6 rounded-2xl text-center hover:border-primary/30 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid with Results */}
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
              
              {/* Result Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium mb-4">
                <TrendingUp className="w-3 h-3" />
                {testimonial.result}
              </div>
              
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
          <p className="text-sm text-gray-500 mb-4">Powered by industry-leading technology</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Retell.ai", "n8n", "Google Calendar", "HubSpot", "Twilio", "Salesforce"].map((partner) => (
              <span 
                key={partner}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:border-primary/30 transition-colors"
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
