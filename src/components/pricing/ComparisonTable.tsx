import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

const features = [
  { name: "24/7 AI call answering", solo: true, pro: true, team: true, concierge: true },
  { name: "Calendar sync", solo: true, pro: true, team: true, concierge: true },
  { name: "Call summaries & transcripts", solo: true, pro: true, team: true, concierge: true },
  { name: "CRM integration", solo: false, pro: true, team: true, concierge: true },
  { name: "SMS & email reminders", solo: false, pro: true, team: true, concierge: true },
  { name: "Lead capture analytics", solo: false, pro: true, team: true, concierge: true },
  { name: "Smart call routing", solo: false, pro: false, team: true, concierge: true },
  { name: "Multi-calendar scheduling", solo: false, pro: false, team: true, concierge: true },
  { name: "Custom IVR menus", solo: false, pro: false, team: true, concierge: true },
  { name: "Dedicated account manager", solo: false, pro: false, team: false, concierge: true },
  { name: "Custom voice cloning", solo: false, pro: false, team: false, concierge: true },
  { name: "Custom API integrations", solo: false, pro: false, team: false, concierge: true },
  { name: "HIPAA / BAA available", solo: false, pro: false, team: false, concierge: true },
];

const plans = [
  { key: "solo", name: "Solo", price: "$1,500" },
  { key: "pro", name: "Pro", price: "$2,500" },
  { key: "team", name: "Team", price: "$3,500" },
  { key: "concierge", name: "Concierge", price: "$5,000+" },
];

const ComparisonTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto mt-12 md:mt-16"
    >
      <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">
        Compare <span className="gradient-text">Plans</span>
      </h3>
      
      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left text-sm font-medium text-muted-foreground py-3 pr-4 w-1/3">Feature</th>
              {plans.map((plan) => (
                <th key={plan.key} className="text-center text-sm font-semibold text-foreground py-3 px-2">
                  <div>{plan.name}</div>
                  <div className="text-xs font-normal text-muted-foreground mt-0.5">{plan.price}/mo</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={feature.name} className={`border-b border-border/20 ${index % 2 === 0 ? 'bg-muted/5' : ''}`}>
                <td className="text-sm text-muted-foreground py-3 pr-4">{feature.name}</td>
                {(["solo", "pro", "team", "concierge"] as const).map((planKey) => (
                  <td key={planKey} className="text-center py-3 px-2">
                    {feature[planKey] ? (
                      <Check className="w-4 h-4 text-primary mx-auto" />
                    ) : (
                      <Minus className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ComparisonTable;
