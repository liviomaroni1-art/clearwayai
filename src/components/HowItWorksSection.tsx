import { motion } from "framer-motion";
import { Phone, MailCheck, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Phone,
    step: "01",
    title: "Lead Capture & Qualification",
    description: "AI answers every call and web inquiry in seconds — 24/7. Qualifies leads with smart questions and books directly into your calendar or creates a detailed lead summary.",
    highlights: ["24/7 call & chat answering", "Smart lead qualification", "Instant calendar booking"],
  },
  {
    icon: MailCheck,
    step: "02",
    title: "Automated Follow-Up & Reactivation",
    description: "Missed-call and unbooked-estimate follow-ups via SMS and email. Reactivation campaigns for inactive customers who haven't visited in 6–12 months. Turns 'maybe later' into actual bookings.",
    highlights: ["Missed-call follow-up", "Old customer reactivation", "Nurture sequences"],
  },
  {
    icon: Star,
    step: "03",
    title: "Retention, Reminders & Reviews",
    description: "Automatic appointment reminders cut no-shows. Post-job follow-ups request reviews and gather feedback. Catch unhappy clients early, turn happy ones into 5-star reviews.",
    highlights: ["SMS/email reminders", "Review requests", "Feedback loops"],
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
            The 3-Pillar <span className="gradient-text">Growth System</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            More than call answering — a complete system to capture, convert, and keep customers.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
            
            <div className="space-y-8 md:space-y-12">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex gap-5 md:gap-8 items-start"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-card border border-primary/20 flex items-center justify-center relative z-10">
                      <pillar.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 z-20 text-[11px] font-bold text-primary-foreground bg-primary rounded-full w-6 h-6 flex items-center justify-center ring-2 ring-background">
                      {index + 1}
                    </span>
                  </div>

                  <div className="pt-1 md:pt-3">
                    <h3 className="text-lg md:text-xl font-semibold mb-1.5 text-foreground">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-3">
                      {pillar.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.highlights.map((h) => (
                        <span key={h} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-14"
        >
          <p className="text-sm text-muted-foreground mb-5">
            Most clients go live ~72 hours after onboarding.
          </p>
          <Button variant="hero" size="lg" className="btn-glow" asChild>
            <Link to="/contact">
              Book a Free Growth Audit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
