import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How natural does the AI voice sound?",
    answer:
      "Our AI uses Retell.ai's advanced voice technology, delivering natural, human-like conversations. Most callers can't tell they're speaking with an AI. Book a demo to hear it yourself.",
  },
  {
    question: "What languages are supported?",
    answer:
      "We support 30+ languages including English, Spanish, Mandarin Chinese, Hindi, Arabic, Portuguese, French, German, Japanese, Korean, Italian, Russian, Dutch, Polish, Turkish, Vietnamese, Thai, Indonesian, Tagalog, and more. Our AI handles native-level fluency for global businesses.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most businesses are live within 24-48 hours. We handle the technical setup—you just provide your business info, services, and booking preferences.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We integrate with Google Calendar, Outlook, HubSpot, and other popular CRM systems. Need something specific? Enterprise plans include custom integrations.",
  },
  {
    question: "What happens if the AI can't handle a call?",
    answer:
      "Our AI gracefully hands off to a human when needed. You'll get an immediate notification with call details so you can follow up personally.",
  },
  {
    question: "Do you require a contract?",
    answer:
      "Yes, we work with service agreements tailored to your business needs. This ensures commitment from both sides and allows us to deliver the best results for your team.",
  },
  {
    question: "How is pricing determined?",
    answer:
      "Every business is different, so we provide custom pricing based on your call volume, integrations needed, and specific requirements. Book a free consultation to get a personalized quote.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We follow industry-standard security practices and are fully compliant with US data protection requirements. All data is encrypted and stored securely. We never sell or share your customer data.",
  },
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
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Clearway AI
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
            <a href="/contact" className="text-primary hover:underline">
              Get in touch
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
