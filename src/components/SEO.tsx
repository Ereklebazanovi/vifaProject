
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
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = "ვებსაიტის განვითარება, სოციალური მედია, ციფრული რეკლამა, მარკეტინგი, საქართველო, თბილისი, Vifa Digital",
  image = "/vifa.jpg",
  url,
  type = 'website',
  structuredData
}) => {
  const { currentLanguage } = useLanguage();

  const siteTitle = siteConfig.siteTitle;
  const siteName = siteConfig.siteName;
  const defaultDescription = "Vifa Digital - წამყვანი ციფრული მარკეტინგის სააგენტო საქართველოში. ვებსაიტების განვითარება, სოციალური მედიის მართვა, ციფრული რეკლამა. პროფესიონალური სერვისები თბილისში.";

  const fullTitle = title ? `${title} | ${siteName}` : siteTitle;
  const metaDescription = description || defaultDescription;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : siteConfig.url);
  const fullImageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLanguage} />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Vifa Digital Team" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={currentLanguage === 'ka' ? 'ka_GE' : 'en_US'} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.twitterHandle} />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Preload critical resources */}
      <link rel="preload" href="/vifa.jpg" as="image" />
    </Helmet>
  );
};

export default SEO;