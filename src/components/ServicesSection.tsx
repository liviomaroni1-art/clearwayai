import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, Calendar, FileText, Users } from "lucide-react";

const services = [
  {
    icon: Phone,
    title: "AI Receptionist",
    description:
      "Answer every inbound call, book appointments, and route inquiries to the right person—24/7, without hiring.",
    isCore: true,
  },
  {
    icon: Mail,
    title: "Email Automation",
    description:
      "Respond to customer emails in seconds with context-aware replies that sound human and stay on-brand.",
    isCore: true,
  },
  {
    icon: MessageSquare,
    title: "Chat Support",
    description:
      "Engage website visitors instantly, answer FAQs, and capture leads—even outside business hours.",
    isCore: false,
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Let customers book directly into your calendar. No back-and-forth emails, no double-bookings.",
    isCore: false,
  },
  {
    icon: FileText,
    title: "Document Processing",
    description:
      "Extract key data from invoices, contracts, and forms automatically—saving hours of manual entry.",
    isCore: false,
  },
  {
    icon: Users,
    title: "Lead Qualification",
    description:
      "Score and prioritize incoming leads so your sales team focuses only on high-intent prospects.",
    isCore: false,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI Solutions That <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We implement cutting-edge AI tools tailored to your business needs, 
            freeing up your time for high-value work.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group glass-card p-8 rounded-2xl transition-all duration-300 ${
                service.isCore 
                  ? "border-primary/40 hover:border-primary/60 ring-1 ring-primary/20" 
                  : "hover:border-primary/50"
              }`}
            >
              {service.isCore && (
                <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mb-4">
                  Core Service
                </span>
              )}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
