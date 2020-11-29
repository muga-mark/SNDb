export const initialState = {
    search:"",
    searchPage:1,
    searchResult:[],

    moviesPopular: [],
    pageMoviesPopular: 1,
    sortedByMoviesPopular:"popularity.desc",
    
    moviesUpcoming: [],
    pageMoviesUpcoming: 1,

    moviesTopRated: [],
    pageMoviesTopRated: 1,
    sortedByMoviesTopRated:"vote_average.desc",

    tvPopular: [],
    pageTVPopular: 1,
    sortedByTVPopular:"popularity.desc",

    tvAiringToday: [],
    pageTVAiringToday: 1,

    tvOnTheAir: [],
    pageTVOnTheAir: 1,

    tvTopRated: [],
    pageTVTopRated: 1,
    sortedByTVTopRated:"vote_average.desc",
    
}

export const actionTypes = {
    SET_SEARCH: "SET_SEARCH",
    SET_PAGE_SEARCH: "SET_PAGE_SEARCH",
    SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
    

    SET_MOVIES_POPULAR: "SET_MOVIES_POPULAR",
    SET_PAGE_MOVIES_POPULAR: "SET_PAGE_MOVIES_POPULAR",
    SET_SORTEDBY_MOVIES_POPULAR: "SET_SORTEDBY_MOVIES_POPULAR",

    SET_MOVIES_UPCOMING: "SET_MOVIES_UPCOMING",
    SET_PAGE_MOVIES_UPCOMING: "SET_PAGE_MOVIES_UPCOMING",

    SET_MOVIES_TOPRATED: "SET_MOVIES_TOPRATED",
    SET_PAGE_MOVIES_TOPRATED: "SET_PAGE_MOVIES_TOPRATED",
    SET_SORTEDBY_MOVIES_TOPRATED: "SET_SORTEDBY_MOVIES_TOPRATED",
    
    SET_TV_POPULAR: "SET_TV_POPULAR",
    SET_PAGE_TV_POPULAR: "SET_PAGE_TV_POPULAR",
    SET_SORTEDBY_TV_POPULAR: "SET_SORTEDBY_TV_POPULAR",

    SET_TV_AIRINGTODAY: "SET_TV_AIRINGTODAY",
    SET_PAGE_TV_AIRINGTODAY: "SET_PAGE_TV_AIRINGTODAY",

    SET_TV_ONTHEAIR: "SET_TV_ONTHEAIR",
    SET_PAGE_TV_ONTHEAIR: "SET_PAGE_TV_ONTHEAIR",

    SET_TV_TOPRATED: "SET_TV_TOPRATED",
    SET_PAGE_TV_TOPRATED: "SET_PAGE_TV_TOPRATED",
    SET_SORTEDBY_TV_TOPRATED: "SET_SORTEDBY_TV_TOPRATED",
}

const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case actionTypes.SET_SEARCH:
            return {
                ...state,
                search: action.search,
            }; 
        case actionTypes.SET_PAGE_SEARCH:
            return {
                ...state,
                searchPage: action.searchPage,
            }; 
        case actionTypes.SET_SEARCH_RESULT:
            return {
                ...state,
                searchResult: action.searchResult,
            }; 


        case actionTypes.SET_MOVIES_POPULAR:
            return {
                ...state,
                moviesPopular: action.moviesPopular,
            }; 
        case actionTypes.SET_PAGE_MOVIES_POPULAR:
            return {
                ...state,
                pageMoviesPopular: action.pageMoviesPopular,
            };
        case actionTypes.SET_SORTEDBY_MOVIES_POPULAR:
            return {
                ...state,
                sortedByMoviesPopular: action.sortedByMoviesPopular,
            };


        case actionTypes.SET_MOVIES_UPCOMING:
            return {
                ...state,
                moviesUpcoming: action.moviesUpcoming,
            }; 
        case actionTypes.SET_PAGE_MOVIES_UPCOMING:
            return {
                ...state,
                pageMoviesUpcoming: action.pageMoviesUpcoming,
            };


        case actionTypes.SET_MOVIES_TOPRATED:
            return {
                ...state,
                moviesTopRated: action.moviesTopRated,
            }; 
        case actionTypes.SET_PAGE_MOVIES_TOPRATED:
            return {
                ...state,
                pageMoviesTopRated: action.pageMoviesTopRated,
            };
        case actionTypes.SET_SORTEDBY_MOVIES_TOPRATED:
            return {
                ...state,
                sortedByMoviesTopRated: action.sortedByMoviesTopRated,
            };


        case actionTypes.SET_TV_POPULAR:
            return {
                ...state,
                tvPopular: action.tvPopular,
            }; 
        case actionTypes.SET_PAGE_TV_POPULAR:
            return {
                ...state,
                pageTVPopular: action.pageTVPopular,
            };
        case actionTypes.SET_SORTEDBY_TV_POPULAR:
            return {
                ...state,
                sortedByTVPopular: action.sortedByTVPopular,
            }; 


        case actionTypes.SET_TV_AIRINGTODAY:
            return {
                ...state,
                tvAiringToday: action.tvAiringToday,
            }; 
        case actionTypes.SET_PAGE_TV_AIRINGTODAY:
            return {
                ...state,
                pageTVAiringToday: action.pageTVAiringToday,
            };

        
        case actionTypes.SET_TV_ONTHEAIR:
            return {
                ...state,
                tvOnTheAir: action.tvOnTheAir,
            };
        case actionTypes.SET_PAGE_TV_ONTHEAIR:
            return {
                ...state,
                pageTVOnTheAir: action.pageTVOnTheAir,
            };     


        case actionTypes.SET_TV_TOPRATED:
            return {
                ...state,
                tvTopRated: action.tvTopRated,
            };  
        case actionTypes.SET_PAGE_TV_TOPRATED:
            return {
                ...state,
                pageTVTopRated: action.pageTVTopRated,
            }; 
        case actionTypes.SET_SORTEDBY_TV_TOPRATED:
            return {
                ...state,
                sortedByTVTopRated: action.sortedByTVTopRated,
            }; 
         
        default:
            return state;
    }
}

export default reducer;