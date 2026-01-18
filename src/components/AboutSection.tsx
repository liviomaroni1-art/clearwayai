import { motion } from "framer-motion";
import { Globe, Clock, Shield, Headphones } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Globe,
      title: "Swiss Precision, US Focus",
      description: "Headquartered in Freienbach, Switzerland, we serve businesses across the United States with Swiss engineering standards."
    },
    {
      icon: Clock,
      title: "US Business Hours Support",
      description: "Live support Monday-Friday, 6 AM - 6 PM Pacific. Email support 24/7 with 4-hour response for urgent issues."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Swiss data protection standards combined with SOC 2 compliant US infrastructure. Your calls are encrypted and secure."
    },
    {
      icon: Headphones,
      title: "White-Glove Setup",
      description: "Every client gets a dedicated onboarding call. We handle integration, voice customization, and testing—you just approve."
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Clearway AI</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're a boutique AI automation firm that builds premium voice AI solutions for US service businesses. 
            Small team, big results, zero corporate runaround.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Founder Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-2xl mx-auto text-center"
        >
          <div className="glass-card p-8 rounded-2xl border-primary/20">
            <p className="text-lg text-foreground/90 italic mb-4">
              "I built Clearway AI because I saw too many great businesses losing leads to voicemail. 
              Your callers deserve better than hold music and phone tag. 
              We fix that with AI that actually works."
            </p>
            <p className="text-primary font-semibold">— Founder, Clearway AI</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
