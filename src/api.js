
import API_KEY from './API_KEY';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const MOVIE_DETAILS_API = `https://api.themoviedb.org/3/movie/movie_id?api_key=${API_KEY}&language=en-US`;


const MOVIE_SEARCH_API = `https://api.themoviedb.org/search/movie?&api_key=${API_KEY}&query=`;

const MOVIE_POPULAR_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=250`;

const MOVIE_UPCOMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

const MOVIE_TOPRATED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1}&vote_count.gte=500&`;


const TV_POPULAR_API = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

const TV_TOPRATED_API = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&page=1&timezone=America%2FNew_York&vote_average.gte=3&vote_count.gte=500&include_null_first_air_dates=false&with_original_language=en`;

const TV_AIRINGTODAY_API = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`;

const TV_ONTHEAIR_API = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`;

export { API_KEY, MOVIE_POPULAR_API, MOVIE_UPCOMING_API, MOVIE_TOPRATED_API, MOVIE_SEARCH_API, MOVIE_DETAILS_API, IMG_API, TV_POPULAR_API, TV_TOPRATED_API, TV_AIRINGTODAY_API, TV_ONTHEAIR_API }