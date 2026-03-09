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
  "description": "Clearway AI is an AI growth system for service businesses — capturing leads, automating follow-ups, reactivating customers, and driving 5-star reviews. Swiss-built for US businesses.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Freienbach",
    "addressCountry": "CH"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+41-76-471-56-78",
    "contactType": "sales",
    "availableLanguage": ["English", "German", "French", "Spanish"]
  },
  "sameAs": [
    "https://linkedin.com/company/clearwayai",
    "https://x.com/clearwayai",
    "https://youtube.com/@clearwayai"
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "AI Growth System",
  "provider": {
    "@type": "Organization",
    "name": "Clearway AI"
  },
  "name": "AI Growth System for Service Businesses",
  "description": "AI-powered system that captures every lead 24/7, automates follow-ups, reactivates past customers, and generates 5-star reviews for service businesses.",
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Pro Practice Plan",
      "price": "2500",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "2500",
        "priceCurrency": "USD",
        "billingDuration": "P1M"
      }
    },
    {
      "@type": "Offer",
      "name": "Team Pro Plan",
      "price": "3500",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "3500",
        "priceCurrency": "USD",
        "billingDuration": "P1M"
      }
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are you replacing my staff?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. We handle the calls, follow-ups, and reminders your team doesn't have time for — so they can focus on delivering great service."
      }
    },
    {
      "@type": "Question",
      "name": "How fast can we go live?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most businesses are live within ~72 hours after completing a short onboarding call. We handle all setup, integrations, and testing."
      }
    },
    {
      "@type": "Question",
      "name": "What if a caller needs a human?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AI knows when to escalate. Complex or sensitive inquiries are transferred to your team via live call transfer, SMS, or email."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All data is encrypted in transit and at rest. We use enterprise-grade infrastructure and offer BAAs for healthcare practices."
      }
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Clearway AI",
  "image": "https://clearwayai.co/assets/clearway-logo.png",
  "telephone": "+41-76-471-46-78",
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
    "opens": "06:00",
    "closes": "18:00",
    "timeZone": "Europe/Zurich"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Clearway AI",
  "alternateName": ["ClearwayAI", "Clearway AI Growth System"],
  "url": "https://clearwayai.co",
  "description": "Clearway AI is an AI growth system that helps service businesses capture leads, automate follow-ups, reactivate customers, and grow 5-star reviews.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://clearwayai.co/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
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
