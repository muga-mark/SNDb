import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';

import { SET_PAGE_MOVIES_POPULAR, SET_PAGE_MOVIES_UPCOMING, SET_PAGE_MOVIES_TOPRATED,  SET_PAGE_TV_AIRINGTODAY, SET_PAGE_TV_ONTHEAIR, SET_PAGE_TV_POPULAR, SET_PAGE_TV_TOPRATED } from './actions/setPageNo';
import { SET_SORTEDBY_MOVIES_POPULAR, SET_SORTEDBY_MOVIES_TOPRATED,  SET_SORTEDBY_TV_POPULAR, SET_SORTEDBY_TV_TOPRATED } from './actions/setSortBy';
import { SET_SEARCH, SET_PAGE_SEARCH, SET_SEARCH_RESULT } from './actions/setSearch';

import Row from './components/Row';

function Home({ moviesPopularLoading, moviesTopRatedLoading, moviesUpcomingLoading, tvAiringTodayLoading, tvOnTheAirLoading, tvPopularLoading, tvTopRatedLoading, setMoviesPopularLoading,  setMoviesUpcomingLoading, setMoviesTopRatedLoading, setTVAiringTodayLoading, setTVOnTheAirLoading, setTVPopularLoading, setTVTopRatedLoading, setSearchLoading }) {
    
    const history = useHistory(); 
    const [{  moviesPopular, pageMoviesPopular, sortedByMoviesPopular, moviesUpcoming, pageMoviesUpcoming, moviesTopRated, pageMoviesTopRated, sortedByMoviesTopRated, tvAiringToday, pageTVAiringToday, tvOnTheAir, pageTVOnTheAir, tvPopular, pageTVPopular, sortedByTVPopular, pageTVTopRated, tvTopRated, sortedByTVTopRated, searchPage, search },  dispatch] = useStateValue();
    
    useEffect(() => {
        if(searchPage !== 1){
            dispatch(SET_PAGE_SEARCH(1));
            setSearchLoading(true);
            
            if(searchPage === 1){
                setSearchLoading(false);
            }
        }
        if(search !== ""){
            dispatch(SET_SEARCH(""));
            dispatch(SET_SEARCH_RESULT([]));
            setSearchLoading(true);
            
            if(search === ""){
                setSearchLoading(false);
            }
        }

        if(pageMoviesPopular !== 1){
            dispatch(SET_PAGE_MOVIES_POPULAR(1));
            setMoviesPopularLoading(true);
            
            if(pageMoviesPopular === 1){
                setMoviesPopularLoading(false);
            }
        }
        if(sortedByMoviesPopular !== "popularity.desc"){
            dispatch(SET_SORTEDBY_MOVIES_POPULAR("popularity.desc"));
            setMoviesPopularLoading(true);
            
            if(sortedByMoviesPopular === "popularity.desc"){
                setMoviesPopularLoading(false);
            }
        }


        if(pageMoviesUpcoming !== 1){
            dispatch(SET_PAGE_MOVIES_UPCOMING(1));
            setMoviesUpcomingLoading(true);

            if(pageMoviesUpcoming === 1){
                setMoviesUpcomingLoading(false);
            }
        }


        if(pageMoviesTopRated !== 1){
            dispatch(SET_PAGE_MOVIES_TOPRATED(1));
            setMoviesTopRatedLoading(true);

            if(pageMoviesTopRated === 1){
                setMoviesTopRatedLoading(false);
            }
        }
        if(sortedByMoviesTopRated !== "vote_average.desc"){
            dispatch(SET_SORTEDBY_MOVIES_TOPRATED("vote_average.desc"));
            setMoviesTopRatedLoading(true);

            if(sortedByMoviesTopRated === "vote_average.desc"){
                setMoviesTopRatedLoading(false);
            }
        }


        if(pageTVAiringToday !== 1){
            dispatch(SET_PAGE_TV_AIRINGTODAY(1));
            setTVAiringTodayLoading(true);

            if(pageTVAiringToday === 1){    
                setTVAiringTodayLoading(false);
            }
        }


        if(pageTVOnTheAir !== 1){
            dispatch(SET_PAGE_TV_ONTHEAIR(1));
            setTVOnTheAirLoading(true);

            if(pageTVOnTheAir === 1){
                setTVOnTheAirLoading(false);
            }
        }


        if(pageTVPopular !== 1){
            dispatch(SET_PAGE_TV_POPULAR(1));
            setTVPopularLoading(true);

            if(pageTVPopular === 1){
                setTVPopularLoading(false);
            }
        }
        if(sortedByTVPopular !== "popularity.desc"){
            dispatch(SET_SORTEDBY_TV_POPULAR("popularity.desc"));
            setTVPopularLoading(true);

            if(sortedByTVPopular === "popularity.desc"){
                setTVPopularLoading(false);
            }
        }


        if(pageTVTopRated !== 1){
            dispatch(SET_PAGE_TV_TOPRATED(1));
            setTVTopRatedLoading(true);

            if(pageTVTopRated === 1){
                setTVTopRatedLoading(false);
            }
        }
        if(sortedByTVTopRated !== "vote_average.desc"){
            dispatch(SET_SORTEDBY_TV_TOPRATED("vote_average.desc"));
            setTVTopRatedLoading(true);

            if(sortedByTVTopRated === "vote_average.desc"){
                setTVTopRatedLoading(false);
            }
        }

    }, [ pageMoviesPopular, sortedByMoviesPopular, pageMoviesTopRated, sortedByMoviesTopRated, pageMoviesUpcoming, pageTVAiringToday, pageTVOnTheAir, pageTVPopular, sortedByTVPopular, pageTVTopRated, sortedByTVTopRated, dispatch ]);

    return (
        <div>

            <Row 
                title={"Popular Movies"}
                type={"movie"}
                chartLink={"popular"}
                chartResult={moviesPopular.results}
                page={pageMoviesPopular}
                loading={moviesPopularLoading}
            />

            <Row 
                title={"Top Rated Movies"}
                type={"movie"}
                chartLink={"top-rated"}
                chartResult={moviesTopRated.results}
                page={pageMoviesTopRated}
                loading={moviesTopRatedLoading}
            />

            <Row 
                title={"Upcoming Movies"}
                type={"movie"}
                chartLink={"upcoming"}
                chartResult={moviesUpcoming.results}
                page={pageMoviesUpcoming}
                loading={moviesUpcomingLoading}
            />
            
            <Row 
                title={"Popular TV Shows"}
                type={"tv"}
                chartLink={"popular"}
                chartResult={tvPopular.results}
                page={pageTVPopular}
                loading={tvPopularLoading}
            />

            <Row 
                title={"Top Rated TV Shows"}
                type={"tv"}
                chartLink={"top-rated"}
                chartResult={tvTopRated.results}
                page={pageTVTopRated}
                loading={tvTopRatedLoading}
            />

            <Row 
                title={"Airing Today TV Shows"}
                type={"tv"}
                chartLink={"airing-today"}
                chartResult={tvAiringToday.results}
                page={pageTVAiringToday}
                loading={tvAiringTodayLoading}
            />

            <Row 
                title={"On The Air Today TV Shows"}
                type={"tv"}
                chartLink={"on-the-air-today"}
                chartResult={tvOnTheAir.results}
                page={pageTVOnTheAir}
                loading={tvOnTheAirLoading}
            />

        </div>
  );
}

export default Home;