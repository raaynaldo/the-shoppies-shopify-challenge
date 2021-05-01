const title = 'The Shoppies';
const description = 'Shopify Frontend Challenge';

const SEO = {
  title,
  description,
  // canonical: 'https://theodorusclarence.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://the-shoppies-shopify-challenge.vercel.app/',
    title,
    description,
    images: [
      {
        url:
          'https://the-shoppies-shopify-challenge.vercel.app/favicon/ms-icon-144x144.png',
        alt: title,
        width: 144,
        height: 144,
      },
    ],
  },
};

export default SEO;

// EXAMPLES
{
  /* 
    const title = 'Next.js Tailwind Starter';
    const description = 'your description';
    const url = 'https://theodorusclarence.com';

    <NextSeo
    title={title}
    description={description}
    canonical={url}
    openGraph={{
        url,
        title,
        description,
    }}
/>;  */
}
