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

        <div className='absolute top-0 flex flex-col items-center justify-center w-full h-full space-y-4 text-white transition duration-500 ease-in-out bg-black rounded-lg opacity-0 bg-opacity-60 hover:opacity-100'>
          <div className='w-3/4 text-base font-bold text-center'>
            {title} ({year})
          </div>
          <button
            className={`btn-nominate ${
              isNominated ? 'cursor-not-allowed' : ''
            }`}
            onClick={addNominationHandler}
            disabled={isNominated}
          >
            Nominate
          </button>
        </div>
      </div>
    </>
  );
}
