import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

interface PageMetaProps {
  title: string;
  description: string;
}

const PageMeta: React.FC<PageMetaProps> = ({ title, description }) => {
  const fullTitle = title ? `${title} | Developer Tools` : 'Developer Tools';
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default PageMeta;
