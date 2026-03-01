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
    question: "Are you replacing my staff?",
    answer: "No. We handle the calls, follow-ups, and reminders your team doesn't have time for — so they can focus on delivering great service. Think of it as a tireless assistant, not a replacement.",
  },
  {
    question: "How fast can we go live?",
    answer: "Most businesses are live within ~72 hours after completing a short onboarding call. We handle all setup, integrations, and testing.",
  },
  {
    question: "Does this work with my existing phone number and CRM?",
    answer: "Yes. We integrate with your current number, calendar, and CRM — including Google Calendar, Outlook, HubSpot, ServiceTitan, Housecall Pro, and more. No need to change your workflow.",
  },
  {
    question: "What if a caller needs a human?",
    answer: "The AI knows when to escalate. Complex or sensitive inquiries are transferred to your team via live call transfer, SMS, or email — so nothing falls through the cracks.",
  },
  {
    question: "Can you handle emergencies or out-of-hours calls?",
    answer: "Absolutely. The AI triages urgency levels, handles emergency routing, and ensures critical calls reach the right person immediately — even at 2 AM.",
  },
  {
    question: "What if the AI makes a mistake?",
    answer: "Built-in guardrails prevent the AI from making promises it can't keep. Every interaction is logged and reviewable, and we continuously refine the system based on real call data.",
  },
  {
    question: "How do follow-ups and reactivation work?",
    answer: "After a missed call or unbooked estimate, the system automatically sends a friendly SMS or email follow-up. For inactive customers, we run targeted reactivation campaigns to bring them back.",
  },
  {
    question: "How does the review request system work?",
    answer: "After a completed job or appointment, the system sends a short follow-up asking for a review. Happy clients get directed to Google or your preferred platform. Unhappy ones get routed to you privately first.",
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. We offer month-to-month plans with no long-term lock-in. We earn your business every month.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. All data is encrypted in transit and at rest. We use enterprise-grade infrastructure and offer BAAs for healthcare practices. See our security page for details.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
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
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <Link to="/contact" className="text-primary hover:underline font-medium">Book a free growth audit</Link>
            {" · "}
            <Link to="/security" className="text-primary hover:underline">Security</Link>
            {" · "}
            <a href="#pricing" className="text-primary hover:underline">Pricing</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
