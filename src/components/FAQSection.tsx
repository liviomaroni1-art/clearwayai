import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What's the difference between Leads Only and Booked Calls?",
    answer: "With Leads Only, we deliver qualified leads directly to your CRM or inbox. With Booked Calls, our AI follow-up system also handles scheduling — so prospects land on your calendar ready to talk. You choose the model that fits your workflow.",
  },
  {
    question: "How long does it take to launch?",
    answer: "Most campaigns go live within 7–14 days. That includes strategy, ad creative, funnel build, and AI follow-up setup. From there, we optimize weekly based on real data.",
  },
  {
    question: "What results can I expect?",
    answer: "Results depend on your offer, market, and budget. We don't make guarantees — but our system is designed to help you generate a consistent flow of qualified leads and reduce wasted ad spend. We'll set realistic expectations during the strategy call.",
  },
  {
    question: "What platforms do you run ads on?",
    answer: "We focus on Meta (Facebook & Instagram). These platforms typically offer strong targeting for local and online service businesses, and work well with our funnel and AI follow-up system.",
  },
  {
    question: "Do I need a big ad budget?",
    answer: "We typically recommend starting with a minimum ad budget that allows for meaningful data and testing. We'll discuss what makes sense for your market during the strategy call.",
  },
  {
    question: "What if I already run ads?",
    answer: "Great — we can audit what you're doing and identify where the gaps are. Often the issue isn't the ads themselves, but the follow-up system (or lack of one) behind them.",
  },
  {
    question: "Do you work with businesses outside Switzerland?",
    answer: "Yes. We're based in Switzerland but work with service businesses across Europe and beyond. Our system supports multiple languages and markets.",
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
