import { motion } from "framer-motion";
import { Phone, Calendar, Target, Database, Clock, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CoreBenefitsSection = () => {
  const benefits = [
    {
      icon: Phone,
      title: "Stop losing callers to voicemail",
      description: "Every call answered in under 2 seconds—day, night, weekends, holidays.",
    },
    {
      icon: Calendar,
      title: "Your calendar fills itself",
      description: "AI books appointments into Google Calendar or Outlook. No back-and-forth emails.",
    },
    {
      icon: Target,
      title: "Only talk to qualified leads",
      description: "AI asks your screening questions and scores intent before you ever call back.",
    },
    {
      icon: Database,
      title: "Every call logged automatically",
      description: "Summaries, transcripts, and tags pushed to HubSpot, Salesforce, or Pipedrive.",
    },
    {
      icon: Clock,
      title: "Save 15+ hours per week on admin",
      description: "No more voicemail callbacks, manual CRM entries, or scheduling ping-pong.",
    },
    {
      icon: Globe,
      title: "Serve clients in 30+ languages",
      description: "Your AI speaks Spanish, French, German, and more—naturally and fluently.",
    },
  ];

  return (
    <section id="benefits" className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            What You <span className="gradient-text">Actually Get</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Less stress, more revenue, zero extra headcount.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-8 md:mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-5 md:p-6 rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
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
