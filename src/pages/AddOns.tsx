import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Target, FileText, BarChart3, Plug, Handshake, 
  Check, ArrowRight, Gift, ChevronDown, ChevronUp, 
  Sparkles, TrendingUp, Settings, Zap, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Category = "all" | "growth" | "operations" | "integrations" | "strategy";
type SortOption = "popular" | "price-low" | "impact";

interface AddOn {
  name: string;
  icon: React.ElementType;
  setup: string;
  monthly: string;
  usageBased?: boolean;
  usageNote?: string;
  description: string;
  shortBenefits: string[];
  allFeatures: string[];
  category: Category;
  popular?: boolean;
  premium?: boolean;
  impactScore: number;
  monthlyValue: number;
}

const addOns: AddOn[] = [
  {
    name: "Website Chat Support",
    icon: Globe,
    setup: "$1,500",
    monthly: "$250",
    description: "Convert visitors into leads instantly—24/7 answers + capture.",
    shortBenefits: [
      "Capture leads 24/7",
      "Instant visitor answers",
      "Seamless handoff to team"
    ],
    allFeatures: [
      "Customizable chat widget",
      "Lead capture forms",
      "Knowledge base integration",
      "Handoff to human agents",
      "Visitor analytics",
      "Mobile-responsive design"
    ],
    category: "growth",
    popular: true,
    impactScore: 90,
    monthlyValue: 250
  },
  {
    name: "Email Automation",
    icon: Mail,
    setup: "$2,000",
    monthly: "$400",
    usageBased: true,
    usageNote: "Usage billed at $0.02/email after 5,000/mo",
    description: "Turn inquiries into booked appointments with follow-ups.",
    shortBenefits: [
      "Auto-respond to inquiries",
      "Smart follow-up sequences",
      "CRM sync included"
    ],
    allFeatures: [
      "Auto-response to inquiries",
      "Follow-up sequences",
      "CRM integration",
      "Performance analytics",
      "A/B testing",
      "Template library"
    ],
    category: "growth",
    impactScore: 85,
    monthlyValue: 400
  },
  {
    name: "Document Processing (OCR)",
    icon: FileText,
    setup: "$3,000",
    monthly: "$300",
    usageBased: true,
    usageNote: "Usage billed at $0.05/page after 1,000/mo",
    description: "Extract structured data from docs—reduce manual entry.",
    shortBenefits: [
      "Intelligent OCR extraction",
      "Auto-fill forms",
      "Full audit trail"
    ],
    allFeatures: [
      "Intelligent OCR",
      "Form auto-fill",
      "Data validation",
      "Audit trail",
      "Multi-format support",
      "Custom field mapping"
    ],
    category: "operations",
    impactScore: 70,
    monthlyValue: 300
  },
  {
    name: "Lead Qualification",
    icon: Target,
    setup: "$2,000",
    monthly: "$400",
    usageBased: true,
    usageNote: "Usage billed at $0.10/lead after 500/mo",
    description: "Score and route leads so your team focuses on buyers.",
    shortBenefits: [
      "Custom scoring criteria",
      "Priority lead ranking",
      "Smart routing rules"
    ],
    allFeatures: [
      "Custom scoring criteria",
      "Priority ranking",
      "Intent signals",
      "Routing rules",
      "Lead enrichment",
      "Conversion tracking"
    ],
    category: "growth",
    popular: true,
    impactScore: 88,
    monthlyValue: 400
  },
  {
    name: "Reporting & QBR",
    icon: BarChart3,
    setup: "$2,500",
    monthly: "$450",
    description: "Dashboards + quarterly reviews to track ROI and improve.",
    shortBenefits: [
      "Custom dashboards",
      "Quarterly business reviews",
      "ROI tracking included"
    ],
    allFeatures: [
      "Custom dashboards",
      "Quarterly reviews",
      "ROI tracking",
      "Performance recommendations",
      "Trend analysis",
      "Executive summaries"
    ],
    category: "strategy",
    impactScore: 75,
    monthlyValue: 450
  },
  {
    name: "Custom Integrations",
    icon: Plug,
    setup: "$4,000+",
    monthly: "$600",
    description: "Connect your stack with tailored API + bi-directional sync.",
    shortBenefits: [
      "Custom API development",
      "Bi-directional sync",
      "Dedicated maintenance"
    ],
    allFeatures: [
      "Custom API development",
      "Bi-directional sync",
      "Webhook support",
      "Dedicated maintenance",
      "Documentation",
      "Technical support"
    ],
    category: "integrations",
    impactScore: 80,
    monthlyValue: 600
  },
  {
    name: "Long-Term Partnership",
    icon: Handshake,
    setup: "$6,000",
    monthly: "$1,200",
    description: "Ongoing optimization, strategy, and priority support.",
    shortBenefits: [
      "Dedicated account manager",
      "Strategic consulting",
      "Priority development queue"
    ],
    allFeatures: [
      "Dedicated account manager",
      "Strategic consulting",
      "Priority development",
      "Quarterly strategy sessions",
      "Custom feature requests",
      "24/7 priority support"
    ],
    category: "strategy",
    premium: true,
    impactScore: 95,
    monthlyValue: 1200
  }
];

