import React, { useEffect, useState } from 'react';
import { SET_PAGE_MOVIES_POPULAR, SET_PAGE_MOVIES_UPCOMING, SET_PAGE_MOVIES_TOPRATED, SET_PAGE_TV_POPULAR, SET_PAGE_TV_UPCOMING, SET_PAGE_TV_AIRINGTODAY, SET_PAGE_TV_ONTHEAIR, SET_PAGE_TV_TOPRATED } from './action';
import { useStateValue } from './StateProvider';
import { Link } from 'react-router-dom';
import CardMovie from './components/CardMovie';
import CardTV from './components/CardTV';
// import { ToastContainer } from 'react-toastify';
import Hidden from '@material-ui/core/Hidden';

import SpinnerContentCustom from "./components/SpinnerContentCustom";
import CarouselCustom from "./components/CarouselCustom";
import './Home.css';

function Home({ pageMoviesPopular, pageMoviesUpcoming, pageMoviesTopRated, pageTVPopular, pageTVUpcoming, pageTVAiringToday, pageTVOnTheAir, pageTVTopRated, moviesPopular, moviesPopularLoading, moviesUpcoming, moviesUpcomingLoading, moviesTopRated, moviesTopRatedLoading, tvPopular, tvPopularLoading, tvTopRated, tvTopRatedLoading, tvAiringToday, tvAiringTodayLoading, tvOnTheAir, tvOnTheAirLoading }) {

    const [{},  dispatch] = useStateValue();
    

    useEffect(() => {

        if(pageMoviesPopular != 1){
            dispatch(SET_PAGE_MOVIES_POPULAR(1));
        }

        if(pageMoviesUpcoming != 1){
            dispatch(SET_PAGE_MOVIES_UPCOMING(1));
        }

        if(pageMoviesTopRated != 1){
            dispatch(SET_PAGE_MOVIES_TOPRATED(1));
        }

        if(pageTVPopular != 1){
            dispatch(SET_PAGE_TV_POPULAR(1));
        }

        if(pageTVUpcoming != 1){
            dispatch(SET_PAGE_TV_UPCOMING(1));
        }

        if(pageTVAiringToday != 1){
            dispatch(SET_PAGE_TV_AIRINGTODAY(1));
        }

        if(pageTVOnTheAir != 1){
            dispatch(SET_PAGE_TV_ONTHEAIR(1));
        }

        if(pageTVTopRated != 1){
            dispatch(SET_PAGE_TV_TOPRATED(1));
        }

    }, [ pageMoviesPopular ]);

    // console.log("PAGE NEXT NO>",pageMoviesPopular);
    return (
      <div className="content">
          {/* <ToastContainer /> */}
        
        <Link to={`/movie/popular/${pageMoviesPopular}`} className="content__link">
            <div className="content__title">
                <span>Popular Movies</span>
            </div>
        </Link>
        <Hidden xsDown>
            <div className="content__container">
                {moviesPopularLoading?
                    <SpinnerContentCustom loading={moviesPopularLoading} />
                :
                    <CarouselCustom 
                        desktop={5}
                        small_desktop={4}
                        tablet={3}
                        small_tablet={2}
                        mobile={2}
                        content={moviesPopular.length>0 && moviesPopular.map((result)=> (
                                        <div key={result.id}>
                                            <CardMovie key={result.id} {...result} />
                                        </div>
                                    ))}
                    />
                }
            </div>
        </Hidden>  
        <Hidden smUp>
            <div className="content__container content__container_scroll">
                {moviesPopularLoading?
                    <SpinnerContentCustom loading={moviesPopularLoading} />
                :
                    <>
                    {moviesPopular.length>0 && moviesPopular.map((result)=> (
                        <div key={result.id} className="content__card">
                            <CardMovie key={result.id} {...result} />
                        </div>
                    ))}
                    </>
                }
            </div>
        </Hidden>             


        <Link to={`/movie/upcoming/${pageMoviesUpcoming}`} className="content__link">
            <div className="content__title">
                <span>Upcoming Movies</span>
            </div>
        </Link>
        <Hidden xsDown>
            <div className="content__container">
                {moviesUpcomingLoading?
                    <SpinnerContentCustom loading={moviesUpcomingLoading} />
                :
                    <CarouselCustom 
                        desktop={5}
                        small_desktop={4}
                        tablet={3}
                        small_tablet={2}
                        mobile={2}
                        content={moviesUpcoming.length>0 && moviesUpcoming.map((result)=> (
                                    <div key={result.id}>
                                        <CardMovie key={result.id} {...result} />
                                    </div>
                                ))}
                    />
                }
            </div>
        </Hidden>
        <Hidden smUp>
            <div className="content__container content__container_scroll">
                {moviesUpcomingLoading?
                    <SpinnerContentCustom loading={moviesUpcomingLoading} />
                :
                    <>
                    {moviesUpcoming.length>0 && moviesUpcoming.map((result)=> (
                        <div key={result.id} className="content__card">
                            <CardMovie key={result.id} {...result} />
                        </div>
                    ))}
                    </>
                }
            </div>
        </Hidden>      


        <Link to={`/movie/top-rated/${pageMoviesTopRated}`} className="content__link">
            <div className="content__title">
                <span>Top Rated Movies</span>
            </div>
        </Link>
        <Hidden xsDown>
            <div className="content__container">
                {moviesTopRatedLoading?
                    <SpinnerContentCustom loading={moviesTopRatedLoading} />
                :
                    <CarouselCustom
                        desktop={5}
                        small_desktop={4}
                        tablet={3}
                        small_tablet={2}
                        mobile={2}  
                        content={moviesTopRated.length>0 && moviesTopRated.map((result)=> (
                                    <div key={result.id}>
                                        <CardMovie key={result.id} {...result} />
                                    </div>
                                ))}
                    />
                }
            </div>
        </Hidden>
        <Hidden smUp>
            <div className="content__container content__container_scroll">
                {moviesTopRatedLoading?
                    <SpinnerContentCustom loading={moviesTopRatedLoading} />
                :
                    <>
                    {moviesTopRated.length>0 && moviesTopRated.map((result)=> (
                        <div key={result.id} className="content__card">
                            <CardMovie key={result.id} {...result} />
                        </div>
                    ))}
                    </>
                }
            </div>
        </Hidden>     


        <Link to={`/tv/popular/${pageTVPopular}`} className="content__link">
            <div className="content__title">
                <span>Popular TV Shows</span>
            </div>
        </Link>
        <Hidden xsDown>
            <div className="content__container">
                {tvPopularLoading?
                    <SpinnerContentCustom loading={tvPopularLoading} />
                :
                    <CarouselCustom
                        desktop={5}
                        small_desktop={4}
                        tablet={3}
                        small_tablet={2}
                        mobile={2} 
                        content={tvPopular.length>0 && tvPopular.map((result)=> (
                                    <div key={result.id}>
                                        <CardTV key={result.id} {...result} />
                                    </div>
                                ))}
                    />
                }             
            </div>
        </Hidden>
        <Hidden smUp>
            <div className="content__container content__container_scroll">
                {tvPopularLoading?
                    <SpinnerContentCustom loading={tvPopularLoading} />
                :
                    <>
                    {tvPopular.length>0 && tvPopular.map((result)=> (
                        <div key={result.id} className="content__card">
                            <CardTV key={result.id} {...result} />
                        </div>
                    ))}
                    </>
                }
            </div>
        </Hidden>   


        <Link to={`/tv/top-rated/${pageTVTopRated}`} className="content__link">
            <div className="content__title">
                <span>Top Rated TV Shows</span>
            </div>
        </Link>
        <Hidden xsDown>
            <div className="content__container">
                {tvTopRatedLoading?
                    <SpinnerContentCustom loading={tvTopRatedLoading} />
                :
                    <CarouselCustom
                        desktop={5}
                        small_desktop={4}
                        tablet={3}
                        small_tablet={2}
                        mobile={2}  
                        content={tvTopRated.length>0 && tvTopRated.map((result)=> (
                                    <div key={result.id}>
                                        <CardTV key={result.id} {...result} />
                                    </div>
                                ))}
                    />
                }             
            </div>
        </Hidden>
        <Hidden smUp>
            <div className="content__container content__container_scroll">
                {tvTopRatedLoading?
                    <SpinnerContentCustom loading={tvTopRatedLoading} />
                :
                    <>
                    {tvTopRated.length>0 && tvTopRated.map((result)=> (
                        <div key={result.id} className="content__card">
                            <CardTV key={result.id} {...result} />
                        </div>
                    ))}
                    </>
                }
            </div>
        </Hidden>   


        <Link to={`/tv/airing-today/${pageTVAiringToday}`} className="content__link">
            <div className="content__title">
                <span>Airing Today TV Shows</span>
            </div>
        </Link>
        <Hidden xsDown>
            <div className="content__container">
                {tvAiringTodayLoading?
                    <SpinnerContentCustom loading={tvAiringTodayLoading} />
                :
                    <CarouselCustom
                        desktop={5}
                        small_desktop={4}
                        tablet={3}
                        small_tablet={2}
                        mobile={2}  
                        content={tvAiringToday.length>0 && tvAiringToday.map((result)=> (
                                    <div key={result.id}>
                                        <CardTV key={result.id} {...result} />
                                    </div>
                                ))}
                    />
                }               
            </div>
        </Hidden>
        <Hidden smUp>
            <div className="content__container content__container_scroll">
                {tvAiringTodayLoading?
                    <SpinnerContentCustom loading={tvAiringTodayLoading} />
                :
                    <>
                    {tvAiringToday.length>0 && tvAiringToday.map((result)=> (
                        <div key={result.id} className="content__card">
                            <CardTV key={result.id} {...result} />
                        </div>
                    ))}
                    </>
                }
            </div>
        </Hidden>  


        <Link to={`/tv/on-the-air-today/${pageTVOnTheAir}`} className="content__link">
            <div className="content__title">
                <span>On The Air Today TV Shows</span>
            </div>
        </Link>
        <Hidden xsDown>
            <div className="content__container">
                {tvOnTheAirLoading?
                    <SpinnerContentCustom loading={tvOnTheAirLoading} />
                :
                    <CarouselCustom 
                        desktop={5}
                        small_desktop={4}
                        tablet={3}
                        small_tablet={2}
                        mobile={2} 
                        content={tvOnTheAir.length>0 && tvOnTheAir.map((result)=> (
                                    <div key={result.id}>
                                        <CardTV key={result.id} {...result} />
                                    </div>
                                ))}
                    />
                }               
            </div>
        </Hidden>
        <Hidden smUp>
            <div className="content__container content__container_scroll">
                {tvOnTheAirLoading?
                    <SpinnerContentCustom loading={tvOnTheAirLoading} />
                :
                    <>
                    {tvOnTheAir.length>0 && tvOnTheAir.map((result)=> (
                        <div key={result.id} className="content__card">
                            <CardTV key={result.id} {...result} />
                        </div>
                    ))}
                    </>
                }
            </div>
        </Hidden>  

      </div>
  );
}

export default Home;