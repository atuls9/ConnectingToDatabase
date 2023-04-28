import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from "./components/AddMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://connectingtodatabase-21c8b-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        handlers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
  const fetctMovieHandler = useCallback(async () => {
    setError(null);
    setisLoading(true);
    try {
      const res = await fetch(
        "https://connectingtodatabase-21c8b-default-rtdb.firebaseio.com/movies.json"
      );
      if (!res.ok) {
        throw new Error("Something went wrong ....Retrying ");
      }
      const jsonData = await res.json();

      const loadedMovies = [];
      for (const key in jsonData) {
        console.log("object fetch key", key);
        loadedMovies.push({
          id: key,
          title: jsonData[key].title,
          openingText: jsonData[key].openingText,
          releaseDate: jsonData[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
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
    content = (
      <>
        <MoviesList setMovies={setMovies} movies={movies} />
      </>
    );
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
      <AddMovies onAddMovie={addMovieHandler} />
      <section>
        <button onClick={fetctMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
