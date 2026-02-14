import { motion } from "framer-motion";
import { Phone, Calendar, Target, Database, Clock, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Phone,
    title: "Stop losing callers to voicemail",
    description: "Every call answered in under 2 seconds — day, night, weekends, holidays.",
  },
  {
    icon: Calendar,
    title: "Your calendar fills itself",
    description: "AI books appointments into Google Calendar or Outlook. No back-and-forth.",
  },
  {
    icon: Target,
    title: "Only talk to qualified leads",
    description: "AI asks your screening questions and scores intent before you call back.",
  },
  {
    icon: Database,
    title: "Every call logged automatically",
    description: "Summaries, transcripts, and tags pushed to HubSpot, Salesforce, or Pipedrive.",
  },
  {
    icon: Clock,
    title: "Save 15+ hours per week",
    description: "No more voicemail callbacks, manual CRM entries, or scheduling ping-pong.",
  },
  {
    icon: Globe,
    title: "30+ languages, naturally",
    description: "Your AI speaks Spanish, French, German, and more — fluently and naturally.",
  },
];

const CoreBenefitsSection = () => {
  return (
    <section id="benefits" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
            What You <span className="gradient-text">Actually Get</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Less admin, more revenue, zero extra headcount.
          </p>
        </motion.div>

        {/* 2-column alternating layout instead of 3x2 grid */}
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {/* Row pairs */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {benefits.slice(0, 2).map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index} />
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {benefits.slice(2, 4).map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index + 2} />
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {benefits.slice(4, 6).map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} index={index + 4} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-14"
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

const BenefitCard = ({ benefit, index }: { benefit: typeof benefits[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
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
);

export default CoreBenefitsSection;
