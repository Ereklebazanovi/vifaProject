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
  keywords,
  image,
  url,
  type = 'website',
  structuredData,
  articleMeta
}) => {
  const { currentLanguage } = useLanguage();
  const isKa = currentLanguage === 'ka';
  const brandBaseUrl = 'https://vifadigital.ge';

  const brandConfig = {
    siteName: 'Vifa Digital',
    siteTitle: isKa
      ? 'Vifa Digital - პრემიუმ ვებ დეველოპმენტი, ციფრული მარკეტინგი და IT გადაწყვეტილებები'
      : 'Vifa Digital - Premium Web Development, Digital Marketing & IT Solutions',
    defaultDescription: isKa
      ? 'Vifa Digital არის პრემიუმ სრულ-სერვისიანი სააგენტო საქართველოში, რომელიც აერთიანებს ვებ დეველოპმენტს, ციფრულ მარკეტინგს და IT გადაწყვეტილებებს ბიზნესის ზრდისთვის.'
      : 'Vifa Digital is a premium full-service agency in Georgia, delivering web development, digital marketing, and IT solutions for business growth.',
    defaultKeywords: isKa
      ? 'Vifa Digital, ვებ დეველოპმენტი, ვებსაიტის შექმნა, ციფრული მარკეტინგი, SEO, Google Ads, Facebook რეკლამა, IT სერვისები, ბიზნეს ავტომატიზაცია, AI გადაწყვეტილებები, WMS, ტექნოლოგიური სააგენტო, თბილისი, საქართველო'
      : 'Vifa Digital, web development, website development, digital marketing, SEO, Google Ads, Facebook ads, IT solutions, business automation, AI solutions, WMS, technology agency, Tbilisi, Georgia',
    defaultImage: '/viffa.png',
    email: 'vifa.official2020@gmail.com',
    socialLinks: [
      'https://facebook.com/vifaweb',
      'https://www.instagram.com/vifadigital'
    ]
  };

  const siteTitle = brandConfig.siteTitle;
  const siteName = brandConfig.siteName;
  const defaultDescription = brandConfig.defaultDescription;

  const fullTitle = title ? `${title} | ${siteName}` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || brandConfig.defaultKeywords;
  const metaImage = image || brandConfig.defaultImage;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : brandBaseUrl);

  const normalizeCanonicalUrl = (input: string) => {
    try {
      const parsed = new URL(input, brandBaseUrl);
      return `${brandBaseUrl}${parsed.pathname}${parsed.search}`;
    } catch {
      const safePath = input.startsWith('/') ? input : `/${input}`;
      return `${brandBaseUrl}${safePath}`;
    }
  };

  const canonicalUrl = normalizeCanonicalUrl(currentUrl.split('#')[0]);

  // Generate language-specific URLs
  const baseUrl = canonicalUrl.split('?')[0];
  const georgianUrl = baseUrl;
  const englishUrl = `${baseUrl}?lang=en`;

  // Set canonical based on current language
  const finalCanonicalUrl = isKa ? georgianUrl : englishUrl;

  const fullImageUrl = metaImage.startsWith('http')
    ? metaImage
    : `${brandBaseUrl}${metaImage.startsWith('/') ? '' : '/'}${metaImage}`;

  const knowsAbout = isKa
    ? [
      'ვებ დეველოპმენტი',
      'ვებსაიტის შექმნა',
      'ციფრული მარკეტინგი',
      'SEO ოპტიმიზაცია',
      'Google Ads',
      'Facebook რეკლამა',
      'სოციალური მედია მენეჯმენტი',
      'IT გადაწყვეტილებები',
      'ბიზნეს ავტომატიზაცია',
      'AI ინტეგრაცია',
      'WMS სისტემები'
    ]
    : [
      'Web Development',
      'Website Design and Development',
      'Digital Marketing',
      'SEO Optimization',
      'Google Ads',
      'Facebook Advertising',
      'Social Media Management',
      'IT Solutions',
      'Business Automation',
      'AI Integration',
      'WMS Systems'
    ];

  const offerCatalog = {
    '@type': 'OfferCatalog',
    name: isKa ? 'Vifa Digital-ის სერვისები' : 'Vifa Digital Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isKa ? 'ვებ დეველოპმენტი' : 'Web Development',
          description: isKa
            ? 'კორპორატიული ვებსაიტები, eCommerce პლატფორმები და კონვერსიაზე ორიენტირებული ვებ პროდუქტები.'
            : 'Corporate websites, eCommerce platforms, and conversion-focused web products.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isKa ? 'ციფრული მარკეტინგი' : 'Digital Marketing',
          description: isKa
            ? 'SEO, Google Ads, Facebook/Instagram რეკლამა და სოციალური მედია მენეჯმენტი.'
            : 'SEO, Google Ads, Facebook/Instagram advertising, and social media management.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isKa ? 'IT და AI გადაწყვეტილებები' : 'IT & AI Solutions',
          description: isKa
            ? 'ბიზნეს პროცესების ავტომატიზაცია, AI ინტეგრაცია და ინდივიდუალური ტექნოლოგიური გადაწყვეტები.'
            : 'Business process automation, AI integration, and custom technology solutions.'
        }
      }
    ]
  };

  // Generate comprehensive structured data
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'Organization',
    name: type === 'article' ? fullTitle : siteName,
    description: metaDescription,
    url: finalCanonicalUrl,
    logo: `${brandBaseUrl}${brandConfig.defaultImage}`,
    image: fullImageUrl,
    telephone: siteConfig.phone,
    email: brandConfig.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tbilisi',
      addressCountry: 'GE',
      addressRegion: 'Tbilisi'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      email: brandConfig.email,
      availableLanguage: ['Georgian', 'English'],
      areaServed: 'GE'
    },
    sameAs: brandConfig.socialLinks,
    foundingDate: '2020',
    knowsAbout,
    serviceArea: {
      '@type': 'Country',
      name: 'Georgia'
    },
    hasOfferCatalog: offerCatalog,
    ...(type === 'article' && articleMeta && {
      headline: fullTitle,
      author: {
        '@type': 'Person',
        name: articleMeta.author || `${siteName} Team`
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${brandBaseUrl}${brandConfig.defaultImage}`
        }
      },
      datePublished: articleMeta.publishedTime,
      dateModified: articleMeta.modifiedTime || articleMeta.publishedTime,
      articleSection: articleMeta.section,
      keywords: articleMeta.tags?.join(', ')
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
      <meta name="language" content={isKa ? 'Georgian' : 'English'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="copyright" content={`© 2026 ${siteName}. All rights reserved.`} />
      <meta name="subject" content="Premium Web Development, Digital Marketing and IT Solutions" />
      <meta name="topic" content="Web Development, Digital Marketing, SEO, AI and IT Solutions" />
      <meta name="summary" content={metaDescription} />
      <meta name="classification" content="Business" />
      <meta name="designer" content={siteName} />
      <meta name="owner" content={siteName} />
      <meta name="url" content={finalCanonicalUrl} />
      <meta name="identifier-URL" content={finalCanonicalUrl} />
      <meta name="directory" content="submission" />
      <meta name="category" content="Web Development, Digital Marketing, IT Solutions, Business" />
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
      <meta property="og:locale" content={isKa ? 'ka_GE' : 'en_US'} />
      <meta property="og:locale:alternate" content={isKa ? 'en_US' : 'ka_GE'} />

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
      <link rel="icon" type="image/png" href="/viffa.png" />
      <link rel="apple-touch-icon" href="/viffa.png" />
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
