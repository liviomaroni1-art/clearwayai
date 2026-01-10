import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, Calendar, FileText, Users } from "lucide-react";

const services = [
  {
    icon: Phone,
    title: "AI Receptionist",
    description:
      "Never miss a call again. Our AI handles incoming calls, schedules appointments, and routes inquiries 24/7.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description:
      "Intelligent email responses that understand context and reply professionally on your behalf.",
  },
  {
    icon: MessageSquare,
    title: "Chat Support",
    description:
      "Deploy AI chatbots that engage customers, answer questions, and qualify leads around the clock.",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "AI-powered scheduling that syncs with your calendar and handles bookings automatically.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    description:
      "Extract, analyze, and organize data from documents with intelligent automation.",
  },
  {
    icon: Users,
    title: "Lead Qualification",
    description:
      "AI that identifies and prioritizes your best leads so your team focuses on closing deals.",
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
              className="group glass-card p-8 rounded-2xl hover:border-primary/50 transition-all duration-300"
            >
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
