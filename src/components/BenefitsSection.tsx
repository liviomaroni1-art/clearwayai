import { motion } from "framer-motion";
import { Zap, Filter, TrendingUp, Eye } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Done for you, start to finish",
    description:
      "We handle the ads, the funnel, and the follow-up. You don't touch a thing — just receive your leads or booked calls.",
  },
  {
    icon: Filter,
    title: "Only qualified leads reach you",
    description:
      "Every lead has shown real interest and filled out our form. No time wasted on people who aren't ready to buy.",
  },
  {
    icon: TrendingUp,
    title: "Consistent, predictable pipeline",
    description:
      "Stop relying on referrals and cold outreach. Get a steady stream of new business inquiries every single week.",
  },
  {
    icon: Eye,
    title: "Fully transparent, no surprises",
    description:
      "You see exactly where every lead came from and what it cost. No black boxes, no guesswork — just clear results.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="section-calm relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Stop chasing leads.
              <br />
              <span className="gradient-text">Start closing them.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Most business owners waste hours on cold outreach and follow-ups
              that go nowhere. Clearway AI removes all of that — so you can
              spend your time on what actually makes money: closing deals.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