const categories = [
  { value: "all" as Category, label: "All", icon: Sparkles },
  { value: "growth" as Category, label: "Growth", icon: TrendingUp },
  { value: "operations" as Category, label: "Operations", icon: Settings },
  { value: "integrations" as Category, label: "Integrations", icon: Plug },
  { value: "strategy" as Category, label: "Strategy", icon: Zap },
];

const sortOptions = [
  { value: "popular" as SortOption, label: "Most popular" },
  { value: "price-low" as SortOption, label: "Lowest monthly" },
  { value: "impact" as SortOption, label: "Highest impact" },
];

const getCategoryLabel = (category: Category) => {
  const cat = categories.find(c => c.value === category);
  return cat?.label || "Add-On";
};

const AddOnCard = ({ addon, index }: { addon: AddOn; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`
        group relative bg-card border border-border/60 rounded-2xl p-6 
        flex flex-col h-full
        hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 
        hover:-translate-y-0.5 transition-all duration-300
        ${addon.premium ? 'lg:col-span-3 bg-gradient-to-br from-card to-primary/5' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <addon.icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground text-[17px] leading-tight">
            {addon.name}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {addon.popular && (
            <span className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide bg-primary/20 text-primary rounded-full">
              Popular
            </span>
          )}
          {addon.premium && (
            <span className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide bg-amber-500/20 text-amber-400 rounded-full">
              Premium
            </span>
          )}
          <span className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide bg-muted text-muted-foreground rounded-full">
            {getCategoryLabel(addon.category)}
          </span>
        </div>
      </div>

      {/* Value Statement */}
      <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
        {addon.description}
      </p>

      {/* Pricing Block */}
      <div className="bg-muted/40 border border-border/50 rounded-xl p-3 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Setup fee</p>
            <p className="text-lg font-bold text-foreground">{addon.setup}</p>
          </div>
          <div className="text-center border-l border-border/50">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Monthly</p>
            <div className="flex items-center justify-center gap-1">
              <p className="text-lg font-bold text-primary">{addon.monthly}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
              {addon.usageBased && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">+ usage</span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-card border-border">
                      <p className="text-xs">{addon.usageNote}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="flex-grow">
        <ul className="space-y-2 mb-3">
          {addon.shortBenefits.map((benefit, i) => (
            <li key={i} className="flex items-center gap-2 text-[13px] text-muted-foreground">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        {/* Expandable Details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors mb-4"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3 h-3" />
              Hide details
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              See all features
            </>
          )}
        </button>
        
        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1.5 mb-4 overflow-hidden"
            >
              {addon.allFeatures.slice(3).map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-[12px] text-muted-foreground/80">
                  <Check className="w-3 h-3 text-primary/60 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
        <Button 
          variant="outline" 
          size="sm"
          className="flex-1 border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          asChild
        >
          <Link to="/contact">
            Add to Plan
          </Link>
        </Button>
        <Link 
          to="/contact" 
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Talk to us
        </Link>
      </div>
    </motion.div>
  );
};

const AddOns = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const filteredAddOns = addOns
    .filter(addon => activeCategory === "all" || addon.category === activeCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.monthlyValue - b.monthlyValue;
        case "impact":
          return b.impactScore - a.impactScore;
        case "popular":
        default:
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return b.impactScore - a.impactScore;
      }
    });

  // Separate premium card for special treatment
  const premiumCard = filteredAddOns.find(a => a.premium);
  const regularCards = filteredAddOns.filter(a => !a.premium);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-36 pb-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 max-w-2xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Optional <span className="gradient-text">Add-Ons</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Enhance your core plan only if needed. Bundle 2+ add-ons to save 15%.
            </p>
          </motion.div>

          {/* Bundle Discount Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-10"
          >
            <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Bundle & Save 15%</p>
                <p className="text-xs text-muted-foreground">Add 2 or more services to your plan and save 15% on all monthly fees.</p>
              </div>
            </div>
          </motion.div>

          {/* Filters + Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-6xl mx-auto mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                      ${activeCategory === cat.value 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }
                    `}
                  >
                    <cat.icon className="w-3 h-3" />
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={(v: SortOption) => setSortBy(v)}>
                <SelectTrigger className="w-[160px] h-9 text-xs bg-muted/50 border-border/50">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {sortOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Add-Ons Grid */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {regularCards.map((addon, index) => (
                <AddOnCard key={addon.name} addon={addon} index={index} />
              ))}
            </div>

            {/* Premium Card - Full Width */}
            {premiumCard && (
              <div className="mt-5">
                <AddOnCard addon={premiumCard} index={regularCards.length} />
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-xl mx-auto"
          >
            <p className="text-muted-foreground mb-6">
              Not sure which add-ons you need? We'll help you decide during your demo.
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
