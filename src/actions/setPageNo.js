export function SET_PAGE_MOVIES_POPULAR(page) {
    return{
        type: "SET_PAGE_MOVIES_POPULAR",
        pageMoviesPopular: page,
    };
}
  
export function SET_PAGE_MOVIES_UPCOMING(page) {
    return{
        type: "SET_PAGE_MOVIES_UPCOMING",
        pageMoviesUpcoming: page,
    };
}
 
export function SET_PAGE_MOVIES_TOPRATED(page) {
    return{
        type: "SET_PAGE_MOVIES_TOPRATED",
        pageMoviesTopRated: page,
    };
}  

export function SET_PAGE_TV_POPULAR(page) {
    return{
        type: "SET_PAGE_TV_POPULAR",
        pageTVPopular: page,
    };
}
    
export function SET_PAGE_TV_AIRINGTODAY(page) {
    return{
        type: "SET_PAGE_TV_AIRINGTODAY",
        pageTVAiringToday: page,
    };
}
  
export function SET_PAGE_TV_ONTHEAIR(page) {
    return{
        type: "SET_PAGE_TV_ONTHEAIR",
        pageTVOnTheAir: page,
    };
}
  
export function SET_PAGE_TV_TOPRATED(page) {
    return{
        type: "SET_PAGE_TV_TOPRATED",
        pageTVTopRated: page,
    };
}