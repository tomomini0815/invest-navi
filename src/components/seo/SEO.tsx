import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    path?: string;
    ogImage?: string;
    type?: 'website' | 'article';
    jsonLd?: Record<string, any>;
}

const SEO = ({
    title,
    description,
    path = '',
    ogImage = '/og-image.png', // Default OG image path
    type = 'website',
    jsonLd
}: SEOProps) => {
    const siteUrl = 'https://invest-navi.com';
    const fullUrl = `${siteUrl}${path}`;
    const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

    const siteTitle = 'Invest Navi';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

    // JSON-LD structured data
    const structuredData = jsonLd || {
        "@context": "https://schema.org",
        "@type": type === 'article' ? "Article" : "WebSite",
        "name": fullTitle,
        "description": description,
        "url": fullUrl,
        "publisher": {
            "@type": "Organization",
            "name": siteTitle,
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo_square.png`
            }
        }
    };

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
