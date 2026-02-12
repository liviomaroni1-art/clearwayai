import { motion } from "framer-motion";
import { Phone, Calendar, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "A client calls you",
    description: "Your AI receptionist picks up in under 2 seconds—day or night. No hold music, no voicemail, no missed opportunity.",
  },
  {
    icon: Calendar,
    step: "02",
    title: "The AI books them in",
    description: "It answers their questions, qualifies the lead, and books the appointment directly into your calendar. No back-and-forth.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "You get a full summary",
    description: "Call summary, transcript, and CRM entry—ready before you even call back. Your schedule fills itself.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-6">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Done-for-you setup</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            Here's What Happens <span className="gradient-text">When Someone Calls</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            From ring to booked appointment—without you lifting a finger.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-card p-5 md:p-8 text-center hover:border-primary/30 transition-colors group"
            >
              <div className="relative inline-block mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                </div>
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 text-xs font-bold text-primary-foreground bg-primary rounded-full w-5 h-5 md:w-7 md:h-7 flex items-center justify-center">
                  {step.step}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:block max-w-4xl mx-auto mt-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground mb-6">
            💡 Most clients go live ~72 hours after onboarding is completed.
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
