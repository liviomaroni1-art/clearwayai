import { motion } from "framer-motion";
import { Clock, PhoneOff, DollarSign, ArrowRight, Info } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: Clock,
      title: "Peak hours = missed calls",
      description: "When you're busiest serving clients, that's exactly when most calls go unanswered."
    },
    {
      icon: PhoneOff,
      title: "First to answer wins",
      description: "Callers usually book with whoever picks up first. Your competitor answers—they get the client."
    },
    {
      icon: DollarSign,
      title: "Admin catch-up creates chaos",
      description: "Every missed call means voicemails to check, callbacks to make, and no-shows to manage."
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
            Missed Calls = <span className="text-destructive">Lost Revenue</span> (and Lost Trust)
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Every unanswered call is a potential client choosing your competitor instead.
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
            See how we estimate potential recovery
            <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
