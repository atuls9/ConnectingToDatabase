import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  async function deleteMovie(id) {
    console.log(" object id", id);
    const res = await fetch(
      `https://connectingtodatabase-21c8b-default-rtdb.firebaseio.com/movies/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log("res", res);
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={() => deleteMovie(props.id)}>Delete Movie</button>{" "}
    </li>
  );
};

export default Movie;
