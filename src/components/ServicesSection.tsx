import { motion } from "framer-motion";
import { Megaphone, Layout, Bot, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Megaphone,
    title: "Done-for-You Meta Campaigns",
    audience: "Facebook & Instagram ads managed end-to-end",
    benefit: "We handle strategy, creative, targeting, and optimization — designed to drive qualified traffic to your funnel.",
    metric: "Full-service ad management",
  },
  {
    icon: Layout,
    title: "High-Converting Funnels",
    audience: "Landing pages built to capture and convert",
    benefit: "Custom landing pages with lead forms, tracking, and conversion-optimized copy — so your ad spend can work harder.",
    metric: "Pages designed for action",
  },
  {
    icon: Bot,
    title: "AI Lead Capture & Nurture",
    audience: "Instant follow-up via chat, SMS, and email",
    benefit: "Every lead gets a fast, personalized response. Our AI qualifies, nurtures, and moves prospects toward a booking.",
    metric: "Faster response, fewer lost leads",
  },
  {
    icon: BarChart3,
    title: "Pipeline & CRM Integration",
    audience: "Full visibility into your lead flow",
    benefit: "See every lead, every stage, and every outcome. We integrate with your calendar and CRM so nothing falls through.",
    metric: "Clear reporting & handover",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What You Get
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Everything you need to turn paid traffic into a predictable pipeline.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="minimal-card p-6"
            >
              <service.icon className="w-5 h-5 text-muted-foreground mb-4" />
              <h3 className="font-display text-base font-bold text-foreground mb-1">{service.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{service.audience}</p>
              <p className="text-sm text-foreground/80 mb-4">{service.benefit}</p>
              <div className="pt-3 border-t border-border">
                <span className="text-sm font-medium text-foreground">{service.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">
              See What We'd Build For You
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
