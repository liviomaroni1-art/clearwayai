import { motion } from "framer-motion";
import { Wrench, Stethoscope, Scale, Building2 } from "lucide-react";

const audiences = [
  {
    icon: Wrench,
    title: "Home Service Companies",
    trades: "HVAC, plumbing, electrical, roofing, landscaping, cleaning",
    reality: "Always on jobs, missing calls from the truck, old estimates going cold, no time to follow up.",
  },
  {
    icon: Stethoscope,
    title: "Clinics & Dental Practices",
    trades: "Dental, chiropractic, physiotherapy, veterinary",
    reality: "Front desk overwhelmed, after-hours calls lost, no-shows eating revenue, patients not returning.",
  },
  {
    icon: Scale,
    title: "Law Firms & Consultants",
    trades: "Immigration, family law, personal injury, financial advisory",
    reality: "High-value leads calling once and never again, intake bottlenecks, no follow-up system.",
  },
  {
    icon: Building2,
    title: "Appointment-Based Local Businesses",
    trades: "Salons, auto repair, property management, fitness studios",
    reality: "Spending hours on the phone instead of serving clients, losing repeat business to silence.",
  },
];

const WhoItsFor = () => {
  return (
    <section id="who-its-for" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Built for Businesses That <span className="gradient-text">Run on Appointments</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            If your revenue depends on picking up the phone and filling a calendar, this system was designed for you.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {audiences.map((a, index) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-5 md:p-6 rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <a.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">{a.title}</h3>
              <p className="text-xs text-primary font-medium mb-2">{a.trades}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.reality}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
