import { motion } from "framer-motion";
import { Phone, Calendar, Database, MessageSquare, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "24/7 Call Answering",
    description: "Designed to answer calls instantly, handle inquiries, and route urgent calls to you around the clock.",
    highlight: "< 2 second avg. pickup",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Books appointments directly into your calendar. Handles reschedules and sends confirmations.",
    highlight: "Syncs with Google, Calendly, Cal.com",
  },
  {
    icon: Database,
    title: "CRM Integration",
    description: "Every call logged, every lead captured. Syncs with HubSpot, Salesforce, or your existing CRM.",
    highlight: "Zero manual data entry",
  },
  {
    icon: MessageSquare,
    title: "Multi-Channel Support",
    description: "Handle calls, emails, and chat from one AI system. Consistent experience across all touchpoints.",
    highlight: "One AI, all channels",
  },
  {
    icon: Globe,
    title: "30+ Languages",
    description: "Serve customers in their preferred language. From English and Spanish to Mandarin and Arabic.",
    highlight: "Global coverage",
  },
];

const FeaturesBreakdown = () => {
  return (
    <section className="section-calm bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Everything You Need to <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One AI system that handles calls, books appointments, and keeps your CRM updated—so you can focus on growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover:border-primary/40 transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                {feature.highlight}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button variant="hero" size="lg" className="btn-glow" asChild>
            <Link to="/contact">
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesBreakdown;
