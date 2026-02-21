import { motion } from "framer-motion";
import { ArrowRight, Flame, PhoneIncoming, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const bullets = [
  {
    icon: PhoneIncoming,
    text: "Every emergency call answered — burst pipes, no-heat calls, power outages — day or night.",
  },
  {
    icon: Clock,
    text: "After-hours and on-the-truck calls captured automatically, so you never lose a $500 job to voicemail.",
  },
  {
    icon: Flame,
    text: "AI triages urgency, books jobs into your calendar, and texts you a summary — before you call back.",
  },
];

const HomeServicesCallout = () => {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6 md:p-10 lg:p-12 max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/8 rounded-full blur-3xl" />

          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block text-[11px] font-semibold tracking-widest uppercase text-primary mb-3"
            >
              Industry Spotlight
            </motion.span>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-foreground">
              Built for <span className="gradient-text">Home Services</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mb-6">
              Plumbing, HVAC & electrical companies lose thousands every month to missed calls. We fix that.
            </p>

            <div className="space-y-3 mb-8">
              {bullets.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <b.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                </motion.div>
              ))}
            </div>

            <Button variant="hero" size="default" className="btn-glow hover:scale-[1.03] transition-all text-sm" asChild>
              <Link to="/industries/home-services">
                See How It Works for Home Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeServicesCallout;
