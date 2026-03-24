import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck, Globe, Server, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const badges = [
  { icon: Lock, label: "AES-256 Encryption" },
  { icon: Shield, label: "HIPAA-aligned" },
  { icon: Globe, label: "GDPR-ready" },
  { icon: Server, label: "EU & US Hosting" },
  { icon: Eye, label: "Role-based Access" },
  { icon: FileCheck, label: "BAA Available" },
];

const points = [
  "All calls and data encrypted — TLS 1.3 in transit, AES-256 at rest.",
  "BAA available for healthcare and regulated practices.",
  "24/7 monitoring and reliability — your system never sleeps.",
  "You own your data — export or delete anytime.",
];

const SecurityComplianceSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs mb-5">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary font-medium">Secure & reliable</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Your Data, <span className="gradient-text">Protected</span>
              </h2>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your customers' data deserves enterprise-grade protection — even if you're a 3-person team. We handle security so you don't have to think about it.
              </p>

              <ul className="space-y-3 mb-8">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="gap-2 border-primary/30 text-primary hover:bg-primary/10" asChild>
                  <Link to="/security">
                    <FileText className="w-4 h-4" />
                    Security Overview
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="gap-2 border-border/50 hover:border-primary/30" asChild>
                  <Link to="https://funnel.clearwayai.co/">
                    Request DPA / BAA
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-2 gap-3"
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="glass-card p-4 rounded-xl text-center hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2.5">
                    <badge.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-foreground">{badge.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10 pt-6 border-t border-border/30"
          >
            <p className="text-xs text-muted-foreground">
              View our{" "}
              <Link to="/security#subprocessors" className="text-primary hover:underline">subprocessor list</Link>
              {" "}·{" "}
              <Link to="/security" className="text-primary hover:underline">full security documentation</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecurityComplianceSection;
