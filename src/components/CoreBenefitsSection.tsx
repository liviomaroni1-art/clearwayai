import { motion } from "framer-motion";
import { PhoneCall, CalendarCheck, UserCheck, Bell, Star, Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: PhoneCall,
    title: "Every inquiry answered in seconds",
    description: "Calls, web chats, and form submissions — answered day or night, so no lead slips through.",
  },
  {
    icon: CalendarCheck,
    title: "Your calendar fills itself",
    description: "Qualified jobs and appointments booked automatically — no phone tag, no back-and-forth.",
  },
  {
    icon: UserCheck,
    title: "Old customers come back",
    description: "Smart follow-ups bring back past customers with reactivation campaigns and nurture sequences.",
  },
  {
    icon: Bell,
    title: "Fewer no-shows and cancellations",
    description: "Automatic reminders via SMS and email keep your schedule full and your revenue predictable.",
  },
  {
    icon: Star,
    title: "5-star reputation grows on autopilot",
    description: "Post-job review requests and feedback loops build your online reputation without lifting a finger.",
  },
  {
    icon: Database,
    title: "Everything logged automatically",
    description: "Call summaries, lead details, and follow-up history — all synced to your CRM and tools.",
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
            What You Actually <span className="gradient-text">Get</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Outcomes, not features. Here's what changes when you install the growth system.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
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
              Book Your Free Growth Audit
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
