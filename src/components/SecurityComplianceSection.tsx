import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const SecurityComplianceSection = () => {
  const points = [
    {
      icon: Lock,
      title: "End-to-end encryption",
      description: "TLS 1.3 in transit, AES-256 at rest. Your data never touches unencrypted channels.",
    },
    {
      icon: Eye,
      title: "Strict access controls",
      description: "Role-based permissions ensure only authorized team members see sensitive data.",
    },
    {
      icon: FileCheck,
      title: "HIPAA-aligned workflows",
      description: "BAA available for healthcare practices. Designed for sensitive industries like medical and legal.",
    },
    {
      icon: Shield,
      title: "Transparent data handling",
      description: "Call recordings optional and configurable. You own your data—always.",
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Built for regulated industries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            Security & <span className="gradient-text">Compliance</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Your patients' and clients' data deserves enterprise-grade protection—even if you're a small practice.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {points.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-5 md:p-6 rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-foreground">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecurityComplianceSection;
