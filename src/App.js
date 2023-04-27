import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetctMovieHandler = async () => {
    setisLoading(true);
    const res = await fetch("https://swapi.dev/api/films/");
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
    setisLoading(false);
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetctMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading data please wait ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
