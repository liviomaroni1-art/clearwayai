import { motion } from "framer-motion";
import { Search, Megaphone, Bot, CalendarCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Audit & Strategy",
    description: "We analyze your offer, ideal customer, and positioning to build a campaign strategy designed to attract the right leads.",
  },
  {
    icon: Megaphone,
    step: "02",
    title: "Meta Ads & Funnel Build",
    description: "We create your ad campaigns, landing pages, and lead capture forms — optimized for conversions from day one.",
  },
  {
    icon: Bot,
    step: "03",
    title: "AI Follow-Up & Nurture",
    description: "Every new lead gets an instant response via chat, SMS, or email. Our AI qualifies and nurtures so nothing slips through.",
  },
  {
    icon: CalendarCheck,
    step: "04",
    title: "Leads or Calls Delivered",
    description: "Qualified leads land in your CRM, or calls get booked directly on your calendar. You choose the model that fits.",
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
            From Ad Spend to Booked Calls
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            A done-for-you system that can turn Meta traffic into qualified leads and appointments.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-4">
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
              Book a Strategy Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
