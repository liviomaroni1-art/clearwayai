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
  "description": "Clearway AI builds and manages Meta ad campaigns, high-converting funnels, and AI-powered follow-up systems designed to help service businesses generate qualified leads and booked calls.",
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
  "serviceType": "Lead Generation & Appointment Setting",
  "provider": {
    "@type": "Organization",
    "name": "Clearway AI"
  },
  "name": "Meta Ads & AI Lead Generation for Service Businesses",
  "description": "Done-for-you Meta ad campaigns, high-converting funnels, and AI-powered follow-up systems that help service businesses generate qualified leads and booked calls.",
  "areaServed": {
    "@type": "Country",
    "name": "Switzerland"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's the difference between Leads Only and Booked Calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "With Leads Only, we deliver qualified leads directly to your CRM or inbox. With Booked Calls, our AI follow-up system also handles scheduling — so prospects land on your calendar ready to talk."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most campaigns go live within 7–14 days. That includes strategy, ad creative, funnel build, and AI follow-up setup."
      }
    },
    {
      "@type": "Question",
      "name": "What results can I expect?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Results depend on your offer, market, and budget. We don't make guarantees — but our system is designed to help you generate a consistent flow of qualified leads and reduce wasted ad spend."
      }
    },
    {
      "@type": "Question",
      "name": "What platforms do you run ads on?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We focus on Meta (Facebook & Instagram). These platforms typically offer strong targeting for local and online service businesses."
      }
    }
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Clearway AI",
  "image": "https://clearwayai.co/assets/clearway-logo.png",
  "telephone": "+41-76-471-56-78",
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
  "alternateName": ["ClearwayAI", "Clearway AI Lead Generation"],
  "url": "https://clearwayai.co",
  "description": "Clearway AI builds and manages Meta ad campaigns, funnels, and AI follow-up systems to help service businesses generate qualified leads and booked calls.",
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
