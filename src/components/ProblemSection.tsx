import { motion } from "framer-motion";
import { PhoneMissed, Wallet, Clock, ArrowRight } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="section-calm bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Empathetic transition */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-transition mb-16"
        >
          If this sounds familiar, you're not alone.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Problem statement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-6">
              <PhoneMissed className="w-4 h-4" />
              The challenge
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Missed calls are costing you more than you think
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              When you're with a patient or in court, calls go unanswered. Each one represents 
              a potential client who moves on to your competitor. The busier you get, the more 
              opportunities slip away.
            </p>

            <div className="space-y-4">
              {[
                { icon: PhoneMissed, stat: "40%", text: "of calls go unanswered during busy hours" },
                { icon: Wallet, stat: "$500+", text: "average value of each missed opportunity" },
                { icon: Clock, stat: "78%", text: "of clients choose whoever answers first" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/40"
                >
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground">{item.stat}</span>
                    <span className="text-muted-foreground ml-2">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Solution preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="elevated-card p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                What if every call was answered?
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <p className="text-foreground">AI answers instantly, 24/7/365</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <p className="text-foreground">Books appointments directly into your calendar</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <p className="text-foreground">Sends confirmations and syncs with your CRM</p>
                </div>
              </div>

              {/* Cost comparison - Transparency */}
              <div className="mt-8 pt-8 border-t border-border/40">
                <p className="text-sm text-muted-foreground mb-4">Know your cost—no surprises.</p>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Full-time staff</p>
                    <p className="text-xl font-bold text-destructive line-through">$4,500/mo</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary" />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">ClearwayAI</p>
                    <p className="text-xl font-bold text-primary">$2,500/mo</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;