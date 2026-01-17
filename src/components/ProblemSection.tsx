import { motion } from "framer-motion";
import { PhoneMissed, Wallet, Clock, TrendingDown } from "lucide-react";

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
            Missed Calls Are Costing You <span className="text-destructive">CHF 50,000+/Year</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10">
            Swiss practices and law firms miss up to 40% of inbound calls. Each missed call 
            means CHF 300-800 in lost revenue—and a patient/client who went to your competitor.
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
              <Wallet className="w-8 h-8 text-destructive mx-auto mb-3" />
              <p className="text-2xl font-bold text-foreground mb-1">CHF 500+</p>
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
              <p className="text-sm text-muted-foreground">choose the first responder</p>
            </motion.div>
          </div>

          {/* Comparison Card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 glass-card p-6 rounded-2xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Full-Time Receptionist</p>
                <p className="text-3xl font-bold text-destructive">CHF 4,500/mo</p>
                <p className="text-xs text-muted-foreground">+ holidays, sick days, 9-5 only</p>
              </div>
              
              <div className="flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-emerald-400" />
                <span className="text-emerald-400 font-bold">44% cheaper</span>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Clearway AI</p>
                <p className="text-3xl font-bold text-emerald-400">CHF 2,500/mo</p>
                <p className="text-xs text-muted-foreground">24/7/365, no downtime</p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
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
