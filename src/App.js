import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Movie from './components/Movie';
import './App.css';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=311f76d68ef44dd18eb2aff84f4b78dd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

const MOVIE_TOPRATED_API = "https://api.themoviedb.org/3/movie/top_rated?api_key=311f76d68ef44dd18eb2aff84f4b78dd&language=en-US&page=1";

const MOVIE_SEARCH_API = "https://api.themoviedb.org/search/movie?&api_key=311f76d68ef44dd18eb2aff84f4b78dd&query=";

const MOVIE_DETAILS_API = "https://api.themoviedb.org/3/movie/movie_id?api_key=311f76d68ef44dd18eb2aff84f4b78dd&language=en-US";

const MOVIE_TRAILER_API = "https://api.themoviedb.org/3/movie/movie_id/videos?api_key=311f76d68ef44dd18eb2aff84f4b78dd&language=en-US";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(MOVIE_TOPRATED_API)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setMovies(data.results);
    })
  }, [])

  return (
    <div className="App">
      <Header />
      {movies.length>0 && movies.map((movie)=> <Movie key={movie.id} {...movie} />)}
    </div>
  );
}

export default App;