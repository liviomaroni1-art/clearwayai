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
      "The AI is designed to recognize its limits. When it encounters a situation it can't handle confidently, it will transfer the call to your staff, take a voicemail, or send an SMS follow-up. You'll receive an immediate notification with call details so you can follow up personally. Nothing falls through the cracks."
  },
  {
    question: "Can it transfer to different departments or staff?",
    answer:
      "Yes. We configure routing rules during setup. Calls can be directed to specific departments (billing, scheduling, general inquiries) or individual staff members based on caller needs, time of day, or other criteria you define."
  },
  {
    question: "Can it book across multiple calendars or locations?",
    answer:
      "Absolutely. The AI can sync with multiple Google Calendars or Outlook calendars, check availability across your team, and book appointments at different locations. Multi-location support is included in Team Pro and Concierge plans."
  },
  {
    question: "How long does setup take and what do you need from me?",
    answer:
      "Typically ~72 hours after onboarding is completed. Onboarding takes about 30 minutes of your time to walk through your call flow, FAQs, booking rules, and provide required access (phone forwarding, calendar, CRM if applicable). Once we have everything, we handle the technical setup—timing may vary with integration complexity."
  },
  {
    question: "Do you record calls? How is consent handled?",
    answer:
      "Call recording is optional. When enabled, the AI announces the recording at the start of the call (you can customize this message). Recordings are retained for 90 days by default, but this is configurable. See our Security page for details."
  },
  {
    question: "How do you prevent wrong bookings or misinformation?",
    answer:
      "The AI is trained on your specific knowledge base—your services, pricing, FAQs, and booking rules. It only says what you've approved. When uncertain, it escalates to a human rather than guessing. We continuously refine responses based on call outcomes."
  },
  {
    question: "Which integrations are native vs via Zapier/n8n?",
    answer:
      "Native integrations include Google Calendar, Outlook, HubSpot, Salesforce, Pipedrive, and SimplePractice. Other tools can be connected via Zapier or n8n. Enterprise plans include custom API integrations for specialized systems."
  },
  {
    question: "What are the contract terms and cancellation policy?",
    answer:
      "All plans require a rolling 90-day cancellation notice. Annual billing saves 20%. Long-term commitments (36 months) receive additional discounts and waived setup fees. No hidden fees—pricing is transparent and all-inclusive."
  },
  {
    question: "How is pricing determined?",
    answer:
      "Pricing is based on included minutes per month, features, and support level. Overages are billed at $0.50/minute. We provide custom quotes for high-volume or specialized needs. Book a demo and we'll give you an exact quote."
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use TLS 1.3 encryption in transit, AES-256 encryption at rest, and role-based access controls. BAA available for Enterprise customers who need HIPAA compliance. See our Security page for full details."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real answers to the questions we hear most
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
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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
              Get in touch
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
