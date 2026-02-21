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
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const colors = colorClasses[color];
  const displayPrice = isAnnual ? priceAnnual : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative bg-gradient-to-b ${colors.bg} backdrop-blur-xl rounded-xl md:rounded-2xl p-3 md:p-5 lg:p-6 border ${colors.border} transition-all duration-300 flex flex-col ${popular ? 'ring-2 ring-primary/50' : ''}`}
    >
      {/* Popular / Enterprise Badge */}
      {popular && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Star className="w-2.5 h-2.5 fill-current" />
            Best Value
          </span>
        </div>
      )}
      {label && !popular && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="bg-muted text-muted-foreground text-[10px] md:text-xs font-semibold px-3 py-1 rounded-full border border-border">
            {label}
          </span>
        </div>
      )}

      <div className="text-center mb-3 md:mb-4 pt-1.5">
        <div className={`inline-flex items-center justify-center gap-1 md:gap-1.5 ${colors.text} mb-1.5 md:mb-2`}>
          <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="text-sm md:text-base font-bold">{name}</span>
        </div>
        
        <div className="mb-1">
          <span className={`text-xl md:text-3xl font-bold ${colors.text}`}>{displayPrice}</span>
          <span className="text-[10px] md:text-xs text-muted-foreground">/month</span>
        </div>
        
        {isAnnual && (
          <div className="text-[10px] md:text-xs text-primary font-medium mb-1">
            Save 10% with annual billing
          </div>
        )}
        
        <div className="text-[10px] md:text-xs text-muted-foreground mb-1.5 md:mb-2">
          One-time setup: <span className="font-medium text-foreground">{setup}</span>
        </div>

        <p className="text-[10px] md:text-xs text-foreground/90 leading-relaxed hidden md:block">
          {tagline}
        </p>
      </div>

      <div className="bg-background/40 rounded-lg px-2 py-1.5 md:px-3 md:py-2 text-center mb-3 md:mb-4 border border-border/30">
        <p className="text-[10px] md:text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Perfect for:</span> {idealFor}
        </p>
      </div>

      {/* Features: always visible on desktop, collapsible on mobile */}
      <div className="hidden md:block flex-grow">
        <ul className="space-y-1.5 mb-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs">
              <Check className={`w-3 h-3 ${colors.text} flex-shrink-0 mt-0.5`} />
              <span className={`${feature.italic ? 'italic text-muted-foreground/80' : 'text-muted-foreground'} ${feature.bold ? 'font-medium text-foreground' : ''}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: collapsible features */}
      <div className="md:hidden">
        <Collapsible open={featuresOpen} onOpenChange={setFeaturesOpen}>
          <CollapsibleTrigger className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors w-full py-1.5 bg-background/30 rounded-lg border border-border/20 mb-2">
            {featuresOpen ? "Hide features" : "See all features"}
            {featuresOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ul className="space-y-1 mb-2">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[10px]">
                  <Check className={`w-2.5 h-2.5 ${colors.text} flex-shrink-0 mt-0.5`} />
                  <span className={`${feature.italic ? 'italic text-muted-foreground/80' : 'text-muted-foreground'} ${feature.bold ? 'font-medium text-foreground' : ''}`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {notes && notes.length > 0 && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg px-2 py-1.5 md:px-3 md:py-2 mb-3 md:mb-4">
          <p className="text-[10px] text-amber-400/90 font-medium mb-0.5">Note:</p>
          {notes.map((note, i) => (
            <p key={i} className="text-[10px] text-muted-foreground leading-relaxed">
              • {note}
            </p>
          ))}
        </div>
      )}

      <Collapsible open={setupOpen} onOpenChange={setSetupOpen} className="mb-3 md:mb-4">
        <CollapsibleTrigger className="flex items-center justify-center gap-1 text-[10px] md:text-xs text-muted-foreground hover:text-foreground transition-colors w-full py-1">
          What's included in setup
          {setupOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="bg-background/60 rounded-lg px-2 py-1.5 md:px-3 md:py-2 mt-1.5 border border-border/30">
            <ul className="space-y-1">
              {setupIncludes.map((item, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[10px] md:text-xs text-muted-foreground">
                  <Check className="w-2.5 h-2.5 text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Button 
        onClick={ctaAction}
        className={`w-full ${popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-foreground/10 hover:bg-foreground/15 text-foreground'} font-semibold py-2 md:py-4 rounded-lg md:rounded-xl transition-all text-[11px] md:text-sm`}
      >
        {ctaText}
      </Button>
    </motion.div>
  );
};

export default PricingCard;
