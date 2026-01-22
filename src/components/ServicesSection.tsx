import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageSquare, Globe, FileText, Users, ChevronDown, Check, Sparkles } from "lucide-react";

const services = [
  {
    icon: Phone,
    title: "AI Receptionist",
    tagline: "Your 24/7 revenue machine",
    description:
      "Never lose another lead. Our AI answers every call instantly, books appointments, and routes urgent inquiries—while you focus on what you do best.",
    isCore: true,
    benefits: [
      "Answer 100% of calls—even at 2 AM on holidays",
      "Cut staffing costs by 70% (vs. hiring a receptionist)",
      "Instant lead qualification so you only call back hot prospects",
      "Books directly into your calendar—no back-and-forth",
      "Sounds natural, speaks 30+ languages fluently",
    ],
    details: "Our AI handles unlimited concurrent calls with human-like conversation. It understands context, answers FAQs, and integrates with your CRM. Perfect for practices that can't afford to miss a single lead.",
  },
  {
    icon: Mail,
    title: "Email Automation",
    tagline: "Respond in seconds, not hours",
    description:
      "Turn inbox chaos into effortless client communication. Our AI writes perfect, on-brand replies in under 60 seconds—24/7.",
    isCore: true,
    benefits: [
      "Reply to emails 50x faster than your team",
      "Maintain your exact brand voice across all messages",
      "Auto-prioritize urgent requests (never miss a VIP)",
      "Handle 80% of routine inquiries without human touch",
      "Seamless handoff when human expertise is needed",
    ],
    details: "Our email AI learns your communication style and handles routine inquiries, follow-ups, and support tickets—freeing your team for high-value work.",
  },
  {
    icon: MessageSquare,
    title: "Website Chat",
    tagline: "Convert visitors while you sleep",
    description:
      "Engage every website visitor instantly. Answer questions, capture leads, and book appointments—even at 3 AM.",
    isCore: false,
    benefits: [
      "Boost conversion rates by 40% with instant responses",
      "Capture leads 24/7 (your competition doesn't sleep)",
      "Handle 100+ conversations simultaneously",
      "Slash support ticket volume by 60%",
      "Smart escalation to live agents when needed",
    ],
    details: "Deploy intelligent chat that understands your business, answers product questions, and guides visitors through your sales funnel—all automatically.",
  },
  {
    icon: Globe,
    title: "Conversion Websites",
    tagline: "Built to capture, not just impress",
    description:
      "Get a professional website designed to turn visitors into booked appointments—fully integrated with your AI stack.",
    isCore: false,
    benefits: [
      "Designed for conversion (not just looks)",
      "AI chat + booking built-in from day one",
      "Mobile-first, lightning-fast loading",
      "SEO-optimized to drive organic traffic",
      "Update content yourself—no developer needed",
    ],
    details: "We build modern websites that work as the front door to your AI-powered operations. Every site integrates with your automation—capturing leads, triggering follow-ups, and booking appointments automatically.",
  },
  {
    icon: FileText,
    title: "Document Processing",
    tagline: "Eliminate manual data entry",
    description:
      "Extract data from invoices, contracts, and forms automatically—with 99%+ accuracy. Hours of work → seconds.",
    isCore: false,
    benefits: [
      "Process documents 10x faster than manual entry",
      "99%+ accuracy on structured data extraction",
      "Automatic validation catches errors before humans do",
      "Direct integration with your existing systems",
      "Cut data entry costs by 90%",
    ],
    details: "Our document processing AI reads invoices, contracts, applications, and forms—extracting key data and pushing it directly into your systems without human intervention.",
  },
  {
    icon: Users,
    title: "Lead Qualification",
    tagline: "Focus on buyers, not tire-kickers",
    description:
      "Automatically score and prioritize incoming leads so your team only talks to high-intent prospects.",
    isCore: false,
    benefits: [
      "Increase sales efficiency by 50%",
      "Auto-score leads based on real behavior",
      "Instant follow-up on hot prospects",
      "Stop wasting time on unqualified leads",
      "Higher conversion rates with smarter targeting",
    ],
    details: "Our lead qualification system analyzes prospect behavior, engagement, and fit—automatically scoring and routing leads so your team only talks to ready-to-buy customers.",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Done-for-you automation</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            AI That <span className="gradient-text">Actually Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Proven solutions. Real results. Click any service to see exactly how it transforms your business.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group glass-card rounded-2xl transition-all duration-300 cursor-pointer w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] self-start ${
                service.isCore 
                  ? "border-primary/40 hover:border-primary/60 ring-1 ring-primary/20" 
                  : "hover:border-primary/50"
              } ${expandedService === service.title ? "ring-2 ring-primary/50" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleService(service.title);
              }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {service.isCore && (
                      <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mb-4">
                        ⭐ Most Popular
                      </span>
                    )}
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{service.tagline}</p>
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
                          What You Get
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
