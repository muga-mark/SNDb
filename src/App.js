import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MOVIE_POPULAR_API, MOVIE_UPCOMING_API, MOVIE_TOPRATED_API, TV_AIRINGTODAY_API, TV_ONTHEAIR_API, TV_POPULAR_API, TV_TOPRATED_API } from './actions/setAPI';
import { SET_MOVIES_POPULAR, SET_MOVIES_UPCOMING, SET_MOVIES_TOPRATED, SET_TV_AIRINGTODAY, SET_TV_ONTHEAIR, SET_TV_POPULAR, SET_TV_TOPRATED } from './actions/setResult';

import Home from './Home';
import Header from './components/Header';
import InfoMovie from './pages/InfoMovie';
import InfoTV from './pages/InfoTV';
import MoviesPopular from './pages/MoviesPopular';
import MoviesTopRated from './pages/MoviesTopRated';
import MoviesUpcoming from './pages/MoviesUpcoming';
import TVAiringToday from './pages/TVAiringToday';
import TVOnTheAir from './pages/TVOnTheAir';
import TVPopular from './pages/TVPopular';
import TVTopRated from './pages/TVTopRated';

import "react-multi-carousel/lib/styles.css";
import './App.css';

function App() {
  const [ { sortedByMoviesPopular, pageMoviesPopular, pageMoviesUpcoming, pageMoviesTopRated, sortedByMoviesTopRated, pageTVPopular, sortedByTVPopular, pageTVAiringToday, pageTVOnTheAir, pageTVTopRated, sortedByTVTopRated },  dispatch] = useStateValue();
  const [ moviesPopularLoading, setMoviesPopularLoading ] = useState(true);
  const [ moviesUpcomingLoading, setMoviesUpcomingLoading ] = useState(true);
  const [ moviesTopRatedLoading, setMoviesTopRatedLoading ] = useState(true);
  const [ tvAiringTodayLoading, setTVAiringTodayLoading ] = useState(true);
  const [ tvOnTheAirLoading, setTVOnTheAirLoading ] = useState(true);
  const [ tvPopularLoading, setTVPopularLoading ] = useState(true);
  const [ tvTopRatedLoading, setTVTopRatedLoading ] = useState(true);
  
  useEffect(() => {
    
    fetch(MOVIE_POPULAR_API(sortedByMoviesPopular, pageMoviesPopular))
    .then(res => res.json())
    .then(data => {
      dispatch(SET_MOVIES_POPULAR(data));
      setMoviesPopularLoading(false);
    });

    fetch(MOVIE_UPCOMING_API(pageMoviesUpcoming))
    .then(res => res.json())
    .then(data => {
      dispatch(SET_MOVIES_UPCOMING(data));
      setMoviesUpcomingLoading(false);
    });

    fetch(MOVIE_TOPRATED_API(sortedByMoviesTopRated,pageMoviesTopRated))
    .then(res => res.json())
    .then(data => {
      dispatch(SET_MOVIES_TOPRATED(data));
      setMoviesTopRatedLoading(false);
    });

    
    fetch(TV_AIRINGTODAY_API(pageTVAiringToday))
    .then(res => res.json())
    .then(data => {
      dispatch(SET_TV_AIRINGTODAY(data));   
      setTVAiringTodayLoading(false);
    });

    fetch(TV_ONTHEAIR_API(pageTVOnTheAir))
    .then(res => res.json())
    .then(data => {
      dispatch(SET_TV_ONTHEAIR(data));  
      setTVOnTheAirLoading(false);
    });

    fetch(TV_POPULAR_API(sortedByTVPopular, pageTVPopular))
    .then(res => res.json())
    .then(data => {
      dispatch(SET_TV_POPULAR(data));      
      setTVPopularLoading(false);
    });

    fetch(TV_TOPRATED_API(sortedByTVTopRated, pageTVTopRated))
    .then(res => res.json())
    .then(data => {
      dispatch(SET_TV_TOPRATED(data));   
      setTVTopRatedLoading(false);
    });

  }, [ sortedByMoviesPopular, pageMoviesPopular, pageMoviesUpcoming, sortedByMoviesTopRated, pageMoviesTopRated, pageTVAiringToday, pageTVOnTheAir, sortedByTVPopular, pageTVPopular, sortedByTVTopRated, pageTVTopRated ]);

  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path ="/">
            <Header />
            <div className="main_wrapper">
              <Home
                moviesPopularLoading={moviesPopularLoading} 
                moviesUpcomingLoading={moviesUpcomingLoading} 
                moviesTopRatedLoading={moviesTopRatedLoading}
                tvPopularLoading={tvPopularLoading}
                tvTopRatedLoading={tvTopRatedLoading}
                tvAiringTodayLoading={tvAiringTodayLoading}
                tvOnTheAirLoading={tvOnTheAirLoading}
                setMoviesPopularLoading={setMoviesPopularLoading}
                setMoviesUpcomingLoading={setMoviesUpcomingLoading}
                setMoviesTopRatedLoading={setMoviesTopRatedLoading}
                setTVAiringTodayLoading={setTVAiringTodayLoading}
                setTVOnTheAirLoading={setTVOnTheAirLoading}
                setTVPopularLoading={setTVPopularLoading}
                setTVTopRatedLoading={setTVTopRatedLoading}
              />
            </div>
          </Route>

          <Route exact path ="/movie/popular/:pageNo">
            <Header />
            <div className="main_wrapper">
              <MoviesPopular moviesPopularLoading={moviesPopularLoading} />
            </div>
          </Route>

          <Route exact path ="/movie/upcoming/:pageNo">
            <Header />
            <div className="main_wrapper">
              <MoviesUpcoming moviesUpcomingLoading={moviesUpcomingLoading} />
            </div>
          </Route>

          <Route exact path ="/movie/top-rated/:pageNo">
            <Header />
            <div className="main_wrapper">
              <MoviesTopRated moviesTopRatedLoading={moviesTopRatedLoading} />
            </div>
          </Route>

          <Route exact path ="/tv/popular/:pageNo">
            <Header />
            <div className="main_wrapper">
              <TVPopular tvPopularLoading={tvPopularLoading} />
            </div>
          </Route>

          <Route exact path ="/tv/top-rated/:pageNo">
            <Header />
            <div className="main_wrapper">
              <TVTopRated tvTopRatedLoading={tvTopRatedLoading} />
            </div>
          </Route>

          <Route exact path ="/tv/airing-today/:pageNo">
            <Header />
            <div className="main_wrapper">
              <TVAiringToday tvAiringTodayLoading={tvAiringTodayLoading} />
            </div>
          </Route>
      
          <Route exact path ="/tv/on-the-air-today/:pageNo">
            <Header />
            <div className="main_wrapper">
              <TVOnTheAir tvOnTheAirLoading={tvOnTheAirLoading} />
            </div>
          </Route>

          <Route exact path ="/movie/:movieId">
            <Header />
            <div className="wrapper">
              <InfoMovie />
            </div>
          </Route>

          <Route exact path ="/tv/:TVId">
            <Header />
            <div className="wrapper">
              <InfoTV />
            </div>
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;