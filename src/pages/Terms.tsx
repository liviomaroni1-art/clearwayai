import { motion } from "framer-motion";
import { ArrowLeft, FileText, Scale, AlertTriangle, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Terms of Service — Clearway AI"
        description="Read the terms of service for Clearway AI's AI receptionist platform. Clear, fair terms for businesses."
        canonical="https://clearwayai.co/terms"
      />
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
              <FileText className="w-6 h-6 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">Terms of Service</h1>
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
                <Scale className="w-4 h-4 text-primary" />
                Agreement to Terms
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                By subscribing to Clearway AI's services, you agree to these Terms of Service. Clearway AI is operated from Freienbach, Switzerland, and provides AI receptionist services primarily to businesses in the United States.
              </p>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Pricing & Payment Terms
              </h2>
              <div className="space-y-3 text-xs text-muted-foreground">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">Subscription Plans</h3>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li><strong>Solo Launch:</strong> $1,500/month (1,000 minutes included)</li>
                    <li><strong>Pro Practice:</strong> $2,500/month (2,000 minutes included)</li>
                    <li><strong>Team Pro:</strong> $3,500/month (3,000 minutes included)</li>
                    <li><strong>Concierge AI:</strong> $5,000+/month (8,000+ minutes, custom)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">Setup Fees</h3>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Solo Launch: $1,000 one-time setup</li>
                    <li>Pro Practice: $1,500 one-time setup</li>
                    <li>Team Pro: $2,000 one-time setup</li>
                    <li>Concierge AI: $3,000 one-time setup</li>
                    <li>36-month commitment: Setup fees waived ($0)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">Billing</h3>
                  <p>All subscriptions are billed monthly in advance. Payment is due within 7 days of invoice date. We accept major credit cards and ACH transfers.</p>
                </div>
              </div>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Service Level Agreement
              </h2>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p>
                  <strong className="text-foreground">Uptime Target:</strong> We target 99.9% uptime for our AI receptionist service, excluding scheduled maintenance windows. Service credits may be issued at our discretion for extended outages.
                </p>
                <p>
                  <strong className="text-foreground">Implementation:</strong> New accounts are typically live ~72 hours after onboarding is completed. Onboarding is considered complete once the client has submitted onboarding answers and provided required access (phone forwarding, calendar connection, CRM access if applicable). Timelines may vary based on integration complexity.
                </p>
                <p>
                  <strong className="text-foreground">Support Hours:</strong> Email support available 24/7. Live support available Monday-Friday, 6 AM - 6 PM Pacific Time (to accommodate US business hours from Switzerland).
                </p>
                <p>
                  <strong className="text-foreground">Response Times:</strong>
                </p>
                <ul className="list-disc list-inside space-y-0.5 ml-4">
                  <li>Critical issues (service down): 1 hour</li>
                  <li>High priority: 4 business hours</li>
                  <li>Normal requests: 24 business hours</li>
                </ul>
              </div>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-primary" />
                Limitations of Liability
              </h2>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p>
                  Clearway AI provides AI-powered call handling but is not a substitute for human judgment in critical situations. Our AI will attempt to route urgent matters appropriately but cannot guarantee perfect handling of all scenarios.
                </p>
                <p>
                  <strong className="text-foreground">Maximum Liability:</strong> Our total liability is limited to the fees paid in the 3 months preceding any claim.
                </p>
                <p>
                  <strong className="text-foreground">Not Responsible For:</strong>
                </p>
                <ul className="list-disc list-inside space-y-0.5 ml-4">
                  <li>Third-party integration failures (CRM, calendar systems)</li>
                  <li>Phone carrier outages</li>
                  <li>Misinterpretation of ambiguous caller requests</li>
                  <li>Business decisions made based on AI summaries</li>
                </ul>
              </div>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3">Cancellation Policy</h2>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p>
                  <strong className="text-foreground">Monthly Plans:</strong> Cancellation requires 3 months written notice. No refunds for partial months.
                </p>
                <p>
                  <strong className="text-foreground">Annual/Multi-Year Commitments:</strong> Early termination requires payment of remaining contract balance or 50% of remaining value, whichever is less.
                </p>
                <p>
                  <strong className="text-foreground">Data Export:</strong> Upon cancellation, you may request export of your call recordings and transcriptions within 30 days.
                </p>
              </div>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3">Governing Law</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                These terms are governed by the laws of Switzerland. For U.S. clients, disputes may be resolved through binding arbitration in the State of Delaware under AAA Commercial Arbitration Rules.
              </p>
            </section>

            <section className="glass-card p-5 rounded-xl">
              <h2 className="text-lg font-bold text-foreground mb-3">Contact</h2>
              <p className="text-xs text-muted-foreground mb-3">
                For questions about these terms:
              </p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p><strong className="text-foreground">Email:</strong> hello@clearwayai.co</p>
                <p><strong className="text-foreground">Address:</strong> Clearway AI, Freienbach, Switzerland</p>
              </div>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
