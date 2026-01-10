import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Large Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.img 
          src={logo} 
          alt="" 
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.06, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="w-[80vw] md:w-[60vw] lg:w-[50vw] max-w-[800px] h-auto"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Hero Card - Morningside Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Gradient border glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-3xl blur-sm opacity-50" />
            
            <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 lg:p-16 border border-primary/20">
              {/* Main Heading */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                It's time to let AI handle the{" "}
                <span className="gradient-text">small stuff.</span>
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                From AI receptionists to automated email responses, we help businesses 
                implement intelligent solutions so you can focus on what truly matters—scaling your operations and growing your business.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl">
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="heroOutline" size="xl">
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Trusted By - Company Logos Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <p className="text-sm text-muted-foreground mb-6">Trusted by forward-thinking businesses</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {["Company A", "Company B", "Company C", "Company D"].map((company) => (
                <div 
                  key={company}
                  className="px-6 py-2 text-muted-foreground text-sm font-medium tracking-wider"
                >
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
