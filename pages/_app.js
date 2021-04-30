import { DefaultSeo } from 'next-seo';
import SEO from '@/next-seo.config';
import '@/styles/globals.css';
import axios from '@/axios';

function MyApp({ Component, pageProps }) {
  axios();
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
