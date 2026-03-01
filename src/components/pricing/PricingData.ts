import { Rocket, Diamond, Users, Building2 } from "lucide-react";

export const plans = [
  {
    name: "Solo Launch",
    icon: Rocket,
    price: "$1,500",
    priceAnnual: "$1,200",
    setup: "$1,000",
    tagline: "Lead capture + follow-ups for solo operators.",
    idealFor: "Solo contractors who need every call and lead handled.",
    color: "emerald",
    features: [
      { text: "1,000 minutes/month (inbound + outbound)", bold: true },
      { text: "Overage: $0.50/min beyond included", bold: false },
      { text: "24/7 AI call & inquiry answering", bold: false },
      { text: "Missed-call SMS follow-up", bold: true },
      { text: "Google Calendar or Outlook sync", bold: false },
      { text: "Call summaries + lead logging", bold: false },
      { text: "1 dedicated business number", bold: false },
      { text: "Email support (24h response)", bold: false }
    ],
    setupIncludes: [
      "AI system configuration",
      "Custom call flow design",
      "Follow-up sequence setup",
      "Calendar integration",
      "Testing & go-live support"
    ],
    ctaText: "Book a Growth Audit",
    popular: false
  },
  {
    name: "Pro Practice",
    icon: Diamond,
    price: "$2,500",
    priceAnnual: "$2,000",
    setup: "$1,500",
    tagline: "Full growth system with CRM, reactivation & reviews.",
    idealFor: "Growing businesses that need CRM sync + automated growth.",
    color: "violet",
    features: [
      { text: "2,000 minutes/month (inbound + outbound)", bold: true },
      { text: "Overage: $0.50/min beyond included", bold: false },
      { text: "Everything in Solo Launch, plus:", bold: false, italic: true },
      { text: "CRM integration (HubSpot, ServiceTitan, etc.)", bold: true },
      { text: "Customer reactivation campaigns", bold: true },
      { text: "Post-job review requests", bold: true },
      { text: "Automated SMS & email reminders", bold: false },
      { text: "2 dedicated business numbers", bold: false },
      { text: "Email + chat support (8h response)", bold: false }
    ],
    setupIncludes: [
      "Everything in Solo Launch setup",
      "CRM integration & field mapping",
      "Reactivation campaign setup",
      "Review request workflow",
      "30-min training session"
    ],
    ctaText: "Book a Growth Audit",
    popular: true
  },
  {
    name: "Team Pro",
    icon: Users,
    price: "$3,500",
    priceAnnual: "$2,800",
    setup: "$2,000",
    tagline: "Multi-staff routing + full growth automation.",
    idealFor: "Teams of 3+ with multiple calendars and departments.",
    color: "amber",
    features: [
      { text: "3,000 minutes/month (inbound + outbound)", bold: true },
      { text: "Overage: $0.50/min beyond included", bold: false },
      { text: "Everything in Pro Practice, plus:", bold: false, italic: true },
      { text: "Smart call routing by staff/department", bold: true },
      { text: "Multi-calendar team scheduling", bold: true },
      { text: "Advanced reactivation segmentation", bold: false },
      { text: "Custom IVR menus & call flows", bold: false },
      { text: "5 dedicated business numbers", bold: false },
      { text: "Phone + chat support (4h response)", bold: false }
    ],
    setupIncludes: [
      "Everything in Pro Practice setup",
      "Multi-staff routing configuration",
      "IVR menu design & setup",
      "Team calendar integration",
      "1-hour team training session"
    ],
    ctaText: "Book a Growth Audit",
    popular: false
  },
  {
    name: "Concierge AI",
    label: "Enterprise",
    icon: Building2,
    price: "$5,000+",
    priceAnnual: "$4,000+",
    setup: "$3,000",
    tagline: "White-glove growth system for multi-location businesses.",
    idealFor: "Multi-location or compliance-focused organizations.",
    color: "slate",
    features: [
      { text: "8,000+ minutes (custom volume available)", bold: true },
      { text: "Overage: Custom rates based on volume", bold: false },
      { text: "Everything in Team Pro, plus:", bold: false, italic: true },
      { text: "Dedicated account manager", bold: true },
      { text: "Custom voice cloning for brand", bold: true },
      { text: "Performance-based pricing option", bold: true },
      { text: "Unlimited business numbers", bold: false },
      { text: "Priority 24/7 support (1h response)", bold: false },
      { text: "Custom integrations & API access", bold: false }
    ],
    setupIncludes: [
      "Everything in Team Pro setup",
      "Custom integration development",
      "Voice cloning & brand alignment",
      "Dedicated onboarding manager",
      "Full team training sessions"
    ],
    notes: [
      "BAA available for HIPAA-aligned workflows.",
      "Optional: performance model (no setup fee, small % of extra revenue)."
    ],
    ctaText: "Talk to Sales",
    popular: false
  }
];

export const billingRules = {
  overageRate: "$0.50",
  usageWarning: "80%",
  annualDiscount: "20%",
  bundleDiscount: "15%",
  bundleMinimum: 2,
  cancellationNotice: "90 days",
  longTermCommitment: {
    months: 36,
    discount: "20%",
    setupWaived: true
  }
};
