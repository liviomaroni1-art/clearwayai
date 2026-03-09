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
    accentColor: "primary",
  },
  {
    icon: Mail,
    title: "Lead Nurture & Follow-Up",
    audience: "For companies with leads going cold in the CRM",
    benefit: "Multi-touch sequences that re-engage and convert stale leads.",
    metric: "Recover 15–30% lost pipeline",
    accentColor: "secondary",
  },
  {
    icon: Settings,
    title: "CRM & Pipeline Automation",
    audience: "For ops teams drowning in manual data entry",
    benefit: "Automated scoring, routing, and lifecycle management.",
    metric: "Cut admin time by 60%+",
    accentColor: "primary",
  },
  {
    icon: Users,
    title: "Campaign Strategy",
    audience: "For founders who want a strategic partner",
    benefit: "We co-build your outbound playbook and optimize weekly.",
    metric: "Faster iteration, higher close rates",
    accentColor: "secondary",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding relative ambient-glow">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What We Build For You
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            End-to-end AI systems that turn your leads into revenue.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col group relative overflow-hidden"
            >
              {/* Subtle top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${service.accentColor === 'primary' ? 'from-transparent via-primary/40 to-transparent' : 'from-transparent via-secondary/40 to-transparent'}`} />
              
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${service.accentColor === 'primary' ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/10 border border-secondary/20'}`}>
                <service.icon className={`w-5 h-5 ${service.accentColor === 'primary' ? 'text-primary' : 'text-secondary'}`} />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{service.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{service.audience}</p>
              <p className="text-sm text-foreground/80 mb-4 flex-1">{service.benefit}</p>
              <div className="pt-3 border-t border-border/20">
                <span className={`text-sm font-bold ${service.accentColor === 'primary' ? 'text-primary' : 'text-secondary'}`}>{service.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Button variant="hero" size="lg" className="btn-glow" asChild>
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
