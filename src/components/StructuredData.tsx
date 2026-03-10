import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type: "organization" | "service" | "faq" | "localBusiness" | "website";
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Clearway AI",
  "url": "https://clearwayai.co",
  "logo": "https://clearwayai.co/assets/clearway-logo.png",
  "description": "Clearway AI runs Meta ad campaigns, builds high-converting funnels, and deploys AI follow-up agents that turn clicks into qualified leads and booked calls for service businesses.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Freienbach",
    "addressCountry": "CH"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@clearwayai.co",
    "contactType": "sales",
    "availableLanguage": ["English", "German"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/clearway-ai"
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Meta Ads & AI Lead Generation",
  "provider": {
    "@type": "Organization",
    "name": "Clearway AI"
  },
  "name": "Meta Ads & AI Lead Generation for Service Businesses",
  "description": "Done-for-you Meta ad campaigns, high-converting funnels, and AI follow-up agents that turn clicks into qualified leads and booked calls.",
  "areaServed": {
    "@type": "Place",
    "name": "Worldwide"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does the AI agent do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AI agent plugs into your existing funnels and forms, follows up with every new lead via email and SMS, asks qualifying questions (budget, timeline, needs), and books qualified sales calls directly into your calendar."
      }
    },
    {
      "@type": "Question",
      "name": "Who is Clearway AI for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clearway AI is built for B2B service businesses, agencies, and coaches who already generate leads and want to convert more of them into qualified sales conversations — without hiring additional SDRs."
      }
    },
    {
      "@type": "Question",
      "name": "What results can I expect?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Results depend on your offer, market, and lead volume. Our AI agents are designed to help you get more qualified calls, reduce manual follow-up, and improve show-up rates."
      }
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Clearway AI",
  "image": "https://clearwayai.co/assets/clearway-logo.png",
  "email": "hello@clearwayai.co",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Freienbach",
    "addressCountry": "CH"
  },
  "priceRange": "$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00",
    "timeZone": "Europe/Zurich"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Clearway AI",
  "alternateName": ["ClearwayAI", "Clearway AI Agents"],
  "url": "https://clearwayai.co",
  "description": "Meta ad campaigns, high-converting funnels, and AI follow-up agents that turn clicks into qualified leads and booked calls for service businesses."
};

const StructuredData = ({ type }: StructuredDataProps) => {
  const getSchema = () => {
    switch (type) {
      case "organization":
        return organizationSchema;
      case "service":
        return serviceSchema;
      case "faq":
        return faqSchema;
      case "localBusiness":
        return localBusinessSchema;
      case "website":
        return websiteSchema;
      default:
        return organizationSchema;
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchema())}
      </script>
    </Helmet>
  );
};

export default StructuredData;
