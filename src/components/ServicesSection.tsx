import { motion } from "framer-motion";
import { Bot, Mail, Settings, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Bot,
    title: "AI SDR & Outbound",
    audience: "For teams that need pipeline without hiring SDRs",
    benefit: "AI-powered prospecting that books meetings on autopilot.",
    metric: "+20–40% meetings booked",
  },
  {
    icon: Mail,
    title: "Lead Nurture & Follow-Up",
    audience: "For companies with leads going cold in the CRM",
    benefit: "Multi-touch sequences that re-engage and convert stale leads.",
    metric: "Recover 15–30% lost pipeline",
  },
  {
    icon: Settings,
    title: "CRM & Pipeline Automation",
    audience: "For ops teams drowning in manual data entry",
    benefit: "Automated scoring, routing, and lifecycle management.",
    metric: "Cut admin time by 60%+",
  },
  {
    icon: Users,
    title: "Campaign Strategy",
    audience: "For founders who want a strategic partner",
    benefit: "We co-build your outbound playbook and optimize weekly.",
    metric: "Faster iteration, higher close rates",
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
            What We Build For You
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            End-to-end AI systems that turn your leads into revenue.
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
