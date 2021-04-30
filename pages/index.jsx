import { NextSeo } from 'next-seo';
import CustomLink from '@/components/CustomLink';
import Movie from '@/components/Movie';

export default function Home() {
  return (
    <>
      <NextSeo />

      <main>
        <section className='bg-white'>
          <div className='flex justify-center min-h-screen py-5 space-x-5 layout'>
            <div className='flex flex-col w-3/4 space-y-5'>
              <div className=''>
                <h3>The Shoppies</h3>
              </div>
              <Search />
              <Results />
            </div>
            <Nominations />
          </div>
        </section>
      </main>
    </>
  );
}

const Search = () => {
  return (
    <div className=''>
      <input
        type='text'
        className='w-full border-gray-300 rounded-xl'
        placeholder='Search Movie'
      />
    </div>
  );
};

const Results = () => {
  return (
    <div className='grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10'>
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
    </div>
  );
};

// const Nominations = () => {
//   return <div className='fixed bottom-0 right-0 w-1/6 bg-red-300 h-1/2'></div>;
// };

const Nominations = () => {
  return (
    <div className='flex-1 hidden p-3 space-y-3 bg-gray-100 rounded-md h-1/2 md:block'>
      <h4>Nominations</h4>
      <ul className='space-y-3'>
        <li>
          hello asdas asdas adsada asdas asdsadas sa as{' '}
          <button className='border'>remove</button>
        </li>
        <li>
          hello <button className='border'>remove</button>
        </li>
        <li>
          hello <button className='border'>remove</button>
        </li>
        <li>
          hello <button className='border'>remove</button>
        </li>
      </ul>
    </div>

    // <div className='fixed bottom-0 left-0 w-full p-3 space-y-3 bg-gray-100 rounded-md h-1/4 md:block'>
    //   <h4>Nominations</h4>
    //   <ul className='space-y-3'>
    //     <li>hello asdas asdas adsada asdas asdsadas sa as</li>
    //     <li>hello</li>
    //     <li>hello</li>
    //     <li>hello</li>
    //   </ul>
    // </div>
  );
};
