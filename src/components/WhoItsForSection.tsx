import { motion } from "framer-motion";
import { Building2, Briefcase, Users } from "lucide-react";

const audiences = [
  {
    icon: Building2,
    title: "Agencies",
    description: "You run ads and funnels for clients but lose leads to slow follow-up. Our AI agents handle instant qualification and booking — so your clients see results faster.",
  },
  {
    icon: Briefcase,
    title: "B2B Service Companies",
    description: "You generate leads through forms, ads, or referrals but your team can't follow up fast enough. The AI agent ensures every lead gets contacted, qualified, and booked.",
  },
  {
    icon: Users,
    title: "Coaches & Consultants",
    description: "You're spending time chasing leads instead of coaching. Our agents qualify inbound interest and fill your calendar with people who are ready to buy.",
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
            Built for businesses that already generate leads — and want more of them to convert into real sales conversations.
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
