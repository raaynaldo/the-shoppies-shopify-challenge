import Image from 'next/image';

export default function Movie() {
  return (
    <>
      <Image
        src='https://m.media-amazon.com/images/M/MV5BMmY4OGRmNWMtNmIyNS00YWQ5LWJmMGUtMDI3MWRlMmQ0ZDQzL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
        alt='Spiderman'
        width={300}
        height={500}
        className=' rounded-2xl'
      />
    </>
  );
}
