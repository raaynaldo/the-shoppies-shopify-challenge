import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import axios from 'axios';
import Movie from '@/components/Movie';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  // const [loading, setLoading] = useState('false');
  const [results, setResults] = useState({ searchInput: '', data: [] });
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
    const newData = results.data.map((movie) => {
      return {
        ...movie,
        isNominated: nominations.some(
          (nomination) => nomination.imdbID === movie.imdbID
        ),
      };
    });
    setResults((prevResults) => {
      return { ...prevResults.searchInput, data: newData };
    });
  }, [nominations]);

  const fetchData = (event) => {
    event.preventDefault();
    axios
      .get(`?s=${searchInput}`)
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
        console.log(data);
        setResults({
          searchInput: searchInput,
          data: data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addToNominations = (movie) => {
    if (nominations.length < 5) {
      setNominations((prevNominations) => [...prevNominations, movie]);
    }
  };

  const removeNominations = (movieId) => {
    setNominations((prevNominations) => [
      ...prevNominations.filter((movie) => movie.imdbID !== movieId),
    ]);
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
                fetchData={fetchData}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
              <Results results={results} addToNominations={addToNominations} />
            </div>
            <Nominations
              nominations={nominations}
              removeNominations={removeNominations}
            />
          </div>
        </section>
      </main>
    </>
  );
}

const Search = ({ searchInput, setSearchInput, fetchData }) => {
  return (
    <form onSubmit={(e) => fetchData(e)}>
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

const Results = ({ results, addToNominations }) => {
  return (
    <div className='grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10'>
      {results.data.map((result) => (
        <Movie
          key={`result-${result.imdbID}`}
          title={result.Title}
          year={result.Year}
          image={result.Poster}
          addToNominations={() => addToNominations(result)}
          isNominated={result.isNominated}
        />
      ))}
    </div>
  );
};

const Nominations = ({ nominations, removeNominations }) => {
  return (
    <div className='sticky flex-1 hidden p-3 space-y-3 bg-gray-100 rounded-md top-20 h-1/2 md:block'>
      <h4>Nominations</h4>
      <ul className='space-y-3'>
        {nominations.map((nomination) => (
          <li key={`nomination-${nomination.imdbID}`}>
            {nomination.Title} ({nomination.Year}){' '}
            <button
              className='btn-nominate'
              onClick={() => removeNominations(nomination.imdbID)}
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
