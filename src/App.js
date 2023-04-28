import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from "./components/AddMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetctMovieHandler = useCallback(async () => {
    setError(null);
    setisLoading(true);
    try {
      const res = await fetch("https://swapi.dev/api/films/");
      if (!res.ok) {
        throw new Error("Something went wrong ....Retrying ");
      }
      const jsonData = await res.json();
      const transformedMovies = jsonData.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedMovies);
    } catch (error) {
      console.log("error", error);
      console.log(error.message, "errorms");
      setError(error.message);
    }
    setisLoading(false);
  }, []);
  useEffect(() => {
    fetctMovieHandler();
  }, [fetctMovieHandler]);

  let content = <p>Found no movies</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    const timeout = setTimeout(fetctMovieHandler, 5000);

    content = (
      <>
        {" "}
        <p>{error}</p>;
        <button
          onClick={() => {
            setError(null);
            clearTimeout(timeout);
          }}
        >
          Cancel
        </button>
      </>
    );
  }
  if (isLoading) {
    content = <p>Loading data please wait ...</p>;
  }

  return (
    <React.Fragment>
      <AddMovies />
      <section>
        <button onClick={fetctMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
