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
      className="max-w-4xl mx-auto mt-2 md:mt-8 comparison-table-wrapper"
    >
      <h3 className="text-base md:text-xl font-bold text-center mb-1 md:mb-4 text-foreground">
        Compare <span className="gradient-text">Plans</span>
      </h3>
      
      <div className="px-1 md:px-0">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left text-[10px] md:text-sm font-medium text-muted-foreground py-1 md:py-2.5 pr-1 md:pr-4 w-[36%] md:w-1/3">Feature</th>
              {plans.map((plan) => (
                <th key={plan.key} className="text-center text-[10px] md:text-sm font-semibold text-foreground py-1 md:py-2.5 px-0.5 md:px-2">
                  <div className="truncate">{plan.name}</div>
                  <div className="text-[8px] md:text-xs font-normal text-muted-foreground truncate">{plan.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={feature.name} className={`border-b border-border/20 ${index % 2 === 0 ? 'bg-muted/5' : ''}`}>
                <td className="text-[10px] md:text-sm text-muted-foreground py-px md:py-2 pr-1 md:pr-4 leading-tight">{feature.name}</td>
                {(["solo", "pro", "team", "concierge"] as const).map((planKey) => (
                  <td key={planKey} className="text-center py-px md:py-2 px-0.5 md:px-2">
                    {feature[planKey] ? (
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-primary mx-auto" />
                    ) : (
                      <Minus className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/30 mx-auto" />
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
