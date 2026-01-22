import { motion } from "framer-motion";
import { PhoneMissed, Wallet, Clock, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProblemSection = () => {
  return (
    <section className="section-calm bg-secondary/50">
      <div className="container mx-auto px-6">
        {/* Empathetic Pain Point Hook */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-transition mb-16"
        >
          Sound familiar? Every missed call is money walking out the door.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Problem statement with emotional triggers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              The Hidden Revenue Killer
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
              You're losing <span className="text-red-400">$2,500+ per week</span> to unanswered calls
            </h2>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              While you're with patients, in court, or on another job—potential clients are calling. 
              <span className="text-gray-200 font-medium"> 78% of them will hire whoever answers first.</span> 
              {" "}Your competitors are picking up. Are you?
            </p>

            <div className="space-y-4">
              {[
                { icon: PhoneMissed, stat: "40%", text: "of calls go unanswered during peak hours" },
                { icon: Wallet, stat: "$500-2K", text: "lost per missed opportunity (your math)" },
                { icon: Clock, stat: "78%", text: "of clients choose the first business that answers" },
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
                    <span className="font-bold text-red-400">{item.stat}</span>
                    <span className="text-gray-400 ml-2">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Solution with transformation promise */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="elevated-card p-8 md:p-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium mb-4">
                ✨ The transformation
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-gray-100">
                What if you captured <span className="text-primary">every single lead?</span>
              </h3>
              
              <div className="space-y-5">
                {[
                  "AI answers instantly—before the 2nd ring",
                  "Books appointments directly into your calendar",
                  "Qualifies leads so you only talk to serious buyers",
                  "Speaks 30+ languages like a native",
                ].map((text, i) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-gray-200">{text}</p>
                  </div>
                ))}
              </div>

              {/* Anchoring: Compare to alternative */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-500 mb-4">Compare your options:</p>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Hire a receptionist</p>
                    <p className="text-xl font-bold text-red-400 line-through">$4,500/mo</p>
                    <p className="text-xs text-gray-500">+ sick days, training, turnover</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary" />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Clearway AI</p>
                    <p className="text-xl font-bold text-primary">From $1,500/mo</p>
                    <p className="text-xs text-emerald-400">Works 24/7, never calls in sick</p>
                  </div>
                </div>
                
                {/* High-converting CTA */}
                <Button variant="hero" size="lg" className="w-full btn-glow" asChild>
                  <Link to="/contact">
                    Calculate My ROI — Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <p className="text-xs text-center text-gray-500 mt-3">No credit card • 5-minute consultation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
