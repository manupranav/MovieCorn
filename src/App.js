import React from "react";
import { useState, useEffect } from "react";

import "./App.css";
import SearchIcon from "./Search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?i={OMDB_ID}&apikey={OMDB_API}";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Movie Corn";
  });

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieCorn</h1>
      <div className="search">
        <input
          placeholder="Search your movies.."
          value={searchTerm}
          onChange={(a) => setSearchTerm(a.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search-icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
