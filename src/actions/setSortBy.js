export function SET_SORTEDBY_MOVIES_POPULAR(sortBy) {
    return{
        type: "SET_SORTEDBY_MOVIES_POPULAR",
        sortedByMoviesPopular: sortBy,
    };
}
  
export function SET_SORTEDBY_MOVIES_TOPRATED(sortBy) {
    return{
        type: "SET_SORTEDBY_MOVIES_TOPRATED",
        sortedByMoviesTopRated: sortBy,
    };
}
 
export function SET_SORTEDBY_TV_POPULAR(sortBy) {
    return{
        type: "SET_SORTEDBY_TV_POPULAR",
        sortedByTVPopular: sortBy,
    };
}  

export function SET_SORTEDBY_TV_TOPRATED(sortBy) {
    return{
        type: "SET_SORTEDBY_TV_TOPRATED",
        sortedByTVTopRated: sortBy,
    };
}
    
