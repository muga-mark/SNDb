export function SET_MOVIES_POPULAR(result) {
    return{
        type: "SET_MOVIES_POPULAR",
        moviesPopular: result,
    };
}
  
export function SET_MOVIES_UPCOMING(result) {
    return{
        type: "SET_MOVIES_UPCOMING",
        moviesUpcoming: result,
    };
}
 
export function SET_MOVIES_TOPRATED(result) {
    return{
        type: "SET_MOVIES_TOPRATED",
        moviesTopRated: result,
    };
}  

export function SET_TV_POPULAR(result) {
    return{
        type: "SET_TV_POPULAR",
        tvPopular: result,
    };
}
  
export function SET_TV_AIRINGTODAY(result) {
    return{
        type: "SET_TV_AIRINGTODAY",
        tvAiringToday: result,
    };
}
  
export function SET_TV_ONTHEAIR(result) {
    return{
        type: "SET_TV_ONTHEAIR",
        tvOnTheAir: result,
    };
}
  
export function SET_TV_TOPRATED(result) {
    return{
        type: "SET_TV_TOPRATED",
        tvTopRated: result,
    };
}