import { DefaultSeo } from 'next-seo';
import SEO from '@/next-seo.config';
import '@/styles/globals.css';
import axios from '@/axios';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  axios();
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

export default MyApp;
