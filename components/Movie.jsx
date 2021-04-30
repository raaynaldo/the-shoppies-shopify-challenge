import Image from 'next/image';

export default function Movie({ title, year, image }) {
  return (
    <>
      <div className='relative'>
        <figure className='overflow-hidden rounded-lg shadow-xl'>
          <Image
            src={image}
            alt='Spiderman'
            width={300}
            height={440}
            layout='responsive'
          />
        </figure>

        <div className='absolute top-0 flex flex-col items-center justify-center w-full h-full space-y-4 text-white transition duration-500 ease-in-out bg-gray-800 bg-opacity-75 rounded-lg opacity-0 hover:opacity-100'>
          <div className='w-3/4 text-sm text-center'>
            {title} ({year})
          </div>
          <button className='px-2 py-1 text-xs border border-red-500 rounded-lg'>
            Nominate
          </button>
        </div>
      </div>
    </>
  );
}
