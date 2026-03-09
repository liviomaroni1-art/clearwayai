import { motion } from "framer-motion";
import { Bot, Mail, Settings, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Bot,
    title: "AI SDR & Outbound Campaigns",
    audience: "For teams that need consistent pipeline without hiring SDRs",
    benefit: "AI-powered prospecting that books meetings on autopilot",
    metric: "Increase meetings booked by 20–40%",
  },
  {
    icon: Mail,
    title: "Automated Lead Nurture & Follow-Up",
    audience: "For companies with leads going cold in the CRM",
    benefit: "Multi-touch sequences that re-engage and convert stale leads",
    metric: "Recover 15–30% of lost pipeline",
  },
  {
    icon: Settings,
    title: "CRM & Pipeline Automation",
    audience: "For ops teams drowning in manual data entry and handoffs",
    benefit: "Automated scoring, routing, and lifecycle management",
    metric: "Cut admin time by 60%+",
  },
  {
    icon: Users,
    title: "Done-With-You Campaign Strategy",
    audience: "For founders who want a strategic partner, not just a tool",
    benefit: "We co-build your outbound playbook and optimize weekly",
    metric: "Faster iteration, higher close rates",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What We Build For You
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            End-to-end AI systems designed to turn your existing leads into revenue.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <service.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-xs text-primary/70 font-medium mb-3">{service.audience}</p>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{service.benefit}</p>
              <div className="pt-3 border-t border-border/30">
                <span className="text-sm font-semibold text-primary">{service.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg" className="btn-glow hover:scale-[1.03] transition-all" asChild>
            <Link to="/contact">
              Book a Strategy Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
