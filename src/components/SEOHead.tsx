import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SEOHead = ({
  title = "AI-Powered Business Automation | 24/7 AI Receptionist | ClearwayAI",
  description = "Never miss another call. ClearwayAI's AI receptionist answers 24/7, books appointments, and updates your CRM. Built for clinics, law firms & service businesses. Live in 72 hours.",
  canonical = "https://clearwayai.co",
  ogImage = "https://clearwayai.co/og-image.png",
  ogType = "website",
  noIndex = false
}: SEOHeadProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      {/* Keywords for SEO */}
      <meta name="keywords" content="AI receptionist, virtual receptionist, 24/7 answering service, appointment booking AI, CRM automation, business automation, call answering service" />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="ClearwayAI" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <meta name="author" content="ClearwayAI" />
      <meta name="geo.region" content="CH" />
      <meta name="geo.placename" content="Freienbach" />
      <meta name="theme-color" content="#00E0FF" />
      
      {/* Structured breadcrumb support */}
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEOHead;
