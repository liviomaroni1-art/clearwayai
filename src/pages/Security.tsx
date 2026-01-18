import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Server, Eye, CheckCircle2, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All voice data and call recordings are encrypted in transit (TLS 1.3) and at rest (AES-256)."
    },
    {
      icon: Server,
      title: "SOC 2 Type II Infrastructure",
      description: "Our infrastructure partners (Retell.ai, Google Cloud) maintain SOC 2 Type II compliance."
    },
    {
      icon: Eye,
      title: "Access Controls",
      description: "Role-based access with MFA required. Only authorized personnel can access customer data."
    },
    {
      icon: Globe,
      title: "Swiss Data Standards",
      description: "Headquartered in Switzerland with strict data protection aligned with FADP and GDPR principles."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Enterprise-Grade Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Security & <span className="gradient-text">Compliance</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your calls contain sensitive business information. We treat security as a first-class priority, not an afterthought.
            </p>
          </motion.div>

          {/* Security Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Detailed Sections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <section className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Call Recording Security</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Caller Consent</p>
                    <p className="text-muted-foreground text-sm">AI announces recording at call start for two-party consent compliance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">90-Day Retention</p>
                    <p className="text-muted-foreground text-sm">Recordings auto-delete after 90 days (configurable per agreement)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">On-Demand Deletion</p>
                    <p className="text-muted-foreground text-sm">Request deletion of specific recordings at any time</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">HIPAA Considerations</h2>
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl mb-4">
                <p className="text-amber-400 text-sm">
                  <strong>Note:</strong> While we implement security best practices, our standard service is not HIPAA-certified. Healthcare clients requiring full HIPAA compliance should inquire about our Enterprise Concierge plan with BAA.
                </p>
              </div>
              <p className="text-muted-foreground">
                Enterprise plans can include Business Associate Agreements (BAA), dedicated infrastructure, and additional audit logging for healthcare compliance requirements.
              </p>
            </section>

            <section className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Data Processing & Subprocessors</h2>
              <p className="text-muted-foreground mb-4">Our AI receptionist relies on trusted infrastructure partners:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 text-foreground">Provider</th>
                      <th className="text-left py-3 text-foreground">Purpose</th>
                      <th className="text-left py-3 text-foreground">Location</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-3">Retell.ai</td>
                      <td className="py-3">Voice AI Processing</td>
                      <td className="py-3">USA</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3">Twilio</td>
                      <td className="py-3">Telephony</td>
                      <td className="py-3">USA</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3">Google Cloud</td>
                      <td className="py-3">Speech Processing</td>
                      <td className="py-3">USA</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3">OpenAI</td>
                      <td className="py-3">NLU</td>
                      <td className="py-3">USA</td>
                    </tr>
                    <tr>
                      <td className="py-3">n8n Cloud</td>
                      <td className="py-3">Workflow Automation</td>
                      <td className="py-3">EU</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Incident Response</h2>
              <p className="text-muted-foreground mb-4">
                In the unlikely event of a security incident affecting your data:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Notification within 72 hours of discovery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Detailed incident report with scope and remediation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct communication from our security team</span>
                </li>
              </ul>
            </section>

            {/* Contact CTA */}
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Have security questions or need a security questionnaire completed?
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Security;
