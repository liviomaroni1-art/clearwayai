import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What happens if the AI can't handle a call?",
    answer:
      "It never guesses. If unsure, it transfers the caller to your staff, takes a voicemail, or sends an SMS follow-up. You get an instant notification with full call details."
  },
  {
    question: "Can I keep my existing phone number?",
    answer:
      "Yes. We set up call forwarding from your current number. Your clients won't notice anything different—calls just get answered faster."
  },
  {
    question: "How is pricing determined?",
    answer:
      "Plans are based on included minutes, features, and support level. Overages cost $0.50/min. Book a demo and we'll quote your exact setup."
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. TLS 1.3 in transit, AES-256 at rest, role-based access controls. BAA available for healthcare practices. See our Security page for details."
  },
  {
    question: "How long does setup take?",
    answer:
      "About 30 minutes of your time for the onboarding call. We handle all technical work and typically go live within ~72 hours after that."
  },
  {
    question: "Do you record calls?",
    answer:
      "Recording is optional. When enabled, the AI announces it. Recordings are kept 90 days by default (configurable). See our Security page."
  },
  {
    question: "What about wrong bookings or misinformation?",
    answer:
      "The AI only says what you've approved—your services, pricing, FAQs, and booking rules. When uncertain, it escalates to a human. We refine responses weekly."
  },
  {
    question: "What are the contract terms?",
    answer:
      "Rolling 90-day cancellation notice. Annual billing saves 20%. 36-month commitments get additional discounts and waived setup fees."
  },
  {
    question: "Which integrations are included?",
    answer:
      "Native: Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, SimplePractice. Others via Zapier or n8n. Enterprise plans include custom API integrations."
  },
  {
    question: "Can it handle multiple calendars and locations?",
    answer:
      "Yes. The AI syncs with multiple calendars, checks team availability, and books at different locations. Multi-location support is in Team Pro and Concierge plans."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-12 md:py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Straight answers to what you're probably wondering.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm md:text-base text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground">
            Still have questions?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Book a demo
            </Link>
            {" "}or{" "}
            <Link to="/security" className="text-primary hover:underline">
              view our Security page
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
