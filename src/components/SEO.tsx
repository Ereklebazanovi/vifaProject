
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
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
  keywords = "საიტის შექმნა, ვებსაიტის შექმნა, საიტის გაკეთება, ვებსაიტის გაკეთება, საიტი, ვებსაიტი, ai chatbot ინტეგრაცია, ვებსაიტის განვითარება, სოციალური მედია, ციფრული რეკლამა, მარკეტინგი, საქართველო, თბილისი, VIFA Digital, ციფრული მარკეტინგი, SEO ოპტიმიზაცია, გუგლის რეკლამა, ვებდიზაინი, ონლაინ მაღაზია, ბიზნეს ვებსაიტი, კორპორატიული ვებსაიტი, რესტორნის ვებსაიტი, ვებ დეველოპმენტი, ვებ პროგრამირება, საიტების შექმნა, ვებ სერვისები, ციფრული გადაწყვეტები, ai ჩატბოტი, Facebook reklama, Instagram reklama, Google Ads, სოციალური მედია მენეჯმენტი",
  image = "/vifa.jpg",
  url,
  type = 'website',
  structuredData,
  articleMeta
}) => {
  const { currentLanguage } = useLanguage();

  const siteTitle = siteConfig.siteTitle;
  const siteName = siteConfig.siteName;
  const defaultDescription = "VIFA Digital - საიტის შექმნა, ვებსაიტის შექმნა და ციფრული მარკეტინგის სპეციალისტები საქართველოში. საიტის გაკეთება, AI chatbot ინტეგრაცია, ონლაინ მაღაზიების შექმნა, Google Ads, Facebook რეკლამა. პროფესიონალური ვებ სერვისები თბილისში.";

  const fullTitle = title ? `${title} | ${siteName}` : siteTitle;
  const metaDescription = description || defaultDescription;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : siteConfig.url);
  const fullImageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  // Generate comprehensive structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "Organization",
    name: type === "article" ? fullTitle : "VIFA Digital",
    description: metaDescription,
    url: currentUrl,
    logo: `${siteConfig.url}/logo.png`,
    image: fullImageUrl,
    telephone: import.meta.env.VITE_BUSINESS_PHONE || "+995555123456",
    email: "info@vifadigital.ge",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
      addressRegion: "Tbilisi"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: import.meta.env.VITE_BUSINESS_PHONE || "+995555123456",
      contactType: "customer service",
      email: "info@vifadigital.ge",
      availableLanguage: ["Georgian", "English"],
      areaServed: "GE"
    },
    sameAs: [
      "https://www.facebook.com/vifadigital",
      "https://www.instagram.com/vifadigital",
      "https://www.linkedin.com/company/vifadigital"
    ],
    foundingDate: "2020",
    knowsAbout: [
      "საიტის შექმნა",
      "ვებსაიტის შექმნა",
      "საიტის გაკეთება",
      "ვებსაიტის გაკეთება",
      "AI chatbot ინტეგრაცია",
      "Digital Marketing",
      "Web Development",
      "SEO ოპტიმიზაცია",
      "Social Media Marketing",
      "Google Ads",
      "Facebook რეკლამა",
      "Instagram რეკლამა",
      "Website Design",
      "ონლაინ მაღაზია",
      "ბიზნეს ვებსაიტი",
      "ვებ დეველოპმენტი",
      "ციფრული მარკეტინგი",
      "სოციალური მედია მენეჯმენტი"
    ],
    serviceArea: {
      "@type": "Country",
      name: "Georgia"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ვებ განვითარება",
            description: "პროფესიონალური ვებსაიტების შექმნა და განვითარება"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ციფრული მარკეტინგი",
            description: "სოციალური მედია, გუგლის რეკლამა, SEO ოპტიმიზაცია"
          }
        }
      ]
    },
    ...(type === "article" && articleMeta && {
      headline: fullTitle,
      author: {
        "@type": "Person",
        name: articleMeta.author || "VIFA Digital Team"
      },
      publisher: {
        "@type": "Organization",
        name: "VIFA Digital",
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/logo.png`
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
      <meta name="keywords" content={keywords} />
      <meta name="author" content="VIFA Digital Team" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      {/* SEO Enhancement Meta Tags */}
      <meta name="language" content={currentLanguage === 'ka' ? 'Georgian' : 'English'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="copyright" content="© 2024 VIFA Digital. All rights reserved." />
      <meta name="subject" content="Digital Marketing and Web Development Services" />
      <meta name="topic" content="Technology, Marketing, Web Development" />
      <meta name="summary" content={metaDescription} />
      <meta name="classification" content="Business" />
      <meta name="designer" content="VIFA Digital" />
      <meta name="owner" content="VIFA Digital" />
      <meta name="url" content={currentUrl} />
      <meta name="identifier-URL" content={currentUrl} />
      <meta name="directory" content="submission" />
      <meta name="category" content="Digital Marketing, Web Development, Technology, Business" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={`${title || siteName} - VIFA Digital`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={currentUrl} />
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
      <meta name="twitter:image:alt" content={`${title || siteName} - VIFA Digital`} />
      <meta name="twitter:site" content={siteConfig.twitterHandle || "@vifadigital"} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle || "@vifadigital"} />

      {/* Business/Contact Information */}
      <meta name="contact" content="info@vifadigital.ge" />
      <meta name="reply-to" content="info@vifadigital.ge" />

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
      <link rel="canonical" href={currentUrl} />

      {/* Alternative languages */}
      <link rel="alternate" hrefLang="ka" href={currentUrl} />
      <link rel="alternate" hrefLang="en" href={`${currentUrl}${currentUrl.includes('?') ? '&' : '?'}lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />

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
      <link rel="preload" href="/vifa.jpg" as="image" />
      <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO;