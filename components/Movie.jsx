import Image from 'next/image';

export default function Movie({
  title,
  year,
  image,
  addNominationHandler,
  isNominated,
}) {
  return (
    <>
      <div className='relative'>
        <figure className='overflow-hidden rounded-lg shadow-xl'>
          <Image
            src={image !== 'N/A' ? image : '/images/no-poster.jpg'}
            alt='Spiderman'
            width={300}
            height={440}
            layout='responsive'
          />
        </figure>

        <div className='absolute top-0 flex flex-col items-center justify-end w-full h-full pb-6 space-y-4 text-white transition duration-500 ease-in-out rounded-lg opacity-0 bg-gradient-to-t from-dark-600 to-dark-0 hover:opacity-100'>
          <div className='w-3/4 text-base font-bold text-center'>
            {title} ({year})
          </div>
          <button
            className={`btn-nominate ${
              isNominated
                ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'
                : 'bg-blue-400 hover:bg-blue-700'
            }`}
            onClick={addNominationHandler}
            disabled={isNominated}
          >
            {isNominated ? 'Nominated' : 'Nominate'}
          </button>
        </div>

        {/* <div className='absolute top-0 right-0 lg:hidden'>
          <button
            className={`btn-nominate ${
              isNominated ? 'cursor-not-allowed' : ''
            }`}
            onClick={addNominationHandler}
            disabled={isNominated}
          >
            +
          </button>
        </div> */}
      </div>
    </>
  );
}
