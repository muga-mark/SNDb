import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardMovie from './components/CardMovie';
import CardTV from './components/CardTV';
// import { ToastContainer } from 'react-toastify';

import SpinnerContentCustom from "./components/SpinnerContentCustom";
import CarouselCustom from "./components/CarouselCustom";
import './Home.css';

function Home({ moviesPopular, moviesPopularLoading, moviesUpcoming, moviesUpcomingLoading, moviesTopRated, moviesTopRatedLoading, tvPopular, tvPopularLoading, tvTopRated, tvTopRatedLoading, tvAiringToday, tvAiringTodayLoading, tvOnTheAir, tvOnTheAirLoading }) {
  
  return (
      <div className="content">
          {/* <ToastContainer /> */}
        

        <Link to='/movie/popular' className="content__link">
            <div className="content__title">
                <span>Popular Movies</span>
            </div>
        </Link>
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

        <Link to='/movie/upcoming' className="content__link">
            <div className="content__title">
                <span>Upcoming Movies</span>
            </div>
        </Link>
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

        <Link to='/movie/top-rated' className="content__link">
            <div className="content__title">
                <span>Top Rated Movies</span>
            </div>
        </Link>
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

        <Link to='/tv/popular' className="content__link">
            <div className="content__title">
                <span>Popular TV Shows</span>
            </div>
        </Link>
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

        <Link to='/tv/top-rated' className="content__link">
            <div className="content__title">
                <span>Top Rated TV Shows</span>
            </div>
        </Link>
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

        <Link to='/tv/airing-today' className="content__link">
            <div className="content__title">
                <span>Airing Today TV Shows</span>
            </div>
        </Link>
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

        <Link to='/tv/on-the-air-today' className="content__link">
            <div className="content__title">
                <span>On The Air Today TV Shows</span>
            </div>
        </Link>
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