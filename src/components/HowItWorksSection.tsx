import { motion } from "framer-motion";
import { Inbox, Bot, CalendarCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Inbox,
    step: "01",
    title: "Lead Comes In",
    description: "A new lead fills out your form, clicks your ad, or lands on your page. The AI agent picks it up instantly — no delays, no missed leads.",
  },
  {
    icon: Bot,
    step: "02",
    title: "AI Qualifies & Follows Up",
    description: "The agent reaches out via email and SMS, asks smart qualifying questions (budget, timeline, needs), and nurtures the lead until they're ready.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Call Booked & Logged",
    description: "Qualified leads get booked directly into your calendar. Every interaction is logged in your CRM — your sales team only talks to ready buyers.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-card/30 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            From new lead to booked sales call — fully automated, in three steps.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="minimal-card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-muted-foreground font-mono">{step.step}</span>
                <step.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
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
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
