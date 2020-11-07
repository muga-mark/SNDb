import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MOVIE_POPULAR_API, MOVIE_UPCOMING_API, MOVIE_TOPRATED_API, TV_POPULAR_API, TV_TOPRATED_API, TV_AIRINGTODAY_API, TV_ONTHEAIR_API, MOVIE_SEARCH_API } from './api';

import Header from './components/Header';
import Home from './Home';
import MoviesPopular from './pages/MoviesPopular';
import MoviesTopRated from './pages/MoviesTopRated';
import MoviesUpcoming from './pages/MoviesUpcoming';
import TVPopular from './pages/TVPopular';
import TVTopRated from './pages/TVTopRated';
import TVAiringToday from './pages/TVAiringToday';
import TVOnTheAir from './pages/TVOnTheAir';

import "react-multi-carousel/lib/styles.css";
import './App.css';

function App() {
  const [ moviesPopular, setMoviesPopular ] = useState([]);
  const [ moviesPopularLoading, setMoviesPopularLoading ] = useState(true);
  const [ moviesPopularTotalPages, setMoviesPopularTotalPages ] = useState(0);

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
      console.log("popular movies", data);
      setMoviesPopular(data.results);
      setMoviesPopularTotalPages(data.total_pages);
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

  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path ="/">
            <Header />
            <Home 
              moviesPopular={moviesPopular} 
              moviesPopularLoading={moviesPopularLoading} 
              moviesUpcoming={moviesUpcoming} 
              moviesUpcomingLoading={moviesUpcomingLoading} 
              moviesTopRated={moviesTopRated}
              moviesTopRatedLoading={moviesTopRatedLoading}
              tvPopular={tvPopular}
              tvPopularLoading={tvPopularLoading}
              tvTopRated={tvTopRated}
              tvTopRatedLoading={tvTopRatedLoading}
              tvAiringToday={tvAiringToday}
              tvAiringTodayLoading={tvAiringTodayLoading}
              tvOnTheAir={tvOnTheAir}
              tvOnTheAirLoading={tvOnTheAirLoading}
            />
          </Route>

          <Route exact path ="/movie/popular">
            <Header />
            <MoviesPopular 
              moviesPopular={moviesPopular} 
              moviesPopularLoading={moviesPopularLoading} 
              moviesPopularTotalPages={moviesPopularTotalPages}
            />
          </Route>

          <Route exact path ="/movie/upcoming">
            <Header />
            <MoviesUpcoming moviesUpcoming={moviesUpcoming} moviesUpcomingLoading={moviesUpcomingLoading} />
          </Route>

          <Route exact path ="/movie/top-rated">
            <Header />
            <MoviesTopRated moviesTopRated={moviesTopRated} moviesTopRatedLoading={moviesTopRatedLoading} />
          </Route>

          <Route exact path ="/tv/popular">
            <Header />
            <TVPopular tvPopular={tvPopular} tvPopularLoading={tvPopularLoading} />
          </Route>

          <Route exact path ="/tv/top-rated">
            <Header />
            <TVTopRated tvTopRated={tvTopRated} tvTopRatedLoading={tvTopRatedLoading} />
          </Route>

          <Route exact path ="/tv/airing-today">
            <Header />
            <TVAiringToday tvAiringToday={tvAiringToday} tvAiringTodayLoading={tvAiringTodayLoading} />
          </Route>
      
          <Route exact path ="/tv/on-the-air-today">
            <Header />
            <TVOnTheAir tvOnTheAir={tvOnTheAir} tvOnTheAirLoading={tvOnTheAirLoading} />
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