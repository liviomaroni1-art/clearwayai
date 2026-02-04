import { motion } from "framer-motion";
import { Phone, Calendar, Target, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CoreBenefitsSection = () => {
  const benefits = [
    {
      icon: Phone,
      title: "24/7 Call Answering",
      outcome: "Every call answered in under 2 seconds (target), even at 3am.",
      detail: "Our AI picks up instantly, greets callers professionally, and handles inquiries without keeping anyone waiting."
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      outcome: "Appointments booked directly into your calendar, no back-and-forth.",
      detail: "Syncs with Google Calendar or Outlook. Sends confirmations and reminders automatically."
    },
    {
      icon: Target,
      title: "Lead Qualification",
      outcome: "Know who's serious before you ever call back.",
      detail: "AI asks qualifying questions, scores leads, and routes high-priority callers to the right person."
    },
    {
      icon: Database,
      title: "CRM Logging",
      outcome: "Every call captured—no manual entry required.",
      detail: "Auto-logs to HubSpot, Salesforce, or Pipedrive with call summaries, transcripts, and tags."
    }
  ];

  return (
    <section id="benefits" className="py-12 md:py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            One AI. <span className="gradient-text">Four Critical Jobs.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Answer calls, book appointments, qualify leads, and log everything—automatically.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto mb-8 md:mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-5 md:p-8 rounded-2xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-sm md:text-base text-foreground font-medium mb-1 md:mb-2">{benefit.outcome}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{benefit.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

export default CoreBenefitsSection;
