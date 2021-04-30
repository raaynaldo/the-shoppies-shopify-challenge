import Image from 'next/image';

export default function Movie() {
  return (
    <>
      <div className='relative'>
        <figure className='overflow-hidden rounded-lg shadow-xl'>
          <Image
            src='https://m.media-amazon.com/images/M/MV5BMmY4OGRmNWMtNmIyNS00YWQ5LWJmMGUtMDI3MWRlMmQ0ZDQzL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
            alt='Spiderman'
            width={300}
            height={440}
            layout='responsive'
          />
        </figure>

        <div className='absolute top-0 flex flex-col items-center justify-center w-full h-full space-y-4 text-white transition duration-500 ease-in-out bg-gray-800 bg-opacity-75 rounded-lg opacity-0 hover:opacity-100'>
          <div className='w-3/4 text-sm text-center'>
            Spiderman asda asdas asdas dsa asdassdas asdasdasdas
          </div>
          <button class='px-2 py-1 border-red-500 border rounded-lg text-xs'>
            Nominate
          </button>
        </div>
      </div>
    </>
  );
}
