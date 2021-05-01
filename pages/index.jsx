import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import Movie from '@/components/Movie';
import PageNavigation from '@/components/PageNavigation';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
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

    const newData = results.map((movie) => {
      return {
        ...movie,
        isNominated: nominations.some(
          (nomination) => nomination.imdbID === movie.imdbID
        ),
      };
    });
    setResults(newData);
  }, [nominations]);

  const searchHandler = (event) => {
    event.preventDefault();
    fetchData(1);
  };

  const fetchData = (currentPage) => {
    setLoading(true);
    axios
      .get(`?s=${searchInput}&type=movie&page=${currentPage}`)
      .then((response) => {
        // add a new attribute to check if the movie has been nominated
        if (response.data.Response === 'True') {
          const data = response.data.Search.map((movie) => {
            const newMovie = {
              ...movie,
              isNominated: nominations.some(
                (nomination) => nomination.imdbID === movie.imdbID
              ),
            };

            return newMovie;
          });
          console.log(data);
          data.pop();
          setResults(data);

          setMaxPage(Math.ceil(response.data.totalResults / 10));
          setCurrentPage(currentPage);
        } else {
          toast.error(`Sorry, ${response.data.Error}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
        }
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        toast.error(`${error}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      });
  };

  const addNominationHandler = (movie) => {
    if (nominations.length < 5) {
      toast.success(`${movie.Title} (${movie.Year}) is nominated`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      if (nominations.length === 4) {
        toast.info('You have five nominations now!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
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
          <div className='flex flex-col items-center min-h-screen py-5 space-y-10 layout lg:items-start'>
            <div className='flex flex-col w-full space-y-5 lg:w-3/4'>
              <h3>The Shoppies</h3>
              <Search
                searchHandler={searchHandler}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
              <Nominations
                nominations={nominations}
                removeNominationHandler={removeNominationHandler}
              />
              <Results
                results={results}
                addNominationHandler={addNominationHandler}
                currentPage={currentPage}
                maxPage={maxPage}
                prevPageHandler={prevPageHandler}
                nextPageHandler={nextPageHandler}
                loading={loading}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const Search = ({ searchInput, setSearchInput, searchHandler }) => {
  return (
    <form onSubmit={(e) => searchHandler(e)}>
      <label>Search movie title then hit enter ...</label>
      <input
        type='text'
        className='w-full border-gray-300 rounded-xl'
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
  loading,
}) => {
  if (loading)
    return (
      <div className='m-auto mt-10'>
        <Loader type='TailSpin' color='#60a5fa' height={100} width={100} />
      </div>
    );
  if (results.length === 0) return null;
  return (
    <>
      <PageNavigation
        currentPage={currentPage}
        maxPage={maxPage}
        prevPageHandler={prevPageHandler}
        nextPageHandler={nextPageHandler}
      />
      <div className='grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-10'>
        {results.map((result, index) => (
          <Movie
            key={`result-${index}`}
            title={result.Title}
            year={result.Year}
            image={result.Poster}
            addNominationHandler={() => addNominationHandler(result)}
            isNominated={result.isNominated}
          />
        ))}
      </div>
      <PageNavigation
        currentPage={currentPage}
        maxPage={maxPage}
        prevPageHandler={prevPageHandler}
        nextPageHandler={nextPageHandler}
      />
    </>
  );
};

const Nominations = ({ nominations, removeNominationHandler }) => {
  return (
    <div className='w-full p-3 space-y-3 bg-gray-100 rounded-md lg:fixed lg:w-1/4 lg:right-5 lg:bottom-5'>
      <h4 className='inline'>Nominations</h4>
      <span className='text-xs italic'> (up to 5) (Click to remove)</span>
      <ul className='space-y-3'>
        {nominations.map((nomination) => (
          <li
            key={`nomination-${nomination.imdbID}`}
            onClick={() => removeNominationHandler(nomination.imdbID)}
            className='cursor-pointer hover:line-through hover:text-red-600'
          >
            {nomination.Title} ({nomination.Year}){' '}
          </li>
        ))}
      </ul>
    </div>
  );
};
