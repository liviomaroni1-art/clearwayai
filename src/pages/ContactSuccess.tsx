import { motion } from "framer-motion";
import { Clock, Shield, Sparkles, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactSuccess = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
            >
              <Shield className="w-8 h-8 text-primary" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold mb-3 text-foreground"
            >
              Your Application Is <span className="gradient-text">Under Review</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto"
            >
              Thank you for your interest in Clearway AI. We carefully review every application
              to ensure the best experience for our clients.
            </motion.p>

            {/* Review process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-5 rounded-2xl mb-8 text-left"
            >
              <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                What happens now?
              </h2>
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "Application review",
                    description: "Our team reviews your business profile and call flow requirements within 24–48 hours.",
                  },
                  {
                    step: "2",
                    title: "Acceptance notification",
                    description: "Once approved, you'll receive an email with access to your personalized client portal.",
                  },
                  {
                    step: "3",
                    title: "Onboarding & go-live",
                    description: "We'll schedule your setup call and have your AI receptionist live within ~72 hours.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-[11px] font-bold text-primary">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-xs">{item.title}</h3>
                      <p className="text-[11px] text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Why we review */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-4 rounded-xl mb-8 text-left"
            >
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-foreground font-medium mb-1">Why do we review applications?</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    We work with a select number of businesses at a time to maintain the quality and
                    personalization our clients expect. This ensures every setup is tailored to your
                    specific workflows and industry needs.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
            >
              <Button variant="hero" size="default" asChild>
                <Link to="/">
                  Back to Clearway AI
                </Link>
              </Button>
            </motion.div>

            {/* Contact fallback */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-[11px] text-muted-foreground flex items-center justify-center gap-1.5"
            >
              <Mail className="w-3 h-3" />
              Questions? Reach us at{" "}
              <a href="mailto:hello@clearwayai.co" className="text-primary hover:underline">
                hello@clearwayai.co
              </a>
            </motion.p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactSuccess;
