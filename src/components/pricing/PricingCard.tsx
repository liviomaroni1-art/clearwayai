import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp, Star } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Feature {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

interface PricingCardProps {
  name: string;
  icon: LucideIcon;
  price: string;
  priceAnnual: string;
  setup: string;
  tagline: string;
  idealFor: string;
  color: string;
  features: Feature[];
  setupIncludes: string[];
  ctaText: string;
  ctaAction: () => void;
  popular?: boolean;
  label?: string;
  notes?: string[];
  index: number;
  isAnnual: boolean;
}

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  emerald: {
    bg: "from-emerald-500/10 to-emerald-600/5",
    border: "border-border/50 hover:border-emerald-500/40",
    text: "text-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
  },
  violet: {
    bg: "from-primary/15 to-primary/5",
    border: "border-primary/30 hover:border-primary/50",
    text: "text-primary",
    badge: "bg-primary/10 text-primary border-primary/20"
  },
  amber: {
    bg: "from-amber-500/10 to-amber-600/5",
    border: "border-border/50 hover:border-amber-500/40",
    text: "text-amber-500",
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/20"
  },
  slate: {
    bg: "from-slate-400/10 to-slate-500/5",
    border: "border-border/50 hover:border-slate-400/40",
    text: "text-slate-300",
    badge: "bg-slate-400/10 text-slate-300 border-slate-400/20"
  }
};

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  icon: Icon,
  price,
  priceAnnual,
  setup,
  tagline,
  idealFor,
  color,
  features,
  setupIncludes,
  ctaText,
  ctaAction,
  popular,
  label,
  notes,
  index,
  isAnnual
}) => {
  const [setupOpen, setSetupOpen] = useState(false);
  const colors = colorClasses[color];
  const displayPrice = isAnnual ? priceAnnual : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative bg-gradient-to-b ${colors.bg} backdrop-blur-xl rounded-2xl p-4 md:p-6 lg:p-8 border ${colors.border} transition-all duration-300 flex flex-col ${popular ? 'ring-2 ring-primary/50' : ''}`}
    >
      {/* Popular / Enterprise Badge */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
            <Star className="w-3 h-3 fill-current" />
            Best Value
          </span>
        </div>
      )}
      {label && !popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-muted text-muted-foreground text-xs font-semibold px-4 py-1.5 rounded-full border border-border">
            {label}
          </span>
        </div>
      )}

      <div className="text-center mb-4 md:mb-5 pt-2">
        <div className={`inline-flex items-center justify-center gap-1.5 md:gap-2 ${colors.text} mb-2 md:mb-3`}>
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-base md:text-lg font-bold">{name}</span>
        </div>
        
        <div className="mb-1.5 md:mb-2">
          <span className={`text-2xl md:text-4xl font-bold ${colors.text}`}>{displayPrice}</span>
          <span className="text-xs md:text-sm text-muted-foreground">/month</span>
        </div>
        
        {isAnnual && (
          <div className="text-xs text-primary font-medium mb-1.5 md:mb-2">
            Save 10% with annual billing
          </div>
        )}
        
        <div className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
          One-time setup: <span className="font-medium text-foreground">{setup}</span>
        </div>

        <p className="text-xs md:text-sm text-foreground/90 leading-relaxed">
          {tagline}
        </p>
      </div>

      <div className="bg-background/40 rounded-xl px-3 py-2 md:px-4 md:py-3 text-center mb-4 md:mb-5 border border-border/30">
        <p className="text-xs md:text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Perfect for:</span> {idealFor}
        </p>
      </div>

      <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-5 flex-grow">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-xs md:text-sm">
            <Check className={`w-3 h-3 md:w-4 md:h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
            <span className={`${feature.italic ? 'italic text-muted-foreground/80' : 'text-muted-foreground'} ${feature.bold ? 'font-medium text-foreground' : ''}`}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {notes && notes.length > 0 && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-3 py-2 md:px-4 md:py-3 mb-4 md:mb-5">
          <p className="text-xs text-amber-400/90 font-medium mb-1">Note:</p>
          {notes.map((note, i) => (
            <p key={i} className="text-xs text-muted-foreground leading-relaxed">
              • {note}
            </p>
          ))}
        </div>
      )}

      <Collapsible open={setupOpen} onOpenChange={setSetupOpen} className="mb-4 md:mb-5">
        <CollapsibleTrigger className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-full py-1.5 md:py-2">
          What's included in setup
          {setupOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="bg-background/60 rounded-lg px-3 py-2 md:px-4 md:py-3 mt-2 border border-border/30">
            <ul className="space-y-1 md:space-y-1.5">
              {setupIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 md:gap-2 text-xs text-muted-foreground">
                  <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Button 
        onClick={ctaAction}
        className={`w-full ${popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-foreground/10 hover:bg-foreground/15 text-foreground'} font-semibold py-3 md:py-5 rounded-xl transition-all text-sm md:text-base`}
      >
        {ctaText}
      </Button>
    </motion.div>
  );
};

export default PricingCard;
