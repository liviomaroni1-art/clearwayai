import { motion } from "framer-motion";
import { Phone, Calendar, Target, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CoreBenefitsSection = () => {
  const benefits = [
    {
      icon: Phone,
      title: "Every Call Answered Instantly",
      description: "AI picks up in under 2 seconds—even at 3 AM. No caller waits, no lead lost."
    },
    {
      icon: Calendar,
      title: "Appointments Booked Automatically",
      description: "Syncs with Google Calendar or Outlook. Sends confirmations and reminders—zero back-and-forth."
    },
    {
      icon: Target,
      title: "Leads Qualified Before You Call Back",
      description: "AI asks your screening questions, scores intent, and routes high-priority callers to the right person."
    },
    {
      icon: Database,
      title: "Every Call Logged in Your CRM",
      description: "Auto-logs to HubSpot, Salesforce, or Pipedrive with summaries, transcripts, and tags. No manual entry."
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
            Answer. Book. Qualify. Log. All on autopilot.
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
                  <p className="text-sm md:text-base text-muted-foreground">{benefit.description}</p>
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
              Book Your Free Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreBenefitsSection;
