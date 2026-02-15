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

            {/* Subprocessors & Vendors */}
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
                  <p className="text-xs text-muted-foreground">Third-party services that may support Clearway AI</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p>We may use select third-party providers to help deliver specific functionality, such as:</p>
                <ul className="space-y-1.5 ml-4">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Telephony & messaging:</strong> providers like Twilio (call routing, SMS)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Voice AI:</strong> providers like Retell AI (voice/assistant capabilities)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Infrastructure:</strong> cloud providers such as AWS or Google Cloud (hosting and system operations)</span>
                  </li>
                </ul>
                <p className="text-[11px]">The specific vendors used can vary by plan, region, and configuration. An up-to-date list can be provided upon request.</p>
              </div>
            </motion.section>

            {/* Compliance Considerations */}
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
                  <h2 className="text-lg font-bold text-foreground mb-1">Compliance Considerations</h2>
                  <p className="text-xs text-muted-foreground">For regulated and healthcare use cases</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p>Requirements vary by industry and jurisdiction, and depend on how the product is configured and used.</p>
                <ul className="space-y-1.5 ml-4">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Contract options:</strong> certain agreements (such as a BAA) may be available on specific plans, subject to review and mutual agreement</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Configuration matters:</strong> workflows, routing, recording, and retention settings can be configured to support your internal requirements</span>
                  </li>
                </ul>
                <p className="text-[11px] text-muted-foreground/70 italic mt-2">Customers are responsible for evaluating whether Clearway AI is appropriate for their compliance needs and for using the product in accordance with applicable laws and policies.</p>
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
                  <p className="text-xs text-muted-foreground">Shared responsibility model</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                <ul className="space-y-1.5 ml-4">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Obtain required notices/consents (e.g., call recording where enabled)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Manage access credentials and team permissions</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Configure retention/recording preferences (where permitted)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Secure CRM/calendar integrations and connected accounts</span>
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
