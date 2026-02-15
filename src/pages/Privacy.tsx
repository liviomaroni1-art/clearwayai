import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Database, Users, Globe, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-1.5 text-xs">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-muted-foreground text-sm">
              Last updated: January 18, 2026
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert max-w-none space-y-5"
          >
            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Introduction
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Clearway AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI receptionist services. We are based in Freienbach, Switzerland, and serve businesses primarily in the United States.
              </p>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                Information We Collect
              </h2>
              <div className="space-y-3 text-xs text-muted-foreground">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">Call Data</h3>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Phone numbers of callers (with consent)</li>
                    <li>Call recordings (where legally permitted and disclosed)</li>
                    <li>Call transcriptions and summaries</li>
                    <li>Appointment booking information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">Business Information</h3>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Company name and contact details</li>
                    <li>Integration credentials (encrypted)</li>
                    <li>Calendar and CRM data (for scheduling)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Call Recording Consent
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                <strong className="text-foreground">Important:</strong> Call recording laws vary by U.S. state. Our AI receptionist announces that "calls may be recorded for quality assurance" at the start of each call to ensure compliance with both one-party and two-party consent states.
              </p>
              <div className="bg-primary/10 border border-primary/30 p-3 rounded-lg">
                <p className="text-[11px] text-primary">
                  <strong>Two-Party Consent States:</strong> California, Connecticut, Delaware, Florida, Illinois, Maryland, Massachusetts, Michigan, Montana, Nevada, New Hampshire, Oregon, Pennsylvania, Vermont, Washington, and Hawaii require all parties to consent.
                </p>
              </div>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Data Storage & Retention
              </h2>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p>
                  <strong className="text-foreground">Location:</strong> Data is processed through secure servers in the United States. Our company is headquartered in Switzerland, subject to Swiss data protection laws.
                </p>
                <p>
                  <strong className="text-foreground">Retention Period:</strong> By default, call recordings are retained for up to 90 days (longer retention may apply if agreed in your service contract). Transcriptions and summaries are retained for up to 1 year.
                </p>
                <p>
                  <strong className="text-foreground">Deletion:</strong> You may request deletion of your data at any time by contacting hello@clearwayai.co. We will delete or anonymize your personal data unless we are legally required or permitted to retain it.
                </p>
              </div>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3">Subprocessors</h2>
              <p className="text-xs text-muted-foreground mb-3">We use the following third-party services to provide our AI receptionist:</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li><strong className="text-foreground">Retell.ai</strong> — Voice AI processing</li>
                <li><strong className="text-foreground">n8n</strong> — Workflow automation</li>
                <li><strong className="text-foreground">Twilio</strong> — Telephony infrastructure</li>
                <li><strong className="text-foreground">Google Cloud</strong> — Speech-to-text processing</li>
                <li><strong className="text-foreground">OpenAI</strong> — Natural language understanding</li>
              </ul>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Contact Us
              </h2>
              <p className="text-xs text-muted-foreground mb-3">
                For privacy-related inquiries or data requests:
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p><strong className="text-foreground">Email:</strong> hello@clearwayai.co</p>
                <p><strong className="text-foreground">Address:</strong> Freienbach, Switzerland</p>
                <p><strong className="text-foreground">Response Time:</strong> Within 24-48 hours</p>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
