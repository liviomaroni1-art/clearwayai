import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, TrendingUp, Clock, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    industry: "Dental Practice",
    location: "Austin, TX",
    role: "Practice Owner",
    quote: "We stopped losing new patients to voicemail. The AI handles after-hours calls we'd never get before.",
    metrics: [
      { label: "Missed calls", before: "42%", after: "3%", icon: TrendingDown, positive: true },
      { label: "Monthly bookings", before: "—", after: "+38%", icon: TrendingUp, positive: true },
      { label: "Staff hours saved", before: "—", after: "15h/week", icon: Clock, positive: true },
    ],
  },
  {
    industry: "Immigration Law Firm",
    location: "Miami, FL",
    role: "Managing Partner",
    quote: "Our intake process runs itself now. After-hours leads that used to go to competitors are ours.",
    metrics: [
      { label: "After-hours leads", before: "—", after: "+62%", icon: TrendingUp, positive: true },
      { label: "Response time", before: "4h avg", after: "<2s", icon: Clock, positive: true },
      { label: "Intake automated", before: "—", after: "80%", icon: Phone, positive: true },
    ],
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-16 md:py-24">
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
            See what happens when every call gets answered.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.industry}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left: Quote + context */}
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {study.industry}
                    </span>
                    <span className="text-xs text-muted-foreground">{study.location}</span>
                  </div>
                  
                  <blockquote className="text-base md:text-lg text-foreground leading-relaxed mb-4 font-medium">
                    "{study.quote}"
                  </blockquote>
                  
                  <p className="text-sm text-muted-foreground">
                    — {study.role}, {study.industry}
                  </p>
                </div>

                {/* Right: Metrics */}
                <div className="bg-muted/20 p-6 md:p-10 border-t md:border-t-0 md:border-l border-border/30">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-5">Key Results</p>
                  <div className="space-y-5">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <metric.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-sm text-muted-foreground">{metric.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {metric.before !== "—" && (
                            <>
                              <span className="text-sm text-muted-foreground/60 line-through">{metric.before}</span>
                              <span className="text-muted-foreground/40">→</span>
                            </>
                          )}
                          <span className="text-sm font-bold text-primary">{metric.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              See How It Works for You
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
