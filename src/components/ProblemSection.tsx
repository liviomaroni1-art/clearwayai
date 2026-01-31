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
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Missed Calls = <span className="text-destructive">Lost Revenue</span> (and Lost Trust)
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every unanswered call is a potential client choosing your competitor instead.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl text-center hover:border-destructive/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <problem.icon className="w-7 h-7 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
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
