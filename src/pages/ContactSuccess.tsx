import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactSuccess = () => {
  const demoNumber = "+1 (888) 778-3091";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <CheckCircle2 className="w-7 h-7 text-primary" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold mb-3 text-foreground"
            >
              You're All Set! 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto"
            >
              We've received your request and will get back to you within{" "}
              <span className="text-foreground font-semibold">24–48 hours</span> with
              a personalized call flow review.
            </motion.p>

            {/* What happens next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-5 rounded-2xl mb-8 text-left"
            >
              <h2 className="text-sm font-semibold text-foreground mb-4">What happens next?</h2>
              <div className="space-y-3">
                {[
                  {
                    step: "1",
                    title: "We review your call flow",
                    description: "Our team maps your current setup and identifies missed-call opportunities.",
                  },
                  {
                    step: "2",
                    title: "You get a personalized demo",
                    description: "We'll show you exactly how the AI receptionist handles calls for your industry.",
                  },
                  {
                    step: "3",
                    title: "Go live in ~72 hours",
                    description: "Once you're ready, we set up your AI receptionist — no technical work on your end.",
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

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
            >
              <Button variant="hero" size="default" asChild>
                <Link to="/">
                  Explore Clearway AI
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <a
                href={`tel:${demoNumber.replace(/\s/g, "")}`}
                className="inline-flex items-center justify-center gap-2 border border-border hover:border-primary/50 px-4 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                Try the AI live: {demoNumber}
              </a>
            </motion.div>

            {/* Contact fallback */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-[11px] text-muted-foreground"
            >
              Questions in the meantime?{" "}
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
