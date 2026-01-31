import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface AddOnCardProps {
  name: string;
  icon: LucideIcon;
  setup: string;
  monthly: string;
  usageBased?: boolean;
  description: string;
  features: string[];
  color: string;
  index: number;
  onSelect: () => void;
}

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  emerald: {
    bg: "from-emerald-500/10 to-emerald-600/5",
    border: "border-border/50 hover:border-emerald-500/40",
    text: "text-emerald-500"
  },
  violet: {
    bg: "from-primary/15 to-primary/5",
    border: "border-primary/30 hover:border-primary/50",
    text: "text-primary"
  },
  amber: {
    bg: "from-amber-500/10 to-amber-600/5",
    border: "border-border/50 hover:border-amber-500/40",
    text: "text-amber-500"
  },
  slate: {
    bg: "from-slate-400/10 to-slate-500/5",
    border: "border-border/50 hover:border-slate-400/40",
    text: "text-slate-300"
  }
};

const AddOnCard: React.FC<AddOnCardProps> = ({
  name,
  icon: Icon,
  setup,
  monthly,
  usageBased,
  description,
  features,
  color,
  index,
  onSelect
}) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative bg-gradient-to-b ${colors.bg} backdrop-blur-xl rounded-2xl p-6 border ${colors.border} transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="mb-4">
        <div className={`inline-flex items-center gap-2 ${colors.text} mb-3`}>
          <Icon className="w-5 h-5" />
          <span className="text-lg font-bold">{name}</span>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Pricing */}
      <div className="bg-background/40 rounded-xl px-4 py-3 mb-4 border border-border/30">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-muted-foreground">Setup</span>
            <p className="text-lg font-bold text-foreground">{setup}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">Monthly</span>
            <p className="text-lg font-bold text-foreground">
              {monthly}
              {usageBased && <span className="text-xs font-normal text-muted-foreground"> + usage</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-5 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <Check className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Bundle Discount Note */}
      <div className="text-xs text-center text-muted-foreground mb-4 bg-primary/5 rounded-lg px-3 py-2 border border-primary/10">
        <span className="text-primary font-medium">15% off</span> when bundled with 2+ add-ons
      </div>

      {/* CTA */}
      <Button 
        onClick={onSelect}
        variant="outline"
        className="w-full border-border hover:bg-muted font-medium py-5 rounded-xl transition-all flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add to Plan
      </Button>
    </motion.div>
  );
};

export default AddOnCard;
