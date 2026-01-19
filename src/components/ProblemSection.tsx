import { motion } from "framer-motion";
import { PhoneMissed, Wallet, Clock, ArrowRight } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="section-calm bg-secondary/50">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm font-medium mb-6">
              <PhoneMissed className="w-4 h-4" />
              The challenge
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
              Missed calls are costing you more than you think
            </h2>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
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
                  className="flex items-start gap-4 p-4 glass-card"
                >
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-100">{item.stat}</span>
                    <span className="text-gray-400 ml-2">{item.text}</span>
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
              <h3 className="text-2xl font-bold mb-6 text-gray-100">
                What if every call was answered?
              </h3>
              
              <div className="space-y-6">
                {[
                  "AI answers instantly, 24/7/365",
                  "Books appointments directly into your calendar",
                  "Sends confirmations and syncs with your CRM",
                ].map((text, i) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">{i + 1}</span>
                    </div>
                    <p className="text-gray-200">{text}</p>
                  </div>
                ))}
              </div>

              {/* Cost comparison */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-500 mb-4">Know your cost—no surprises.</p>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Full-time staff</p>
                    <p className="text-xl font-bold text-red-400 line-through">$4,500/mo</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary" />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">ClearwayAI</p>
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