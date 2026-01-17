import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    price: "99",
    originalPrice: "199",
    description: "Perfect for solo practitioners and small teams",
    features: [
      "Up to 100 calls/month",
      "AI call handling & booking",
      "Google Calendar sync",
      "Email notifications",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "149",
    originalPrice: "299",
    description: "For growing businesses with higher call volume",
    features: [
      "Up to 500 calls/month",
      "All Starter features",
      "CRM integration (HubSpot, etc.)",
      "Multi-language support (DE/EN)",
      "Priority support",
      "Custom greeting & scripts",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    originalPrice: null,
    description: "For businesses needing unlimited scale",
    features: [
      "Unlimited calls",
      "All Pro features",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "White-label option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            50% Early Bird Discount
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            No hidden fees. No long-term contracts. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative glass-card rounded-2xl p-8 ${
                tier.popular ? "border-2 border-primary" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-2">
                  {tier.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      CHF {tier.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-foreground">
                    {tier.price === "Custom" ? "" : "CHF "}
                    {tier.price}
                  </span>
                  {tier.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.popular ? "hero" : "heroOutline"}
                className="w-full"
                asChild
              >
                <Link to="/contact">{tier.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          All prices in Swiss Francs (CHF). 14-day free trial included. No credit card required to start.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
