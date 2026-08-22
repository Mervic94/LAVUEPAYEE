import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://lavuepayee.lovable.app';
const DEFAULT_IMAGE = `${SITE_URL}/lovable-uploads/d82c55d8-0c83-4a02-82c0-67e854a84332.png`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Per-route head metadata: unique title/description, self-referencing
 * canonical + og:url, absolute og:image, optional JSON-LD.
 */
const Seo: React.FC<SeoProps> = ({ title, description, path, image, noindex, jsonLd }) => {
  const url = `${SITE_URL}${path}`;
  const img = image ?? DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
