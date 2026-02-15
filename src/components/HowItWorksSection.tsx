import { motion } from "framer-motion";
import { Phone, Calendar, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "Client calls you",
    description: "AI picks up in under 2 seconds — day or night. No hold music, no voicemail.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "AI books them in",
    description: "Answers questions, qualifies the lead, books directly into your calendar.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "You get a full summary",
    description: "Call summary, transcript, and CRM entry — ready before you call back.",
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
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            From ring to booked appointment — without you lifting a finger.
          </p>
        </motion.div>

        {/* Stepper layout */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line (desktop) */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
            
            <div className="space-y-8 md:space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex gap-5 md:gap-8 items-start"
                >
                  {/* Step number & icon */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-md shadow-primary/30">
                      {index + 1}
                    </div>
                    <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl bg-card border border-primary/20 flex items-center justify-center">
                      <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1 md:pt-3">
                    <h3 className="text-lg md:text-xl font-semibold mb-1.5 text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                      {step.description}
                    </p>
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
              Book Your Free Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
