import { motion } from "framer-motion";
import { TrendingUp, CalendarCheck, Clock, UserCheck } from "lucide-react";

const outcomes = [
  {
    icon: TrendingUp,
    title: "More Consistent Leads",
    description: "A system designed to deliver a steady flow of qualified leads from Meta ads — so you're not relying on referrals or cold outreach alone.",
  },
  {
    icon: CalendarCheck,
    title: "Fewer No-Shows",
    description: "Automated reminders and pre-call nurture sequences can help reduce no-shows and keep leads engaged until the meeting happens.",
  },
  {
    icon: Clock,
    title: "Less Manual Follow-Up",
    description: "AI handles every touchpoint — from first response to final booking — without your team chasing leads by hand.",
  },
  {
    icon: UserCheck,
    title: "Better Follow-Up on Every Lead",
    description: "No lead slips through the cracks. Every inquiry gets an instant, personalized response — even nights and weekends.",
  },
];

const OutcomesSection = () => {
  return (
    <section id="outcomes" className="section-padding bg-card/30 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What's Possible
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Results depend on your offer, market, and budget — but here's what our system is designed to deliver.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="minimal-card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <outcome.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{outcome.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{outcome.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;
