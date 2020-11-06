import React, { useEffect, useState } from 'react';
import CardMovie from './components/CardMovie';
import CardTV from './components/CardTV';
// import { ToastContainer } from 'react-toastify';
import { MOVIE_POPULAR_API, MOVIE_UPCOMING_API, MOVIE_TOPRATED_API, TV_POPULAR_API, TV_TOPRATED_API, TV_AIRINGTODAY_API, TV_ONTHEAIR_API, MOVIE_SEARCH_API } from './api';

import SpinnerContentCustom from "./components/SpinnerContentCustom";
import CarouselCustom from "./components/CarouselCustom";
import './Home.css';

function Home() {
  const [ moviesPopular, setMoviesPopular ] = useState([]);
  const [ moviesPopularLoading, setMoviesPopularLoading ] = useState(true);

  const [ moviesUpcoming, setMoviesUpcoming ] = useState([]);
  const [ moviesUpcomingLoading, setMoviesUpcomingLoading ] = useState(true);

  const [ moviesTopRated, setMoviesTopRated ] = useState([]);
  const [ moviesTopRatedLoading, setMoviesTopRatedLoading ] = useState(true);

  const [ tvPopular, setTVPopular ] = useState([]);
  const [ tvPopularLoading, setTVPopularLoading ] = useState(true);

  const [ tvTopRated, setTVTopRated ] = useState([]);
  const [ tvTopRatedLoading, setTVTopRatedLoading ] = useState(true);

  const [ tvAiringToday, setTVAiringToday ] = useState([]);
  const [ tvAiringTodayLoading, setTVAiringTodayLoading ] = useState(true);

  const [ tvOnTheAir, setTVOnTheAir ] = useState([]);
  const [ tvOnTheAirLoading, setTVOnTheAirLoading ] = useState(true);

  useEffect(() => {
    fetch(MOVIE_POPULAR_API)
    .then(res => res.json())
    .then(data => {
    //   console.log(data);
      setMoviesPopular(data.results);
      setMoviesPopularLoading(false);
    });

    fetch(MOVIE_UPCOMING_API)
    .then(res => res.json())
    .then(data => {
    //   console.log(data);
      setMoviesUpcoming(data.results);
      setMoviesUpcomingLoading(false);
    });

    fetch(MOVIE_TOPRATED_API)
    .then(res => res.json())
    .then(data => {
      console.log("TOP RATED MOVIES", data);
      setMoviesTopRated(data.results);
      setMoviesTopRatedLoading(false);
    });


    fetch(TV_POPULAR_API)
    .then(res => res.json())
    .then(data => {
    //   console.log("TV POPULAR RESULT", data);
      setTVPopular(data.results);
      setTVPopularLoading(false);
    });

    fetch(TV_TOPRATED_API)
    .then(res => res.json())
    .then(data => {
    //   console.log(data);
      setTVTopRated(data.results);
      setTVTopRatedLoading(false);
    });
    
    fetch(TV_AIRINGTODAY_API)
    .then(res => res.json())
    .then(data => {
    //   console.log("AIRING TODAY", data);
      setTVAiringToday(data.results);
      setTVAiringTodayLoading(false);
    });

    fetch(TV_ONTHEAIR_API)
    .then(res => res.json())
    .then(data => {
    //   console.log(data);
      setTVOnTheAir(data.results);
      setTVOnTheAirLoading(false);
    });

  }, [])

  return (
      <div className="content">
          {/* <ToastContainer /> */}

        <div className="content__title">
          <span>Popular Movies</span>
        </div>
        <div className="content__container">
            {moviesPopularLoading?
                <SpinnerContentCustom loading={moviesPopularLoading} />
            :
                <CarouselCustom content=
                    {moviesPopular.length>0 && moviesPopular.map((result)=> (
                        <div key={result.id}>
                            <CardMovie key={result.id} {...result} />
                        </div>
                    ))}
                />
            }
        </div>

        <div className="content__title">
          <span>Upcoming Movies</span>
        </div>
        <div className="content__container">
            {moviesUpcomingLoading?
                <SpinnerContentCustom loading={moviesUpcomingLoading} />
            :
                <CarouselCustom content=
                    {moviesUpcoming.length>0 && moviesUpcoming.map((result)=> (
                        <div key={result.id}>
                            <CardMovie key={result.id} {...result} />
                        </div>
                    ))}
                />
            }
        </div>

        <div className="content__title">
          <span>Top Rated Movies</span>
        </div>
        <div className="content__container">
            {moviesTopRatedLoading?
                <SpinnerContentCustom loading={moviesTopRatedLoading} />
            :
                <CarouselCustom content=
                    {moviesTopRated.length>0 && moviesTopRated.map((result)=> (
                        <div key={result.id}>
                            <CardMovie key={result.id} {...result} />
                        </div>
                    ))}
                />
            }
        </div>

        <div className="content__title">
          <span>Popular TV Shows</span>
        </div>
        <div className="content__container">
            {tvPopularLoading?
                <SpinnerContentCustom loading={tvPopularLoading} />
            :
                <CarouselCustom content=
                    {tvPopular.length>0 && tvPopular.map((result)=> (
                        <div key={result.id}>
                            <CardTV key={result.id} {...result} />
                        </div>
                    ))}
                />
            }             
        </div>

        <div className="content__title">
          <span>Top Rated TV Shows</span>
        </div>
        <div className="content__container">
            {tvTopRatedLoading?
                <SpinnerContentCustom loading={tvTopRatedLoading} />
            :
                <CarouselCustom content=
                    {tvTopRated.length>0 && tvTopRated.map((result)=> (
                        <div key={result.id}>
                            <CardTV key={result.id} {...result} />
                        </div>
                    ))}
                />
            }             
        </div>

        <div className="content__title">
          <span>Airing Today TV Shows</span>
        </div>
        <div className="content__container">
            {tvAiringTodayLoading?
                <SpinnerContentCustom loading={tvAiringTodayLoading} />
            :
                <CarouselCustom content=
                    {tvAiringToday.length>0 && tvAiringToday.map((result)=> (
                        <div key={result.id}>
                            <CardTV key={result.id} {...result} />
                        </div>
                    ))}
                />
            }               
        </div>

        <div className="content__title">
          <span>On The Air TV Shows</span>
        </div>
        <div className="content__container">
            {tvOnTheAirLoading?
                <SpinnerContentCustom loading={tvOnTheAirLoading} />
            :
                <CarouselCustom content=
                    {tvOnTheAir.length>0 && tvOnTheAir.map((result)=> (
                        <div key={result.id}>
                            <CardTV key={result.id} {...result} />
                        </div>
                    ))}
                />
            }               
        </div>

      </div>
  );
}

export default Home;