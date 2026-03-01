import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    industry: "HVAC Company",
    location: "Phoenix, AZ",
    role: "Owner",
    quote: "We were losing 30–40% of our after-hours calls to voicemail. Now every call gets answered, follow-ups go out automatically, and our repeat business has noticeably increased.",
    results: ["More booked jobs from existing inquiries", "Fewer missed calls", "Steady increase in 5-star reviews"],
  },
  {
    industry: "Plumbing Company",
    location: "Dallas, TX",
    role: "Operations Manager",
    quote: "The reactivation campaigns surprised us. We had hundreds of old customers who just needed a nudge. Within weeks, we were booking jobs from people we hadn't heard from in over a year.",
    results: ["Old customers reactivated", "Calendar consistently fuller", "Less time on admin"],
  },
  {
    industry: "Dental Practice",
    location: "Atlanta, GA",
    role: "Practice Manager",
    quote: "Our front desk was drowning in calls during peak hours. Now the AI handles overflow and after-hours, books appointments, and sends reminders. No-shows dropped significantly.",
    results: ["Overflow calls captured", "Fewer no-shows", "More consistent patient flow"],
  },
];

const CaseStudiesSection = () => {
  return (
    <section id="proof" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Real Results From <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Here's what happens when service businesses install the growth system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.industry}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-5 md:p-6 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {t.industry}
                </span>
                <span className="text-xs text-muted-foreground">{t.location}</span>
              </div>
              
              <blockquote className="text-sm text-foreground leading-relaxed mb-4 italic">
                "{t.quote}"
              </blockquote>
              
              <p className="text-xs text-muted-foreground mb-3">— {t.role}</p>
              
              <div className="border-t border-border/50 pt-3 space-y-1.5">
                {t.results.map((r) => (
                  <div key={r} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {r}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 md:mt-14"
        >
          <Button variant="hero" size="lg" className="btn-glow" asChild>
            <Link to="/contact">
              See What We Can Do For You
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
