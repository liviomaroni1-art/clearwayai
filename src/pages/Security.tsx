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
      
      <main className="pt-36 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Security & Compliance</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Your Data, <span className="gradient-text">Protected</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We take security seriously. Here's how we protect your business and your clients.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Data Handling */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Data Handling Overview</h2>
                  <p className="text-muted-foreground">What data we collect and where it goes</p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Our AI receptionist collects only the data necessary to perform its function:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">Call metadata:</strong> Caller ID, call duration, timestamp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">Conversation content:</strong> Transcripts and summaries for CRM logging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">Booking information:</strong> Appointment details synced to your calendar</span>
                  </li>
                </ul>
                <p>Data is processed in the US and stored on secure cloud infrastructure.</p>
              </div>
            </motion.section>

            {/* Call Recordings */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Call Recordings</h2>
                  <p className="text-muted-foreground">Your choice, your control</p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Call recording is <strong className="text-foreground">optional</strong> and can be enabled or disabled per your preference:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">Consent:</strong> AI announces recording when enabled (configurable message)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">Retention:</strong> Recordings retained for 90 days by default (configurable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">Access:</strong> Only your authorized team members can access recordings</span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Encryption */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Encryption & Access Control</h2>
                  <p className="text-muted-foreground">Industry-standard protection</p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">In transit:</strong> TLS 1.3 encryption for all API calls and data transfers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">At rest:</strong> AES-256 encryption for stored data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">Access control:</strong> Role-based permissions, audit logging</span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Subprocessors */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Subprocessors & Vendors</h2>
                  <p className="text-muted-foreground">Trusted partners we work with</p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>We use carefully vetted vendors for specific functions:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">Twilio:</strong> Telephony infrastructure (call routing, SMS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">Retell.ai:</strong> AI voice technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span><strong className="text-foreground">Cloud providers:</strong> AWS/GCP for secure hosting</span>
                  </li>
                </ul>
                <p className="text-sm">Full subprocessor list available upon request during onboarding.</p>
              </div>
            </motion.section>

            {/* Compliance */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl border-primary/30"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Key className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Compliance Positioning</h2>
                  <p className="text-muted-foreground">Healthcare and regulated industries</p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <p className="font-medium text-foreground mb-2">HIPAA / BAA</p>
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
              className="glass-card p-8 rounded-2xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Customer Responsibilities</h2>
                  <p className="text-muted-foreground">Shared security model</p>
                </div>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>Security is a shared responsibility. Customers are responsible for:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                    <span>Obtaining appropriate consent for call recording (if enabled)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                    <span>Managing access credentials and team permissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                    <span>Configuring appropriate data retention policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
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
              className="glass-card p-8 rounded-2xl text-center"
            >
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Security Questions?</h2>
              <p className="text-muted-foreground mb-4">
                For security inquiries, vulnerability reports, or compliance documentation requests:
              </p>
              <a 
                href="mailto:security@clearwayai.co"
                className="text-primary hover:text-primary/80 font-medium text-lg"
              >
                security@clearwayai.co
              </a>
              <div className="mt-6">
                <Button variant="hero" size="lg" asChild>
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
