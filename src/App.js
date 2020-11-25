import React, { useEffect, useState } from 'react';
import { useStateValue } from './StateProvider';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MOVIE_POPULAR_API, MOVIE_UPCOMING_API, MOVIE_TOPRATED_API, TV_AIRINGTODAY_API, TV_ONTHEAIR_API, TV_POPULAR_API, TV_TOPRATED_API } from './api';
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
  const [{ },  dispatch] = useStateValue();
  const [ moviesPopularLoading, setMoviesPopularLoading ] = useState(true);
  const [ moviesUpcomingLoading, setMoviesUpcomingLoading ] = useState(true);
  const [ moviesTopRatedLoading, setMoviesTopRatedLoading ] = useState(true);
  const [ tvAiringTodayLoading, setTVAiringTodayLoading ] = useState(true);
  const [ tvOnTheAirLoading, setTVOnTheAirLoading ] = useState(true);
  const [ tvPopularLoading, setTVPopularLoading ] = useState(true);
  const [ tvTopRatedLoading, setTVTopRatedLoading ] = useState(true);
  
  useEffect(() => {
    fetch(MOVIE_POPULAR_API)
    .then(res => res.json())
    .then(data => {
      dispatch(SET_MOVIES_POPULAR(data.results));
      setMoviesPopularLoading(false);
    });

    fetch(MOVIE_TOPRATED_API)
    .then(res => res.json())
    .then(data => {
      dispatch(SET_MOVIES_TOPRATED(data.results));
      setMoviesTopRatedLoading(false);
    });

    fetch(MOVIE_UPCOMING_API)
    .then(res => res.json())
    .then(data => {
      dispatch(SET_MOVIES_UPCOMING(data.results));
      setMoviesUpcomingLoading(false);
    });
    
    fetch(TV_AIRINGTODAY_API)
    .then(res => res.json())
    .then(data => {
      dispatch(SET_TV_AIRINGTODAY(data.results));   
      setTVAiringTodayLoading(false);
    });

    fetch(TV_ONTHEAIR_API)
    .then(res => res.json())
    .then(data => {
      dispatch(SET_TV_ONTHEAIR(data.results));  
      setTVOnTheAirLoading(false);
    });

    fetch(TV_POPULAR_API)
    .then(res => res.json())
    .then(data => {
      dispatch(SET_TV_POPULAR(data.results));      
      setTVPopularLoading(false);
    });

    fetch(TV_TOPRATED_API)
    .then(res => res.json())
    .then(data => {
      dispatch(SET_TV_TOPRATED(data.results));   
      setTVTopRatedLoading(false);
    });

  }, [ ]);

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
              />
            </div>
          </Route>

          <Route exact path ="/movie/popular/:pageNo">
            <Header />
            <div className="main_wrapper">
              <MoviesPopular />
            </div>
          </Route>

          <Route exact path ="/movie/upcoming/:pageNo">
            <Header />
            <div className="main_wrapper">
              <MoviesUpcoming />
            </div>
          </Route>

          <Route exact path ="/movie/top-rated/:pageNo">
            <Header />
            <div className="main_wrapper">
              <MoviesTopRated />
            </div>
          </Route>

          <Route exact path ="/tv/popular/:pageNo">
            <Header />
            <div className="main_wrapper">
              <TVPopular />
            </div>
          </Route>

          <Route exact path ="/tv/top-rated/:pageNo">
            <Header />
            <div className="main_wrapper">
              <TVTopRated />
            </div>
          </Route>

          <Route exact path ="/tv/airing-today/:pageNo">
            <Header />
            <div className="main_wrapper">
              <TVAiringToday />
            </div>
          </Route>
      
          <Route exact path ="/tv/on-the-air-today/:pageNo">
            <Header />
            <div className="main_wrapper">
              <TVOnTheAir />
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