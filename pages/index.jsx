import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import Movie from '@/components/Movie';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  // const [loading, setLoading] = useState('false');
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [nominations, setNominations] = useState([]);

  useEffect(() => {
    setNominations(
      window.localStorage.getItem('nominations')
        ? JSON.parse(localStorage.getItem('nominations'))
        : []
    );
  }, []);

  useEffect(() => {
    localStorage.setItem('nominations', JSON.stringify(nominations));

    setResults((prevResults) => {
      const newData = results.map((movie) => {
        return {
          ...movie,
          isNominated: nominations.some(
            (nomination) => nomination.imdbID === movie.imdbID
          ),
        };
      });

      return newData;
    });
  }, [nominations]);

  const searchHandler = (event) => {
    event.preventDefault();
    fetchData(1);
  };

  const fetchData = (currentPage) => {
    axios
      .get(`?s=${searchInput}&type=movie&page=${currentPage}`)
      .then((response) => {
        // add a new attribute to check if the movie has been nominated
        const data = response.data.Search.map((movie) => {
          const newMovie = {
            ...movie,
            isNominated: nominations.some(
              (nomination) => nomination.imdbID === movie.imdbID
            ),
          };

          return newMovie;
        });

        setMaxPage(Math.ceil(response.data.totalResults / 10));
        setCurrentPage(currentPage);
        console.log(data);
        setResults(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addNominationHandler = (movie) => {
    if (nominations.length < 5) {
      if (nominations.length === 4) {
        toast.info('You have five nominations now!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setNominations((prevNominations) => [...prevNominations, movie]);
    } else {
      toast.error('Sorry, You already have five nominations!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const removeNominationHandler = (movieId) => {
    setNominations((prevNominations) => [
      ...prevNominations.filter((movie) => movie.imdbID !== movieId),
    ]);
  };

  const nextPageHandler = () => {
    fetchData(currentPage + 1);
  };

  const prevPageHandler = () => {
    fetchData(currentPage - 1);
  };

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
              <Search
                searchHandler={searchHandler}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
              <Results
                results={results}
                addNominationHandler={addNominationHandler}
                currentPage={currentPage}
                maxPage={maxPage}
                prevPageHandler={prevPageHandler}
                nextPageHandler={nextPageHandler}
              />
            </div>
            <Nominations
              nominations={nominations}
              removeNominationHandler={removeNominationHandler}
            />
          </div>
        </section>
      </main>
    </>
  );
}

const Search = ({ searchInput, setSearchInput, searchHandler }) => {
  return (
    <form onSubmit={(e) => searchHandler(e)}>
      <input
        type='text'
        className='w-full border-gray-300 rounded-xl'
        placeholder='Search Movie Title'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </form>
  );
};

const Results = ({
  results,
  addNominationHandler,
  currentPage,
  maxPage,
  prevPageHandler,
  nextPageHandler,
}) => {
  if (results.length === 0) return null;
  return (
    <>
      <div className='flex flex-col items-center space-y-2'>
        <div>
          Page: {currentPage} / {maxPage}
        </div>
        <div className='flex w-full space-x-2'>
          <button
            className='flex-auto py-1 bg-gray-200 border rounded-md hover:bg-gray-400 disabled:opacity-50'
            disabled={currentPage === 1}
            onClick={prevPageHandler}
          >
            prev
          </button>
          <button
            className='flex-auto py-1 bg-gray-200 border rounded-md hover:bg-gray-400 disabled:opacity-50'
            disabled={currentPage === maxPage}
            onClick={nextPageHandler}
          >
            next
          </button>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-10'>
        {results.map((result) => (
          <Movie
            key={`result-${result.imdbID}`}
            title={result.Title}
            year={result.Year}
            image={result.Poster}
            addNominationHandler={() => addNominationHandler(result)}
            isNominated={result.isNominated}
          />
        ))}
      </div>
    </>
  );
};

const Nominations = ({ nominations, removeNominationHandler }) => {
  return (
    <div className='sticky flex-1 hidden p-3 space-y-3 bg-gray-100 rounded-md mt-28 top-5 h-1/2 md:block'>
      <h4 className='inline'>Nominations</h4>
      <span> (up to 5)</span>
      <ul className='space-y-3'>
        {nominations.map((nomination) => (
          <li key={`nomination-${nomination.imdbID}`}>
            {nomination.Title} ({nomination.Year}){' '}
            <button
              className='btn-nominate'
              onClick={() => removeNominationHandler(nomination.imdbID)}
            >
              Remove
            </button>
          </li>
        ))}
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
