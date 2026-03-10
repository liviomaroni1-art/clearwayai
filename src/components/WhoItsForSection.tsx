import { motion } from "framer-motion";
import { Building2, Briefcase, Users } from "lucide-react";

const audiences = [
  {
    icon: Building2,
    title: "Agencies & Marketers",
    description: "You run campaigns but lose leads to slow follow-up. We plug into your flow with AI nurture and booking so your clients see real results.",
  },
  {
    icon: Briefcase,
    title: "B2B Service Companies",
    description: "You need a predictable pipeline of qualified leads without hiring more SDRs. We build the ads, funnels, and follow-up system for you.",
  },
  {
    icon: Users,
    title: "Coaches & Consultants",
    description: "You have a proven offer but spend too much time chasing leads. We fill your calendar with people who are ready to buy.",
  },
];

const WhoItsForSection = () => {
  return (
    <section id="who-its-for" className="section-padding border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Who It's For
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Built for businesses that already have an offer — and want more predictable lead flow and bookings.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-4">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="minimal-card p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <audience.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{audience.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{audience.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
