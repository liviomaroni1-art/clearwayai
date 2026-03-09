import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to see results?",
    answer: "Most clients see their first AI-generated meetings within 2–3 weeks of launch. Full system optimization typically takes 60–90 days as we refine messaging and targeting based on live data.",
  },
  {
    question: "What does the engagement cost?",
    answer: "Our engagements start from CHF 2,500/month depending on scope. We'll give you a clear proposal after the strategy call — no hidden fees, no long lock-in contracts.",
  },
  {
    question: "What tech stack do you work with?",
    answer: "We integrate with your existing CRM (HubSpot, Salesforce, Pipedrive, etc.) and build on top of best-in-class AI and automation tools. No need to replace what's working.",
  },
  {
    question: "Is AI outreach safe? Won't it damage our brand?",
    answer: "Every sequence is reviewed for quality and compliance. We use controlled sending volumes, proper warm-up, and human-quality personalization. Your brand reputation is our priority.",
  },
  {
    question: "Who runs the campaigns?",
    answer: "We handle end-to-end: strategy, copywriting, technical setup, monitoring, and optimization. You review and approve — we execute.",
  },
  {
    question: "What KPIs do you focus on?",
    answer: "Meetings booked, pipeline generated, and lead-to-opportunity conversion rate. We align on metrics during the strategy call and report transparently.",
  },
  {
    question: "Do you work with companies outside Switzerland?",
    answer: "Yes. We're based in Switzerland but work with B2B companies across Europe and the US. Our systems are language-agnostic and support multi-market campaigns.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-card/30 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Questions? Answered.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border border-border rounded-lg px-5 bg-card/50">
                <AccordionTrigger className="text-sm md:text-base font-display font-medium text-foreground hover:text-foreground/80 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
