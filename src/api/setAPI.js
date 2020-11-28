import API_KEY from '../API_KEY';

export function MOVIE_POPULAR_API(sortBy, pageMoviesPopular) {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${pageMoviesPopular}&vote_count.gte=250`;
}

export function MOVIE_TOPRATED_API(sortBy, pageMoviesTopRated) {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${pageMoviesTopRated}&vote_count.gte=500&`;
}

export function MOVIE_UPCOMING_API(pageMoviesUpcoming) {
    return `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageMoviesUpcoming}`;
}

export function TV_AIRINGTODAY_API(pageTVAiringToday) {
    return `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${pageTVAiringToday}`;
}

export function TV_ONTHEAIR_API(pageTVOnTheAir) {
    return `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${pageTVOnTheAir}`;
}

export function TV_POPULAR_API(sortBy, pageTVPopular) {
    return `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${pageTVPopular}&vote_count.gte=250`;
}

export function TV_TOPRATED_API(sortBy, pageTVTopRated) {
    return `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&page=${pageTVTopRated}&timezone=America%2FNew_York&vote_average.gte=3&vote_count.gte=500&include_null_first_air_dates=false&with_original_language=en`;
}

export const IMG_API = "https://image.tmdb.org/t/p/w1280";

export { API_KEY }