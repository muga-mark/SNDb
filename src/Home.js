import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import { SET_PAGE_MOVIES_POPULAR, SET_PAGE_MOVIES_UPCOMING, SET_PAGE_MOVIES_TOPRATED,  SET_PAGE_TV_AIRINGTODAY, SET_PAGE_TV_ONTHEAIR, SET_PAGE_TV_POPULAR, SET_PAGE_TV_TOPRATED } from './actions/setPageNo';

import Row from './components/Row';

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

    return (
        <div>

            <Row 
                title={"Popular Movies"}
                type={"movie"}
                chartLink={"popular"}
                chartResult={moviesPopular}
                page={pageMoviesPopular}
                loading={moviesPopularLoading}
            />

            <Row 
                title={"Top Rated Movies"}
                type={"movie"}
                chartLink={"top-rated"}
                chartResult={moviesTopRated}
                page={pageMoviesTopRated}
                loading={moviesTopRatedLoading}
            />

            <Row 
                title={"Top Rated Movies"}
                type={"movie"}
                chartLink={"upcoming"}
                chartResult={moviesUpcoming}
                page={pageMoviesUpcoming}
                loading={moviesUpcomingLoading}
            />
            
            <Row 
                title={"Popular TV Shows"}
                type={"tv"}
                chartLink={"popular"}
                chartResult={tvPopular}
                page={pageTVPopular}
                loading={tvPopularLoading}
            />

            <Row 
                title={"Top Rated TV Shows"}
                type={"tv"}
                chartLink={"top-rated"}
                chartResult={tvTopRated}
                page={pageTVTopRated}
                loading={tvTopRatedLoading}
            />

            <Row 
                title={"Airing Today TV Shows"}
                type={"tv"}
                chartLink={"airing-today"}
                chartResult={tvAiringToday}
                page={pageTVAiringToday}
                loading={tvAiringTodayLoading}
            />

            <Row 
                title={"On The Air Today TV Shows"}
                type={"tv"}
                chartLink={"on-the-air-today"}
                chartResult={tvOnTheAir}
                page={pageTVOnTheAir}
                loading={tvOnTheAirLoading}
            />

        </div>
  );
}

export default Home;