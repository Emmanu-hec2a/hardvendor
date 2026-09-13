import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  schemaData
}) {
  const siteName = 'HardVendor';
  const defaultDescription = 'Premium liquor delivered to your doorstep within Karatina University Main Campus in under 15 minutes. Shop high-quality whiskey, gin, vodka, and wine.';
  const defaultKeywords = 'liquor delivery Karatina University, alcohol delivery Kagochi, HardVendor, premium spirits, 15 min delivery, whiskey delivery, gin delivery';
  const defaultImage = 'https://hardvendor.store/og-image.png'; // Make sure to provide a default OG image
  const siteUrl = 'https://hardvendor.store';

  const fullTitle = title ? `${title} | ${siteName}` : `HardVendor | Premium Liquor Delivered in 15 Mins`;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image || defaultImage;
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
