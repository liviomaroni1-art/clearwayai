import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageSquare, Globe, FileText, Users, ChevronDown, Check } from "lucide-react";

const services = [
  {
    icon: Phone,
    title: "AI Receptionist",
    description:
      "Answer every inbound call, book appointments, and route inquiries to the right person—24/7, without hiring.",
    isCore: true,
    benefits: [
      "Never miss a call again—even outside business hours",
      "Reduce staffing costs by up to 70%",
      "Instant call routing to the right department",
      "Seamless appointment booking directly into your calendar",
      "Professional, consistent customer experience every time",
    ],
    details: "Our AI Receptionist handles unlimited concurrent calls with natural conversation, understands context, and integrates directly with your existing systems. Perfect for businesses that can't afford to miss leads.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description:
      "Respond to customer emails in seconds with context-aware replies that sound human and stay on-brand.",
    isCore: true,
    benefits: [
      "Respond to emails in under 60 seconds, 24/7",
      "Maintain your brand voice across all communications",
      "Auto-categorize and prioritize incoming messages",
      "Reduce email handling time by 80%",
      "Seamless handoff to human agents when needed",
    ],
    details: "Our email automation learns your communication style and handles routine inquiries, follow-ups, and customer support tickets—freeing your team to focus on complex issues.",
  },
  {
    icon: MessageSquare,
    title: "Chat Support",
    description:
      "Engage website visitors instantly, answer FAQs, and capture leads—even outside business hours.",
    isCore: false,
    benefits: [
      "Instant responses increase conversion by 40%",
      "Capture leads while you sleep",
      "Handle unlimited simultaneous conversations",
      "Reduce support ticket volume by 60%",
      "Smooth escalation to live agents when needed",
    ],
    details: "Deploy intelligent chat that understands context, answers product questions, and guides visitors through your sales funnel—all without human intervention.",
  },
  {
    icon: Globe,
    title: "Website Creation",
    description:
      "Get a professional, conversion-focused website that represents your brand and generates leads around the clock.",
    isCore: false,
    benefits: [
      "Custom design tailored to your brand identity",
      "Mobile-responsive and fast-loading pages",
      "SEO-optimized to rank higher on Google",
      "Built-in lead capture forms and CTAs",
      "Easy content updates without technical skills",
    ],
    details: "We build modern, professional websites designed to convert visitors into customers. From single-page landing sites to full business websites—all optimized for speed, SEO, and user experience.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    description:
      "Extract key data from invoices, contracts, and forms automatically—saving hours of manual entry.",
    isCore: false,
    benefits: [
      "Process documents 10x faster than manual entry",
      "99%+ accuracy on structured data extraction",
      "Automatic validation and error detection",
      "Seamless integration with your existing systems",
      "Reduce data entry costs by 90%",
    ],
    details: "Our document processing AI reads invoices, contracts, applications, and forms—extracting key data and pushing it directly into your systems without human intervention.",
  },
  {
    icon: Users,
    title: "Lead Qualification",
    description:
      "Score and prioritize incoming leads so your sales team focuses only on high-intent prospects.",
    isCore: false,
    benefits: [
      "Increase sales efficiency by 50%",
      "Automatic lead scoring based on behavior",
      "Instant follow-up on high-priority leads",
      "Reduce time wasted on unqualified prospects",
      "Better conversion rates with smarter targeting",
    ],
    details: "Our lead qualification system analyzes prospect behavior, engagement, and fit—automatically scoring and routing leads so your sales team only talks to ready-to-buy customers.",
  },
];

const ServicesSection = () => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (title: string) => {
    setExpandedService(expandedService === title ? null : title);
  };

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
            Click on any service to learn more about how it can transform your business operations.
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
              className={`group glass-card rounded-2xl transition-all duration-300 cursor-pointer ${
                service.isCore 
                  ? "border-primary/40 hover:border-primary/60 ring-1 ring-primary/20" 
                  : "hover:border-primary/50"
              } ${expandedService === service.title ? "ring-2 ring-primary/50" : ""}`}
              onClick={() => toggleService(service.title)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
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
                  </div>
                  <motion.div
                    animate={{ rotate: expandedService === service.title ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 mt-2"
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedService === service.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-border/50">
                        <p className="text-foreground/80 mb-6">
                          {service.details}
                        </p>
                        <h4 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wide">
                          Key Benefits
                        </h4>
                        <ul className="space-y-3">
                          {service.benefits.map((benefit, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
