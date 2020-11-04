import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Movie from './components/Movie';
import Slider from "react-slick";
import { MOVIE_POPULAR_API, MOVIE_UPCOMING_API, MOVIE_TOPRATED_API, MOVIE_SEARCH_API } from './api';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesUpcoming, setMoviesUpcoming ] = useState([]);
  const [moviesTopRated, setMoviesTopRated] = useState([]);
  
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5
  };

  useEffect(() => {
    fetch(MOVIE_POPULAR_API)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setMoviesPopular(data.results);
    });

    fetch(MOVIE_UPCOMING_API)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setMoviesUpcoming(data.results);
    });

    fetch(MOVIE_TOPRATED_API)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setMoviesTopRated(data.results);
    });


  }, [])

  return (
    <div className="App">
      <Header />
      <div className="landingPage">


        <div className="movies">
          <h2>Popular Movies</h2>
        </div>
        <div className="movies_container">
          <Slider {...settings}>
            {moviesPopular.length>0 && moviesPopular.map((movie)=> (
              <div>
                <Movie key={movie.id} {...movie} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="movies">
          <h2>Upcoming Movies</h2>
        </div>
        <div className="movies_container">
          <Slider {...settings}>
            {moviesUpcoming.length>0 && moviesUpcoming.map((movie)=> (
              <div>
                <Movie key={movie.id} {...movie} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="movies">
          <h2>Top Rated Movies</h2>
        </div>
        <div className="movies_container">
          <Slider {...settings}>
            {moviesTopRated.length>0 && moviesTopRated.map((movie)=> (
              <div>
                <Movie key={movie.id} {...movie} />
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </div>
  );
}

export default App;