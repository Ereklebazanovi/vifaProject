
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  structuredData?: object;
  articleMeta?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData,
  articleMeta
}) => {
  const { currentLanguage } = useLanguage();
  const location = useLocation();

  // Determine if current route should show VIFA Digital branding (Marketing only)
  const isVifaRoute = () => {
    const path = location.pathname;
    return path.includes('/services/digital-advertising') || path.includes('/about');
  };

  const isVifa = isVifaRoute();

  // Conditional branding configuration
  const brandConfig = isVifa ? {
    siteName: "VIFA Digital",
    siteTitle: currentLanguage === 'ka'
      ? "VIFA Digital - ციფრული მარკეტინგის სააგენტო საქართველოში"
      : "VIFA Digital - Digital Marketing Agency in Georgia",
    defaultDescription: currentLanguage === 'ka'
      ? "VIFA Digital - ციფრული მარკეტინგის სააგენტო საქართველოში. Facebook რეკლამა, Google Ads, სოციალური მედია მენეჯმენტი, SEO ოპტიმიზაცია. პროფესიონალური დიჯიტალური მარკეტინგი თბილისში."
      : "VIFA Digital - Professional digital marketing agency in Georgia. Facebook ads, Google Ads, social media management, SEO optimization. Expert digital marketing services in Tbilisi.",
    defaultKeywords: currentLanguage === 'ka'
      ? "ციფრული მარკეტინგი, Facebook რეკლამა, Google Ads, სოციალური მედია, SEO, VIFA Digital, მარკეტინგი საქართველო, თბილისი, ციფრული რეკლამა, სოციალური მედია მენეჯმენტი, მარკეტინგის სააგენტო"
      : "digital marketing, Facebook ads, Google Ads, social media, SEO, VIFA Digital, marketing Georgia, Tbilisi, digital advertising, social media management, marketing agency",
    defaultImage: "/viffa.png",
    email: "vifa.official2020@gmail.com",
    socialLinks: [
      "https://facebook.com/vifaweb",
      "https://www.instagram.com/vifadigital"
    ]
  } : {
    siteName: siteConfig.siteName,
    siteTitle: currentLanguage === 'ka'
      ? "Invento Technologies - ხელოვნური ინტელექტი და ვებ ტექნოლოგიები საქართველოში"
      : "Invento Technologies - AI and Web Technologies in Georgia",
    defaultDescription: currentLanguage === 'ka'
      ? "Invento Technologies - ვებ განვითარება, AI ჩატბოტები, და მონაცემთა ბაზების მართვის სისტემები (WMS) საქართველოში. Invento WMS, Invento AI, Invento Web - ინოვაციური ტექნოლოგიური გადაწყვეტები თბილისში."
      : "Invento Technologies - Web development, AI chatbots, and Warehouse Management Systems (WMS) in Georgia. Invento WMS, Invento AI, Invento Web - innovative tech solutions in Tbilisi.",
    defaultKeywords: currentLanguage === 'ka'
      ? "ვებ განვითარება, AI ჩატბოტები, მონაცემთა ბაზების მართვა, WMS, საწყობის მართვა, ხელოვნური ინტელექტი, Invento Technologies, Invento WMS, Invento AI, Invento Web, ვებსაიტის შექმნა, ტექნოლოგიები საქართველო, თბილისი, ვებ დეველოპმენტი, ციფრული გადაწყვეტები, ბიზნეს ტექნოლოგიები"
      : "web development, AI chatbots, warehouse management, WMS, inventory management, artificial intelligence, Invento Technologies, Invento WMS, Invento AI, Invento Web, website development, technology Georgia, Tbilisi, web development, digital solutions, business technology",
    defaultImage: siteConfig.defaultImage,
    email: siteConfig.email,
    socialLinks: Object.values(siteConfig.social)
  };

  const siteTitle = brandConfig.siteTitle;
  const siteName = brandConfig.siteName;
  const defaultDescription = brandConfig.defaultDescription;

  const fullTitle = title ? `${title} | ${siteName}` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || brandConfig.defaultKeywords;
  const metaImage = image || brandConfig.defaultImage;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : siteConfig.url);

  // Clean canonical URL and ensure proper domain
  let canonicalUrl = currentUrl.split('#')[0]; // Keep query params for language handling

  // Ensure canonical URL uses inventogeo.com consistently for Invento routes
  // and appropriate domains for VIFA routes
  if (!isVifa) {
    // For Invento routes, use inventogeo.com
    canonicalUrl = canonicalUrl.replace(/https?:\/\/(www\.)?(vifadigital\.ge|inventogeo\.com|localhost:3000)/, 'https://www.inventogeo.com');
  } else {
    // For VIFA routes, keep on a subdomain or separate handling if needed
    // For now, we'll use inventogeo.com but with VIFA branding in metadata
    canonicalUrl = canonicalUrl.replace(/https?:\/\/(www\.)?(vifadigital\.ge|inventogeo\.com|localhost:3000)/, 'https://www.inventogeo.com');
  }

  // Generate language-specific URLs
  const baseUrl = canonicalUrl.split('?')[0];
  const georgianUrl = baseUrl;
  const englishUrl = `${baseUrl}?lang=en`;

  // Set canonical based on current language
  const finalCanonicalUrl = currentLanguage === 'en' ? englishUrl : georgianUrl;

  const fullImageUrl = metaImage.startsWith('http') ? metaImage : `${siteConfig.url}${metaImage}`;

  // Generate comprehensive structured data with conditional branding
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "Organization",
    name: type === "article" ? fullTitle : siteName,
    description: metaDescription,
    url: finalCanonicalUrl,
    logo: `${siteConfig.url}${metaImage}`,
    image: fullImageUrl,
    telephone: siteConfig.phone,
    email: brandConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
      addressRegion: "Tbilisi"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer service",
      email: brandConfig.email,
      availableLanguage: ["Georgian", "English"],
      areaServed: "GE"
    },
    sameAs: brandConfig.socialLinks,
    foundingDate: isVifa ? "2020" : "2023",
    knowsAbout: isVifa ? [
      "ციფრული მარკეტინგი",
      "Facebook რეკლამა",
      "Google Ads",
      "SEO ოპტიმიზაცია",
      "Social Media Marketing",
      "Instagram რეკლამა",
      "მარკეტინგის სტრატეგია",
      "ციფრული რეკლამა",
      "სოციალური მედია მენეჯმენტი",
      "ონლაინ მარკეტინგი"
    ] : [
      "ვებ განვითარება",
      "AI ჩატბოტები",
      "მონაცემთა ბაზების მართვა",
      "WMS სისტემები",
      "საწყობის მართვა",
      "ხელოვნური ინტელექტი",
      "ვებსაიტის შექმნა",
      "Invento WMS",
      "Invento AI",
      "Invento Web",
      "ბიზნეს ტექნოლოგიები",
      "ციფრული გადაწყვეტები",
      "ვებ დეველოპმენტი",
      "ტექნოლოგიური კონსულტინგი",
      "შედეგებზე ორიენტირებული ვებსაიტები"
    ],
    serviceArea: {
      "@type": "Country",
      name: "Georgia"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isVifa ? "Digital Marketing Services" : "Technology Solutions",
      itemListElement: isVifa ? [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ციფრული მარკეტინგი",
            description: "Facebook რეკლამა, Google Ads, SEO, სოციალური მედია მენეჯმენტი"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "სოციალური მედიის მართვა",
            description: "Facebook, Instagram, LinkedIn მარკეტინგი და რეკლამა"
          }
        }
      ] : [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Invento WMS",
            description: "მონაცემთა ბაზების მართვის სისტემა და საწყობის მართვა"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Invento AI",
            description: "AI ჩატბოტები და ხელოვნური ინტელექტის ინტეგრაცია"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Invento Web",
            description: "პროფესიონალური ვებ განვითარება და ციფრული გადაწყვეტები"
          }
        }
      ]
    },
    ...(type === "article" && articleMeta && {
      headline: fullTitle,
      author: {
        "@type": "Person",
        name: articleMeta.author || `${siteName} Team`
      },
      publisher: {
        "@type": "Organization",
        name: siteName,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}${metaImage}`
        }
      },
      datePublished: articleMeta.publishedTime,
      dateModified: articleMeta.modifiedTime || articleMeta.publishedTime,
      articleSection: articleMeta.section,
      keywords: articleMeta.tags?.join(", ")
    })
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLanguage} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={`${siteName} Team`} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* SEO Enhancement Meta Tags */}
      <meta name="language" content={currentLanguage === 'ka' ? 'Georgian' : 'English'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="copyright" content={`© 2024 ${siteName}. All rights reserved.`} />
      <meta name="subject" content={isVifa ? "Digital Marketing Services" : "Technology Solutions and Web Development"} />
      <meta name="topic" content={isVifa ? "Digital Marketing, Social Media, SEO" : "Technology, AI, WMS, Web Development"} />
      <meta name="summary" content={metaDescription} />
      <meta name="classification" content="Business" />
      <meta name="designer" content={siteName} />
      <meta name="owner" content={siteName} />
      <meta name="url" content={finalCanonicalUrl} />
      <meta name="identifier-URL" content={finalCanonicalUrl} />
      <meta name="directory" content="submission" />
      <meta name="category" content={isVifa ? "Digital Marketing, Social Media, SEO, Business" : "Technology, AI, WMS, Web Development, Business"} />
      <meta name="coverage" content="Georgia, Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={`${title || siteName} - ${siteName}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLanguage === 'ka' ? 'ka_GE' : 'en_US'} />
      <meta property="og:locale:alternate" content={currentLanguage === 'ka' ? 'en_US' : 'ka_GE'} />

      {/* Article specific Open Graph tags */}
      {type === 'article' && articleMeta && (
        <>
          {articleMeta.publishedTime && (
            <meta property="article:published_time" content={articleMeta.publishedTime} />
          )}
          {articleMeta.modifiedTime && (
            <meta property="article:modified_time" content={articleMeta.modifiedTime} />
          )}
          {articleMeta.author && (
            <meta property="article:author" content={articleMeta.author} />
          )}
          {articleMeta.section && (
            <meta property="article:section" content={articleMeta.section} />
          )}
          {articleMeta.tags && articleMeta.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={`${title || siteName} - ${siteName}`} />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />

      {/* Business/Contact Information */}
      <meta name="contact" content={brandConfig.email} />
      <meta name="reply-to" content={brandConfig.email} />

      {/* Technical Meta Tags */}
      <meta name="theme-color" content="#0f172a" />
      <meta name="msapplication-TileColor" content="#0f172a" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Schema.org markup for Google+ */}
      <meta itemProp="name" content={fullTitle} />
      <meta itemProp="description" content={metaDescription} />
      <meta itemProp="image" content={fullImageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Alternative languages */}
      <link rel="alternate" hrefLang="ka" href={georgianUrl} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      <link rel="alternate" hrefLang="x-default" href={georgianUrl} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>

      {/* Preload critical resources */}
      <link rel="preload" href={metaImage} as="image" />
      <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO;