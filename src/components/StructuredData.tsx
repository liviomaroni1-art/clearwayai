import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type: "organization" | "service" | "faq" | "localBusiness";
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Clearway AI",
  "url": "https://clearwayai.co",
  "logo": "https://clearwayai.co/assets/clearway-logo.png",
  "description": "AI receptionist service that answers calls 24/7, books appointments, and syncs with your CRM. Swiss-built for US businesses.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Freienbach",
    "addressCountry": "CH"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-888-778-3091",
    "contactType": "sales",
    "availableLanguage": ["English", "German", "French", "Spanish"]
  },
  "sameAs": [
    "https://linkedin.com/company/clearwayai"
  ]
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "AI Receptionist",
  "provider": {
    "@type": "Organization",
    "name": "Clearway AI"
  },
  "name": "AI Phone Receptionist",
  "description": "24/7 AI-powered phone answering service that books appointments, routes calls, and integrates with your CRM.",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Signature Plan",
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
      "name": "Elite Plan",
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
      "name": "How quickly can the AI receptionist be set up?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most businesses are live within 72 hours. Our team handles the complete setup including voice customization, calendar integration, and CRM connection."
      }
    },
    {
      "@type": "Question",
      "name": "Does the AI sound robotic?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Our AI uses advanced voice synthesis that sounds natural and professional. You can call our demo line at +1 (888) 778-3091 to hear it yourself."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if the AI can't answer a question?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The AI gracefully transfers complex inquiries to your team via call transfer, email notification, or SMS—ensuring no lead falls through the cracks."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All calls are encrypted in transit and at rest. We use SOC 2 compliant infrastructure and are headquartered in Switzerland with strict data protection standards."
      }
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Clearway AI",
  "image": "https://clearwayai.co/assets/clearway-logo.png",
  "telephone": "+1-888-778-3091",
  "email": "sales@clearwayai.co",
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
    "timeZone": "America/Los_Angeles"
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
