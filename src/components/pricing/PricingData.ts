import { Rocket, Diamond, Users, Building2 } from "lucide-react";

export const plans = [
  {
    name: "Solo Launch",
    icon: Rocket,
    price: "$1,500",
    priceAnnual: "$1,200",
    setup: "$1,000",
    tagline: "Professional 24/7 AI reception for independent providers.",
    idealFor: "Solo practitioners and small businesses that need reliable 24/7 call coverage.",
    color: "emerald",
    features: [
      { text: "1,000 minutes/month (inbound + outbound)", bold: true },
      { text: "Overage: $0.50/min beyond included", bold: false },
      { text: "24/7 AI call answering (<2s pickup target)", bold: false },
      { text: "Google Calendar or Outlook sync", bold: false },
      { text: "Call summaries via email", bold: false },
      { text: "1 dedicated business number", bold: false },
      { text: "Email support (24h response)", bold: false }
    ],
    setupIncludes: [
      "AI receptionist configuration",
      "Custom call flow design",
      "Voice & tone personalization",
      "Calendar integration setup",
      "Testing & go-live support"
    ],
    ctaText: "Book a Demo",
    popular: false
  },
  {
    name: "Pro Practice",
    icon: Diamond,
    price: "$2,500",
    priceAnnual: "$2,000",
    setup: "$1,500",
    tagline: "Capture every lead with CRM sync and automated follow-ups.",
    idealFor: "Growing practices that need CRM sync, automated reminders, or consistent lead tracking.",
    color: "violet",
    features: [
      { text: "2,000 minutes/month (inbound + outbound)", bold: true },
      { text: "Overage: $0.50/min beyond included", bold: false },
      { text: "Everything in Solo Launch, plus:", bold: false, italic: true },
      { text: "CRM integration (HubSpot, Salesforce, Pipedrive)", bold: true },
      { text: "Automated SMS & email reminders", bold: true },
      { text: "Lead capture & booking analytics", bold: false },
      { text: "2 dedicated business numbers", bold: false },
      { text: "Email + chat support (8h response)", bold: false }
    ],
    setupIncludes: [
      "Everything in Solo Launch setup",
      "CRM integration & field mapping",
      "Reminder automation setup",
      "Lead routing configuration",
      "30-min training session"
    ],
    ctaText: "Book a Demo",
    popular: true
  },
  {
    name: "Team Pro",
    icon: Users,
    price: "$3,500",
    priceAnnual: "$2,800",
    setup: "$2,000",
    tagline: "Intelligent routing and scheduling for multi-staff offices.",
    idealFor: "Teams of 3+ that need intelligent routing + shared calendars.",
    color: "amber",
    features: [
      { text: "3,000 minutes/month (inbound + outbound)", bold: true },
      { text: "Overage: $0.50/min beyond included", bold: false },
      { text: "Everything in Pro Practice, plus:", bold: false, italic: true },
      { text: "Smart call routing by staff/department", bold: true },
      { text: "Multi-calendar team scheduling", bold: true },
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
    ctaText: "Book a Demo",
    popular: false
  },
  {
    name: "Concierge AI",
    label: "Enterprise",
    icon: Building2,
    price: "$5,000+",
    priceAnnual: "$4,000+",
    setup: "$3,000",
    tagline: "White-glove service for multi-location and compliance-focused organizations.",
    idealFor: "Multi-location businesses, healthcare systems, or organizations with compliance requirements.",
    color: "slate",
    features: [
      { text: "8,000+ minutes (custom volume available)", bold: true },
      { text: "Overage: Custom rates based on volume", bold: false },
      { text: "Everything in Team Pro, plus:", bold: false, italic: true },
      { text: "Dedicated account manager", bold: true },
      { text: "Custom voice cloning for brand", bold: true },
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
      "EHR integration quoted separately."
    ],
    ctaText: "Talk to Sales",
    popular: false
  }
];

// Billing rules
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
