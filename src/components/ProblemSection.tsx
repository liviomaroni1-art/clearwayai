import { motion } from "framer-motion";
import { PhoneMissed, DollarSign, Clock } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-6">
            <PhoneMissed className="w-4 h-4" />
            The Problem
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Missed Calls Are <span className="text-destructive">Costing You Thousands</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10">
            Service businesses miss up to 40% of inbound calls. Each missed call represents 
            $200-500 in lost revenue—and a customer who went to your competitor.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <PhoneMissed className="w-8 h-8 text-destructive mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground mb-1">40%</p>
              <p className="text-sm text-muted-foreground">of calls go unanswered</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <DollarSign className="w-8 h-8 text-destructive mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground mb-1">$500+</p>
              <p className="text-sm text-muted-foreground">lost per missed lead</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <Clock className="w-8 h-8 text-destructive mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground mb-1">78%</p>
              <p className="text-sm text-muted-foreground">of leads go to first responder</p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 text-lg font-medium text-foreground"
          >
            What if every call was answered instantly—24/7?
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
