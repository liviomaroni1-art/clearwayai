import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Globe, Target, FileText, BarChart3, Plug, Handshake, Check, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const addOns = [
  {
    name: "Website Chat Support",
    icon: Globe,
    setup: "$1,500",
    monthly: "$250",
    description: "AI-powered chat widget for your website that captures leads and answers questions 24/7.",
    features: [
      "Customizable chat widget",
      "Lead capture forms",
      "Knowledge base integration",
      "Handoff to human agents"
    ]
  },
  {
    name: "Email Automation",
    icon: Target,
    setup: "$2,000",
    monthly: "$400",
    usageBased: true,
    description: "Automated email responses and follow-ups that turn leads into booked appointments.",
    features: [
      "Auto-response to inquiries",
      "Follow-up sequences",
      "CRM integration",
      "Performance analytics"
    ]
  },
  {
    name: "Document Processing (OCR)",
    icon: FileText,
    setup: "$3,000",
    monthly: "$300",
    usageBased: true,
    description: "Extract data from documents, forms, and images to eliminate manual entry.",
    features: [
      "Intelligent OCR",
      "Form auto-fill",
      "Data validation",
      "Audit trail"
    ]
  },
  {
    name: "Lead Qualification Enhancements",
    icon: Target,
    setup: "$2,000",
    monthly: "$400",
    usageBased: true,
    description: "Advanced AI scoring and prioritization to focus on high-value prospects.",
    features: [
      "Custom scoring criteria",
      "Priority ranking",
      "Intent signals",
      "Routing rules"
    ]
  },
  {
    name: "Reporting & QBR",
    icon: BarChart3,
    setup: "$2,500",
    monthly: "$450",
    description: "Custom dashboards and quarterly business reviews with actionable insights.",
    features: [
      "Custom dashboards",
      "Quarterly reviews",
      "ROI tracking",
      "Performance recommendations"
    ]
  },
  {
    name: "Custom Integrations",
    icon: Plug,
    setup: "$4,000+",
    monthly: "$600",
    description: "Connect any CRM, EHR, or business tool via custom API development.",
    features: [
      "Custom API development",
      "Bi-directional sync",
      "Webhook support",
      "Dedicated maintenance"
    ]
  },
  {
    name: "Long-Term Partnership",
    icon: Handshake,
    setup: "$6,000",
    monthly: "$1,200",
    description: "White-glove implementation with dedicated support and strategic consulting.",
    features: [
      "Dedicated account manager",
      "Strategic consulting",
      "Priority development",
      "Quarterly strategy sessions"
    ]
  }
];

const AddOns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-36 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Add-Ons <span className="gradient-text">(Only If You Need Them)</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Optional enhancements for existing customers and larger teams. Our core AI Phone Receptionist is all most businesses need.
            </p>
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                <strong className="text-foreground">Bundle discount:</strong> Get 15% off monthly fees when you add 2+ services to your plan.
              </p>
            </div>
          </motion.div>

          {/* Add-Ons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <addon.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground">{addon.name}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {addon.description}
                </p>
                
                {/* Pricing */}
                <div className="bg-muted/30 rounded-lg p-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Setup:</span>
                      <span className="font-semibold text-foreground ml-1">{addon.setup}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly:</span>
                      <span className="font-semibold text-foreground ml-1">
                        {addon.monthly}
                        {addon.usageBased && <span className="text-xs text-muted-foreground"> + usage</span>}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Features */}
                <ul className="space-y-2">
                  {addon.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-6">
              Interested in add-ons? Let's discuss during your demo call.
            </p>
            <Button variant="hero" size="lg" className="btn-glow" asChild>
              <Link to="/contact">
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddOns;
