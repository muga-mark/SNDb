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
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
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

        <div className="content__title">
          <span>Popular Movies</span>
        </div>
        <div className="content__container">
          <Slider {...settings}>
            {moviesPopular.length>0 && moviesPopular.map((movie)=> (
              <div>
                <Movie key={movie.id} {...movie} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="content__title">
          <span>Upcoming Movies</span>
        </div>
        <div className="content__container">
          <Slider {...settings}>
            {moviesUpcoming.length>0 && moviesUpcoming.map((movie)=> (
              <div>
                <Movie key={movie.id} {...movie} />
              </div>
            ))}
          </Slider>
        </div>

        <div className="content__title">
          <span>Top Rated Movies</span>
        </div>
        <div className="content__container">
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