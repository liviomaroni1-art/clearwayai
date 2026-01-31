import { Rocket, Diamond, Crown, Building2, Globe, Target, FileText, BarChart3, Plug, Handshake } from "lucide-react";

export const plans = [
  {
    name: "Solo Launch",
    icon: Rocket,
    price: "$1,500",
    priceAnnual: "$1,200",
    setup: "$1,000",
    tagline: "Professional 24/7 AI reception for independent providers.",
    idealFor: "Solo practitioners and small businesses ready to never miss a call again.",
    color: "emerald",
    features: [
      { text: "1,000 minutes/month (inbound + outbound)", bold: true },
      { text: "Overage: $0.50/min beyond included", bold: false },
      { text: "24/7 AI call answering with natural voice", bold: false },
      { text: "Google Calendar or Outlook sync", bold: false },
      { text: "Call summaries via email after each call", bold: false },
      { text: "1 dedicated business number included", bold: false },
      { text: "Weekly call insights (peak hours, call reasons)", bold: false },
      { text: "Email support (24h response)", bold: false }
    ],
    setupIncludes: [
      "AI receptionist configuration",
      "Custom call flow design",
      "Voice & tone personalization",
      "Calendar integration setup",
      "Testing & go-live support"
    ],
    sla: { firstResponse: "24 hours", resolution: "72 hours" },
    ctaText: "Start with Solo",
    popular: false
  },
  {
    name: "Pro Practice",
    icon: Diamond,
    price: "$2,500",
    priceAnnual: "$2,000",
    setup: "$1,500",
    tagline: "Capture every lead with CRM sync and automated follow-ups.",
    idealFor: "Growing practices that need consistent lead capture and client follow-up.",
    color: "violet",
    features: [
      { text: "2,000 minutes/month (inbound + outbound)", bold: true },
      { text: "Overage: $0.50/min beyond included", bold: false },
      { text: "Everything in Solo Launch, plus:", bold: false, italic: true },
      { text: "CRM integration (Salesforce, HubSpot, SimplePractice)", bold: true },
      { text: "Automated SMS & email appointment reminders", bold: true },
      { text: "Lead capture & booking rate analytics", bold: false },
      { text: "2 dedicated business numbers included", bold: false },
      { text: "Email + chat support (8h response)", bold: false }
    ],
    setupIncludes: [
      "Everything in Solo Launch setup",
      "CRM integration & field mapping",
      "Reminder automation setup",
      "Lead routing configuration",
      "30-min training session"
    ],
    sla: { firstResponse: "8 hours", resolution: "48 hours" },
    ctaText: "Book a Demo",
    popular: true
  },
  {
    name: "Team Pro",
    icon: Crown,
    price: "$3,500",
    priceAnnual: "$2,800",
    setup: "$2,000",
    tagline: "Intelligent routing and scheduling for multi-staff offices.",
    idealFor: "Busy teams of 3+ who need smart call routing and shared calendars.",
    color: "amber",
    features: [
      { text: "3,000 minutes/month (inbound + outbound)", bold: true },
      { text: "Overage: $0.50/min beyond included", bold: false },
      { text: "Everything in Pro Practice, plus:", bold: false, italic: true },
      { text: "Smart call routing by staff or department", bold: true },
      { text: "Multi-calendar team scheduling", bold: true },
      { text: "Custom IVR menus & call flows", bold: false },
      { text: "Bi-weekly optimization calls with our team", bold: false },
      { text: "5 dedicated business numbers included", bold: false },
      { text: "Phone + chat support (4h response)", bold: false }
    ],
    setupIncludes: [
      "Everything in Pro Practice setup",
      "Multi-staff routing configuration",
      "IVR menu design & setup",
      "Team calendar integration",
      "1-hour team training session"
    ],
    sla: { firstResponse: "4 hours", resolution: "24 hours" },
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
    idealFor: "Enterprise teams, healthcare systems, and multi-location businesses with custom needs.",
    color: "slate",
    features: [
      { text: "8,000+ minutes (custom volume available)", bold: true },
      { text: "Overage: Custom rates based on volume", bold: false },
      { text: "Everything in Team Pro, plus:", bold: false, italic: true },
      { text: "Dedicated account manager (weekly calls)", bold: true },
      { text: "Custom voice cloning for brand consistency", bold: true },
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
    sla: { firstResponse: "1 hour", resolution: "8 hours" },
    notes: [
      "HIPAA/BAA available—scoped to your specific systems and workflows.",
      "EHR integration (Epic, Cerner, etc.) quoted separately based on requirements."
    ],
    ctaText: "Talk to Sales",
    popular: false
  }
];

// Add-on services with separate pricing
export const addOnServices = [
  {
    name: "Website Creation",
    icon: Globe,
    setup: "$1,500",
    monthly: "$250",
    description: "SEO-optimized landing pages with integrated booking and lead capture.",
    features: [
      "Mobile-responsive design",
      "Booking integration",
      "SEO optimization",
      "Lead capture forms"
    ],
    color: "emerald"
  },
  {
    name: "Lead Qualification",
    icon: Target,
    setup: "$2,000",
    monthly: "$400",
    usageBased: true,
    description: "AI-powered lead scoring and prioritization to focus on high-value prospects.",
    features: [
      "AI scoring algorithm",
      "Priority ranking",
      "CRM sync",
      "Custom qualification criteria"
    ],
    color: "violet"
  },
  {
    name: "Document Processing",
    icon: FileText,
    setup: "$3,000",
    monthly: "$300",
    usageBased: true,
    description: "OCR and data extraction to eliminate manual entry and reduce errors.",
    features: [
      "Intelligent OCR",
      "Data extraction",
      "Form auto-fill",
      "Audit trail"
    ],
    color: "amber"
  },
  {
    name: "Reporting & QBR",
    icon: BarChart3,
    setup: "$2,500",
    monthly: "$450",
    usageBased: true,
    description: "Custom dashboards and quarterly business reviews with actionable insights.",
    features: [
      "Custom dashboards",
      "Quarterly reviews",
      "Performance metrics",
      "ROI tracking"
    ],
    color: "slate"
  },
  {
    name: "Custom Integration",
    icon: Plug,
    setup: "$4,000",
    monthly: "$600",
    description: "Connect any CRM, EHR, or business tool via custom API development.",
    features: [
      "Custom API development",
      "Bi-directional sync",
      "Webhook support",
      "Dedicated maintenance"
    ],
    color: "emerald"
  },
  {
    name: "Long-Term Partnership",
    icon: Handshake,
    setup: "$6,000",
    monthly: "$1,200",
    description: "White-glove implementation with dedicated support and strategic consulting.",
    features: [
      "Pilot program",
      "Strategic consulting",
      "Priority development",
      "Executive sponsor"
    ],
    color: "violet"
  }
];

// Billing rules
export const billingRules = {
  overageRate: "$0.50",
  usageWarning: "80%",
  annualDiscount: "20%",
  bundleDiscount: "15%",
  bundleMinimum: 2,
  cancellationNotice: "3 months",
  longTermCommitment: {
    months: 36,
    discount: "20%",
    setupWaived: true
  }
};

// SLA tiers
export const slaTiers = [
  { tier: "Standard", plan: "Solo Launch", firstResponse: "24 hours", resolution: "72 hours" },
  { tier: "Priority", plan: "Pro Practice", firstResponse: "8 hours", resolution: "48 hours" },
  { tier: "Premium", plan: "Team Pro", firstResponse: "4 hours", resolution: "24 hours" },
  { tier: "Concierge", plan: "Concierge AI", firstResponse: "1 hour", resolution: "8 hours" }
];
