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

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  emerald: {
    bg: "from-emerald-500/10 to-emerald-600/5",
    border: "border-border/50 hover:border-emerald-500/40",
    text: "text-emerald-500",
  },
  violet: {
    bg: "from-primary/15 to-primary/5",
    border: "border-primary/30 hover:border-primary/50",
    text: "text-primary",
  },
  amber: {
    bg: "from-amber-500/10 to-amber-600/5",
    border: "border-border/50 hover:border-amber-500/40",
    text: "text-amber-500",
  },
  slate: {
    bg: "from-slate-400/10 to-slate-500/5",
    border: "border-border/50 hover:border-slate-400/40",
    text: "text-slate-300",
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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const colors = colorClasses[color];
  const displayPrice = isAnnual ? priceAnnual : price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`relative bg-gradient-to-b ${colors.bg} backdrop-blur-xl rounded-xl p-4 md:p-6 border ${colors.border} transition-all duration-300 flex flex-col ${popular ? 'ring-2 ring-primary/50' : ''}`}
    >
      {/* Badge */}
      {popular && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-[10px] font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Star className="w-2.5 h-2.5 fill-current" />
            Best Value
          </span>
        </div>
      )}
      {label && !popular && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="bg-muted text-muted-foreground text-[10px] font-semibold px-3 py-1 rounded-full border border-border">
            {label}
          </span>
        </div>
      )}

      {/* ── MOBILE: Compact horizontal layout ── */}
      <div className="md:hidden">
        <div className="flex items-start justify-between gap-3 pt-1">
          <div className="flex-1 min-w-0">
            <div className={`inline-flex items-center gap-1 ${colors.text} mb-1`}>
              <Icon className="w-3.5 h-3.5" />
              <span className="text-sm font-bold">{name}</span>
            </div>
            <div className="mb-0.5">
              <span className={`text-xl font-bold ${colors.text}`}>{displayPrice}</span>
              <span className="text-[10px] text-muted-foreground">/mo</span>
            </div>
            <div className="text-[10px] text-muted-foreground">
              Setup: <span className="font-medium text-foreground">{setup}</span>
            </div>
          </div>
          <Button
            onClick={ctaAction}
            size="sm"
            className={`flex-shrink-0 ${popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-foreground/10 hover:bg-foreground/15 text-foreground'} text-[11px] font-semibold rounded-lg px-3 py-1.5 h-auto`}
          >
            {ctaText}
          </Button>
        </div>

        <p className="text-[10px] text-muted-foreground mt-1.5 mb-2">
          <span className="font-medium text-foreground">For:</span> {idealFor}
        </p>

        {isAnnual && (
          <div className="text-[10px] text-primary font-medium mb-1.5">Save 10% annually</div>
        )}

        {/* Expandable details */}
        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
          <CollapsibleTrigger className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors w-full py-1.5 rounded-lg border border-border/30 bg-background/30">
            {detailsOpen ? "Hide details" : "See what's included"}
            {detailsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 space-y-2">
              <ul className="space-y-1">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[11px]">
                    <Check className={`w-3 h-3 ${colors.text} flex-shrink-0 mt-0.5`} />
                    <span className={`${feature.italic ? 'italic text-muted-foreground' : 'text-muted-foreground'} ${feature.bold ? 'font-medium text-foreground' : ''}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {notes && notes.length > 0 && (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg px-2 py-1.5">
                  <p className="text-[10px] text-amber-400/90 font-medium mb-0.5">Note:</p>
                  {notes.map((note, i) => (
                    <p key={i} className="text-[10px] text-muted-foreground leading-relaxed">• {note}</p>
                  ))}
                </div>
              )}

              <div className="bg-background/60 rounded-lg px-2 py-1.5 border border-border/30">
                <p className="text-[10px] text-muted-foreground font-medium mb-1">Setup includes:</p>
                <ul className="space-y-0.5">
                  {setupIncludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-[10px] text-muted-foreground">
                      <Check className="w-2.5 h-2.5 text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* ── DESKTOP: Full vertical layout ── */}
      <div className="hidden md:flex md:flex-col md:flex-1">
        <div className="text-center mb-4 pt-1">
          <div className={`inline-flex items-center justify-center gap-1.5 ${colors.text} mb-2`}>
            <Icon className="w-4 h-4" />
            <span className="text-base font-bold">{name}</span>
          </div>
          
          <div className="mb-1">
            <span className={`text-3xl font-bold ${colors.text}`}>{displayPrice}</span>
            <span className="text-xs text-muted-foreground">/month</span>
          </div>
          
          {isAnnual && (
            <div className="text-xs text-primary font-medium mb-1">Save 10% with annual billing</div>
          )}
          
          <div className="text-xs text-muted-foreground mb-2">
            One-time setup: <span className="font-medium text-foreground">{setup}</span>
          </div>

          <p className="text-xs text-foreground/90 leading-relaxed">{tagline}</p>
        </div>

        <div className="bg-background/40 rounded-lg px-3 py-2 text-center mb-4 border border-border/30">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Perfect for:</span> {idealFor}
          </p>
        </div>

        <ul className="space-y-1.5 mb-4 flex-grow">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs">
              <Check className={`w-3 h-3 ${colors.text} flex-shrink-0 mt-0.5`} />
              <span className={`${feature.italic ? 'italic text-muted-foreground' : 'text-muted-foreground'} ${feature.bold ? 'font-medium text-foreground' : ''}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {notes && notes.length > 0 && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2 mb-4">
            <p className="text-[10px] text-amber-400/90 font-medium mb-0.5">Note:</p>
            {notes.map((note, i) => (
              <p key={i} className="text-[10px] text-muted-foreground leading-relaxed">• {note}</p>
            ))}
          </div>
        )}

        <Collapsible className="mb-4">
          <CollapsibleTrigger className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-full py-1">
            What's included in setup
            <ChevronDown className="w-3 h-3" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="bg-background/60 rounded-lg px-3 py-2 mt-1.5 border border-border/30">
              <ul className="space-y-1">
                {setupIncludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
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
          className={`w-full ${popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-foreground/10 hover:bg-foreground/15 text-foreground'} font-semibold py-4 rounded-xl transition-all text-sm`}
        >
          {ctaText}
        </Button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
