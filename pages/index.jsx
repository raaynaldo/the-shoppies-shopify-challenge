import { NextSeo } from 'next-seo';
import CustomLink from '@/components/CustomLink';

export default function Home() {
  return (
    <>
      <NextSeo />

      <main>
        <section className='bg-gray-50'>
          <div className='flex flex-col items-center min-h-screen py-5 layout'>
            <h4>The Shoppies</h4>
            <Search />
          </div>
        </section>
      </main>
    </>
  );
}

const Search = () => {
  return (
    <div>
      <input type='text' className='border-gray-300 rounded-xl' />
    </div>
  );
};

const Results = () => {
  return <div></div>;
};
