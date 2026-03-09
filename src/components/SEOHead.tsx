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
  title = "Clearway AI — Meta Ads & AI Lead Generation for Service Businesses",
  description = "Clearway AI builds and manages Meta ad campaigns, high-converting funnels, and AI-powered follow-up to help service businesses generate qualified leads and booked calls.",
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
      
      <meta name="keywords" content="Clearway AI, Meta ads agency, lead generation, AI follow-up, Facebook ads, Instagram ads, booked calls, service business marketing, funnel building, AI lead nurture" />
      
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
      <meta name="theme-color" content="#050506" />
      
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEOHead;
