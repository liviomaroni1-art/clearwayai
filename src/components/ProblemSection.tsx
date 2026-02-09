import { motion } from "framer-motion";
import { Clock, PhoneOff, DollarSign, ArrowRight, Info } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: Clock,
      title: "Busiest hours = most missed calls",
      description: "You're with a client. The phone rings. It goes to voicemail. That caller books with someone else."
    },
    {
      icon: PhoneOff,
      title: "Your competitor answers first",
      description: "People call 2–3 providers. Whoever picks up gets the appointment. Every time."
    },
    {
      icon: DollarSign,
      title: "Admin chaos after every missed call",
      description: "Voicemails stack up. Callbacks get delayed. No-shows multiply. Revenue leaks quietly."
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
            Every Missed Call <span className="text-destructive">Costs You Money</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            While you're serving clients, new ones are calling your competitors instead.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto mb-6 md:mb-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-5 md:p-8 rounded-2xl text-center hover:border-destructive/30 transition-colors"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <problem.icon className="w-5 h-5 md:w-7 md:h-7 text-destructive" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground">{problem.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Methodology note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a 
            href="#calculator" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Info className="w-4 h-4" />
            See how much you could recover
            <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
