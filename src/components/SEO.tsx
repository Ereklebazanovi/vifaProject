import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { siteConfig } from '../config/siteConfig';

/** A single priced package: fixed `price` OR a `minPrice`/`maxPrice` range (GEL). */
type OfferInput = { name: string; price?: number; minPrice?: number; maxPrice?: number };

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  structuredData?: object;
  /** Per-page FAQ — injects FAQPage schema (rich results in SERP). */
  faq?: Array<{ question: string; answer: string }>;
  /** Explicit breadcrumb trail. If omitted, a Home > Current trail is auto-built. */
  breadcrumbs?: Array<{ name: string; url: string }>;
  /** Per-page Service schema (name + description) for /services/* pages.
   *  `offers` (real package prices) emit an AggregateOffer → price-rich results.
   *  Each offer is either a fixed `price` or a `minPrice`/`maxPrice` range (GEL). */
  serviceSchema?: {
    name: string;
    description: string;
    serviceType?: string;
    offers?: OfferInput[];
  };
  /** Per-page SoftwareApplication schema for SaaS products (e.g. Invento WMS).
   *  More accurate than Service for a licensed software product. Same `offers` shape. */
  softwareApplication?: {
    name: string;
    description: string;
    applicationCategory?: string;
    operatingSystem?: string;
    offers?: OfferInput[];
  };
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
  faq,
  breadcrumbs,
  serviceSchema,
  softwareApplication,
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
      'https://www.facebook.com/vifageo',
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

  // Canonical is ALWAYS the clean, query-stripped URL — independent of the
  // client-side language toggle. EN is a client-only `?lang=en` state, not a
  // distinct server-rendered route, so it must never become a canonical/alternate
  // (doing so signals false duplicate pages to Google). Re-add hreflang only when
  // real prerendered `/en/...` routes exist.
  const finalCanonicalUrl = canonicalUrl.split('?')[0];

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
      'AI ჩატბოტი',
      'AI ინტეგრაცია',
      'საწყობის პროგრამა',
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
      'AI Chatbot',
      'AI Integration',
      'Warehouse Management Software',
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
          url: `${brandBaseUrl}/services/web`,
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
          url: `${brandBaseUrl}/services/marketing`,
          description: isKa
            ? 'SEO, Google Ads, Facebook/Instagram რეკლამა და სოციალური მედია მენეჯმენტი.'
            : 'SEO, Google Ads, Facebook/Instagram advertising, and social media management.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isKa ? 'AI ჩატბოტი' : 'AI Chatbot',
          url: `${brandBaseUrl}/services/ai-chatbot`,
          description: isKa
            ? 'AI ჩატბოტის დამზადება და ინტეგრაცია მომხმარებელთა 24/7 მხარდაჭერისა და ლიდების გენერაციისთვის.'
            : 'AI chatbot development and integration for 24/7 customer support and lead generation.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isKa ? 'საწყობის პროგრამა' : 'Warehouse Management Software',
          alternateName: 'Invento WMS',
          url: `${brandBaseUrl}/inventowms`,
          description: isKa
            ? 'Invento WMS საწყობის, მარაგების, შეკვეთებისა და ფინანსური რეპორტინგის სამართავად.'
            : 'Invento WMS for warehouse, inventory, order, and finance management.'
        }
      }
    ]
  };

  // ── Structured data (@graph) ──────────────────────────────────────────────
  const orgId = `${brandBaseUrl}/#organization`;
  const websiteId = `${brandBaseUrl}/#website`;
  const isHome = finalCanonicalUrl === `${brandBaseUrl}/`;

  // Organization / local business node — the entity Google attaches everything to.
  const organizationNode = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': orgId,
    name: siteName,
    url: brandBaseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${brandBaseUrl}${brandConfig.defaultImage}`
    },
    image: fullImageUrl,
    description: defaultDescription,
    email: brandConfig.email,
    telephone: siteConfig.phone,
    priceRange: '$$',
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tbilisi',
      addressRegion: 'Tbilisi',
      addressCountry: 'GE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.7151,
      longitude: 44.8271
    },
    areaServed: { '@type': 'Country', name: 'Georgia' },
    sameAs: brandConfig.socialLinks,
    knowsAbout,
    hasOfferCatalog: offerCatalog,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      email: brandConfig.email,
      availableLanguage: ['Georgian', 'English'],
      areaServed: 'GE'
    }
  };

  const websiteNode = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: brandBaseUrl,
    name: siteName,
    inLanguage: isKa ? 'ka-GE' : 'en-US',
    publisher: { '@id': orgId }
  };

  // Breadcrumbs: explicit prop wins, otherwise auto Home > Current (skipped on home).
  const breadcrumbTrail =
    breadcrumbs && breadcrumbs.length
      ? breadcrumbs
      : isHome
        ? []
        : [
          { name: isKa ? 'მთავარი' : 'Home', url: `${brandBaseUrl}/` },
          { name: title || siteName, url: finalCanonicalUrl }
        ];

  const breadcrumbNode = breadcrumbTrail.length
    ? {
      '@type': 'BreadcrumbList',
      '@id': `${finalCanonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbTrail.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.url
      }))
    }
    : null;

  const webPageNode = {
    '@type': type === 'article' ? 'Article' : 'WebPage',
    '@id': `${finalCanonicalUrl}#webpage`,
    url: finalCanonicalUrl,
    name: fullTitle,
    description: metaDescription,
    isPartOf: { '@id': websiteId },
    inLanguage: isKa ? 'ka-GE' : 'en-US',
    ...(breadcrumbNode && { breadcrumb: { '@id': `${finalCanonicalUrl}#breadcrumb` } }),
    ...(type === 'article' && articleMeta && {
      headline: fullTitle,
      image: fullImageUrl,
      author: { '@type': 'Person', name: articleMeta.author || `${siteName} Team` },
      publisher: { '@id': orgId },
      datePublished: articleMeta.publishedTime,
      dateModified: articleMeta.modifiedTime || articleMeta.publishedTime,
      articleSection: articleMeta.section,
      keywords: articleMeta.tags?.join(', ')
    })
  };

  // AggregateOffer built from the page's real, visible package prices (GEL).
  const buildOffers = (offers: OfferInput[]) => {
    const offerItems = offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      priceCurrency: 'GEL',
      availability: 'https://schema.org/InStock',
      url: finalCanonicalUrl,
      ...(o.price != null
        ? { price: o.price }
        : {
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'GEL',
            minPrice: o.minPrice,
            maxPrice: o.maxPrice
          }
        })
    }));
    const prices = offers.flatMap((o) =>
      o.price != null ? [o.price] : [o.minPrice, o.maxPrice]
    ).filter((n): n is number => typeof n === 'number');
    return {
      '@type': 'AggregateOffer',
      priceCurrency: 'GEL',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: offerItems.length,
      offers: offerItems
    };
  };

  const serviceNode = serviceSchema
    ? {
      '@type': 'Service',
      '@id': `${finalCanonicalUrl}#service`,
      name: serviceSchema.name,
      description: serviceSchema.description,
      ...(serviceSchema.serviceType && { serviceType: serviceSchema.serviceType }),
      provider: { '@id': orgId },
      areaServed: { '@type': 'Country', name: 'Georgia' },
      url: finalCanonicalUrl,
      ...(serviceSchema.offers?.length && { offers: buildOffers(serviceSchema.offers) })
    }
    : null;

  // SoftwareApplication node — accurate entity type for a SaaS product (Invento WMS).
  const softwareNode = softwareApplication
    ? {
      '@type': 'SoftwareApplication',
      '@id': `${finalCanonicalUrl}#software`,
      name: softwareApplication.name,
      description: softwareApplication.description,
      applicationCategory: softwareApplication.applicationCategory || 'BusinessApplication',
      operatingSystem: softwareApplication.operatingSystem || 'Web',
      provider: { '@id': orgId },
      url: finalCanonicalUrl,
      ...(softwareApplication.offers?.length && { offers: buildOffers(softwareApplication.offers) })
    }
    : null;

  const faqNode =
    faq && faq.length
      ? {
        '@type': 'FAQPage',
        '@id': `${finalCanonicalUrl}#faq`,
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer }
        }))
      }
      : null;

  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode,
      websiteNode,
      webPageNode,
      breadcrumbNode,
      serviceNode,
      softwareNode,
      faqNode
    ].filter(Boolean)
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

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* No hreflang alternates: EN is a client-only state, not a distinct route.
          Re-add ka/en/x-default once real prerendered /en/... routes exist. */}

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
