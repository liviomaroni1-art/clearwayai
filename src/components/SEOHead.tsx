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
  title = "Clearway AI — AI Growth System for Service Businesses | Capture, Follow Up, Retain",
  description = "Clearway AI helps service businesses grow with AI that captures every lead, follows up automatically, reactivates old customers, and brings in more 5-star reviews. Built for HVAC, plumbing, electrical & more.",
  canonical = "https://clearwayai.co",
  ogImage = "https://clearwayai.co/og-image.png",
  ogType = "website",
  noIndex = false
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      <meta name="keywords" content="Clearway AI, AI growth system, AI receptionist, lead capture, customer reactivation, automated follow-up, review requests, service business automation, HVAC AI, plumbing AI, 24/7 answering" />
      
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Clearway AI" />
      <meta property="og:locale" content="en_US" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      <meta name="author" content="Clearway AI" />
      <meta name="geo.region" content="CH" />
      <meta name="geo.placename" content="Freienbach" />
      <meta name="theme-color" content="#00E0FF" />
      
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEOHead;
