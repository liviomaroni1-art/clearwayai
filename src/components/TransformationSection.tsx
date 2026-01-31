import { motion } from "framer-motion";
import { ArrowRight, X, Check, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TransformationSection = () => {
  const before = [
    "Voicemail piling up",
    "Leads slipping through the cracks",
    "Admin overload from callbacks",
    "No visibility into missed opportunities"
  ];

  const after = [
    "Instant answer, every time",
    "Calendar booked automatically",
    "Leads qualified before you talk",
    "Every call logged in your CRM"
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            The <span className="gradient-text">Transformation</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From chaos to clarity—here's what changes with Clearway AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border-destructive/30"
          >
            <h3 className="text-2xl font-bold text-destructive mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6" />
              Before
            </h3>
            <ul className="space-y-4">
              {before.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border-primary/30 bg-primary/5"
          >
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <Check className="w-6 h-6" />
              After Clearway AI
            </h3>
            <ul className="space-y-4">
              {after.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="hero" size="lg" className="btn-glow" asChild>
            <a href="#calculator">
              Calculate My ROI — Free
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            No credit card • 5-minute consultation
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformationSection;
