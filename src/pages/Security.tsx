import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Server, Users, Mail, Database, Eye, Key, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Security = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs mb-4">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-medium">Security & Compliance</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Your Data, <span className="gradient-text">Protected</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              We take security seriously. Here's how we protect your business and your clients.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Data Handling */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5 rounded-xl"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Data Handling Overview</h2>
                  <p className="text-xs text-muted-foreground">What data we collect and where it goes</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p>Our AI receptionist collects only the data necessary to perform its function:</p>
                <ul className="space-y-1.5 ml-4">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Call metadata:</strong> Caller ID, call duration, timestamp</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Conversation content:</strong> Transcripts and summaries for CRM logging</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Booking information:</strong> Appointment details synced to your calendar</span>
                  </li>
                </ul>
                <p>Data is processed in the US and stored on secure cloud infrastructure.</p>
              </div>
            </motion.section>

            {/* Call Summaries */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5 rounded-xl"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Call Summaries</h2>
                  <p className="text-xs text-muted-foreground">Actionable insights from every call</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p>After every call, you receive a <strong className="text-foreground">detailed summary</strong> including key details, action items, and caller intent:</p>
                <ul className="space-y-1.5 ml-4">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Instant delivery:</strong> Summaries sent to your email or CRM within seconds</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Retention:</strong> Summaries retained for 1 year by default (configurable)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Access:</strong> Only your authorized team members can view summaries</span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Security & Access Controls */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5 rounded-xl"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Security & Access Controls</h2>
                  <p className="text-xs text-muted-foreground">Built to help you manage access and protect sensitive information</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <ul className="space-y-1.5 ml-4">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Secure connections:</strong> Data is transmitted over encrypted HTTPS connections</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Storage protections:</strong> Data storage protections are applied based on your plan and configuration</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Access controls:</strong> Manage user access with configurable permissions</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Activity visibility:</strong> Administrative activity history may be available to support oversight</span>
                  </li>
                </ul>
                <p className="text-[11px] text-muted-foreground/70 italic mt-2">Note: Available security features can vary by plan, configuration, and deployment.</p>
              </div>
            </motion.section>

            {/* Subprocessors */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5 rounded-xl"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Server className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Subprocessors & Vendors</h2>
                  <p className="text-xs text-muted-foreground">Trusted partners we work with</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p>We use carefully vetted vendors for specific functions:</p>
                <ul className="space-y-1.5 ml-4">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Twilio:</strong> Telephony infrastructure (call routing, SMS)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Retell.ai:</strong> AI voice technology</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Cloud providers:</strong> AWS/GCP for secure hosting</span>
                  </li>
                </ul>
                <p className="text-[11px]">Full subprocessor list available upon request during onboarding.</p>
              </div>
            </motion.section>

            {/* Compliance */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5 rounded-xl border-primary/30"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Key className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Compliance Positioning</h2>
                  <p className="text-xs text-muted-foreground">Healthcare and regulated industries</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <p className="font-medium text-foreground mb-1">HIPAA / BAA</p>
                  <p>Business Associate Agreements (BAA) are available on Enterprise plans. HIPAA-aligned workflows can be configured during onboarding based on your specific requirements.</p>
                </div>
                <p>For other compliance requirements (state-specific regulations, industry standards), we review your needs during the onboarding process and configure accordingly.</p>
              </div>
            </motion.section>

            {/* Customer Responsibilities */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5 rounded-xl"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-1">Customer Responsibilities</h2>
                  <p className="text-xs text-muted-foreground">Shared security model</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p>Security is a shared responsibility. Customers are responsible for:</p>
                <ul className="space-y-1.5 ml-4">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Obtaining appropriate consent for call recording (if enabled)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Managing access credentials and team permissions</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Configuring appropriate data retention policies</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Ensuring CRM/calendar integrations are properly secured</span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Contact */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5 rounded-xl text-center"
            >
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h2 className="text-lg font-bold text-foreground mb-1">Security Questions?</h2>
              <p className="text-xs text-muted-foreground mb-3">
                For security inquiries, vulnerability reports, or compliance documentation requests:
              </p>
              <a 
                href="mailto:hello@clearwayai.co"
                className="text-primary hover:text-primary/80 font-medium text-sm"
              >
                hello@clearwayai.co
              </a>
              <div className="mt-4">
                <Button variant="hero" size="default" asChild>
                  <Link to="/contact">Book a Demo</Link>
                </Button>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Security;
