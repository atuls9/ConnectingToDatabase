import React from "react";
import "./AddMovies.css";
import { useRef } from "react";

const AddMovies = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const dateRef = useRef("");

  const addMovieHandler = (e) => {
    e.preventDefault();
    const obj = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: dateRef.current.value,
    };
    props.onAddMovie(obj);
    console.log(obj);
  };
  return (
    <form action="" className="control" onSubmit={addMovieHandler}>
      <label htmlFor="title">Title</label>
      <input type="text" ref={titleRef} />
      <label htmlFor="openingText">Opening Text</label>
      <input type="text" ref={openingTextRef} />
      <label htmlFor="releaseDate">Release Date</label>
      <input type="text" ref={dateRef} />
      <button style={{ margin: "12px" }}>Add Movie</button>
    </form>
  );
};

export default AddMovies;
