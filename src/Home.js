import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { SET_PAGE_MOVIES_POPULAR, SET_PAGE_MOVIES_UPCOMING, SET_PAGE_MOVIES_TOPRATED,  SET_PAGE_TV_AIRINGTODAY, SET_PAGE_TV_ONTHEAIR, SET_PAGE_TV_POPULAR, SET_PAGE_TV_TOPRATED } from './actions/setPageNo';

import CardMovie from './components/CardMovie';
import CardTV from './components/CardTV';
import SpinnerContentCustom from "./components/SpinnerContentCustom";
import CarouselCustom from "./components/CarouselCustom";

import Hidden from '@material-ui/core/Hidden';
import './Home.css';

function Home({ moviesPopularLoading, moviesTopRatedLoading, moviesUpcomingLoading, tvAiringTodayLoading, tvOnTheAirLoading, tvPopularLoading, tvTopRatedLoading }) {
    
    const [{  pageMoviesPopular, pageMoviesUpcoming, pageMoviesTopRated, pageTVAiringToday, pageTVOnTheAir, pageTVPopular, pageTVTopRated, moviesPopular, moviesUpcoming, moviesTopRated, tvAiringToday, tvOnTheAir, tvTopRated, tvPopular },  dispatch] = useStateValue();
    
    useEffect(() => {
        if(pageMoviesPopular !== 1){
            dispatch(SET_PAGE_MOVIES_POPULAR(1));
        }

        if(pageMoviesTopRated !== 1){
            dispatch(SET_PAGE_MOVIES_TOPRATED(1));
        }

        if(pageMoviesUpcoming !== 1){
            dispatch(SET_PAGE_MOVIES_UPCOMING(1));
        }

        if(pageTVAiringToday !== 1){
            dispatch(SET_PAGE_TV_AIRINGTODAY(1));
        }

        if(pageTVOnTheAir !== 1){
            dispatch(SET_PAGE_TV_ONTHEAIR(1));
        }

        if(pageTVPopular !== 1){
            dispatch(SET_PAGE_TV_POPULAR(1));
        }

        if(pageTVTopRated !== 1){
            dispatch(SET_PAGE_TV_TOPRATED(1));
        }

    }, [ pageMoviesPopular, pageMoviesTopRated, pageMoviesUpcoming, pageTVAiringToday, pageTVOnTheAir, pageTVPopular, pageTVTopRated, dispatch ]);

    // console.log("PAGE NEXT NO>",pageMoviesPopular);
    return (
      <div className="content">
          {/* <ToastContainer /> */}
        
        <div className="content__title">
            <Link to={`/movie/popular/${pageMoviesPopular}`} className="content__link">
                <span>Popular Movies</span>
            </Link>
        </div>
        <Hidden xsDown>
            <div className="content__container">
                {moviesPopularLoading?
                    <SpinnerContentCustom 
                        loading={moviesPopularLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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
                    <SpinnerContentCustom 
                        loading={moviesPopularLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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


        <div className="content__title">
            <Link to={`/movie/top-rated/${pageMoviesTopRated}`} className="content__link">
                <span>Top Rated Movies</span>
            </Link>
        </div>
        <Hidden xsDown>
            <div className="content__container">
                {moviesTopRatedLoading?
                    <SpinnerContentCustom 
                        loading={moviesTopRatedLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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
                    <SpinnerContentCustom 
                        loading={moviesTopRatedLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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


        <div className="content__title">
            <Link to={`/movie/upcoming/${pageMoviesUpcoming}`} className="content__link">
                <span>Upcoming Movies</span>
            </Link>
        </div>
        <Hidden xsDown>
            <div className="content__container">
                {moviesUpcomingLoading?
                    <SpinnerContentCustom 
                        loading={moviesUpcomingLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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
                    <SpinnerContentCustom 
                        loading={moviesUpcomingLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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


        <div className="content__title">
            <Link to={`/tv/popular/${pageTVPopular}`} className="content__link">
                <span>Popular TV Shows</span>
            </Link>
        </div>
        <Hidden xsDown>
            <div className="content__container">
                {tvPopularLoading?
                    <SpinnerContentCustom 
                        loading={tvPopularLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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
                    <SpinnerContentCustom 
                        loading={tvPopularLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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


       
        <div className="content__title">
            <Link to={`/tv/top-rated/${pageTVTopRated}`} className="content__link">
                <span>Top Rated TV Shows</span>
            </Link>
        </div>
        <Hidden xsDown>
            <div className="content__container">
                {tvTopRatedLoading?
                    <SpinnerContentCustom 
                        loading={tvTopRatedLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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
                    <SpinnerContentCustom 
                        loading={tvTopRatedLoading}
                        size={20}
                        color={"#D1312D"}
                    />
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


        
        <div className="content__title">
            <Link to={`/tv/airing-today/${pageTVAiringToday}`} className="content__link">
                <span>Airing Today TV Shows</span>
            </Link>
        </div>
        <Hidden xsDown>
            <div className="content__container">
                {tvAiringTodayLoading?
                    <SpinnerContentCustom 
                        loading={tvAiringTodayLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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
                    <SpinnerContentCustom 
                        loading={tvAiringTodayLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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


        
        <div className="content__title">
            <Link to={`/tv/on-the-air-today/${pageTVOnTheAir}`} className="content__link">
                <span>On The Air Today TV Shows</span>
            </Link>
        </div>
        <Hidden xsDown>
            <div className="content__container">
                {tvOnTheAirLoading?
                    <SpinnerContentCustom 
                        loading={tvOnTheAirLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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
                    <SpinnerContentCustom 
                        loading={tvOnTheAirLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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