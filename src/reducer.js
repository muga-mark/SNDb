export const initialState = {
    pageMoviesPopular: 1,
    pageMoviesUpcoming: 1,
    pageMoviesTopRated: 1,
    pageTVPopular: 1,
    pageTVUpcoming: 1,
    pageTVAiringToday: 1,
    pageTVOnTheAir: 1,
    pageTVTopRated: 1,
}

export const actionTypes = {
    SET_PAGE_MOVIES_POPULAR: "SET_PAGE_MOVIES_POPULAR",
    SET_PAGE_MOVIES_UPCOMING: "SET_PAGE_MOVIES_UPCOMING",
    SET_PAGE_MOVIES_TOPRATED: "SET_PAGE_MOVIES_TOPRATED",
    SET_PAGE_TV_POPULAR: "SET_PAGE_TV_POPULAR",
    SET_PAGE_TV_UPCOMING: "SET_PAGE_TV_UPCOMING",
    SET_PAGE_TV_AIRINGTODAY: "SET_PAGE_TV_AIRINGTODAY",
    SET_PAGE_TV_ONTHEAIR: "SET_PAGE_TV_ONTHEAIR",
    SET_PAGE_TV_TOPRATED: "SET_PAGE_TV_TOPRATED",
}

const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case actionTypes.SET_PAGE_MOVIES_POPULAR:
            return {
                ...state,
                pageMoviesPopular: action.pageMoviesPopular,
            };
        case actionTypes.SET_PAGE_MOVIES_UPCOMING:
            return {
                ...state,
                pageMoviesUpcoming: action.pageMoviesUpcoming,
            };
        case actionTypes.SET_PAGE_MOVIES_TOPRATED:
            return {
                ...state,
                pageMoviesTopRated: action.pageMoviesTopRated,
            };
        case actionTypes.SET_PAGE_TV_POPULAR:
            return {
                ...state,
                pageTVPopular: action.pageTVPopular,
            };
        case actionTypes.SET_PAGE_TV_UPCOMING:
            return {
                ...state,
                pageTVUpcoming: action.pageTVUpcoming,
            };
        case actionTypes.SET_PAGE_TV_AIRINGTODAY:
            return {
                ...state,
                pageTVAiringToday: action.pageTVAiringToday,
            };
        case actionTypes.SET_PAGE_TV_ONTHEAIR:
            return {
                ...state,
                pageTVOnTheAir: action.pageTVOnTheAir,
            };     
        case actionTypes.SET_PAGE_TV_TOPRATED:
            return {
                ...state,
                pageTVTopRated: action.pageTVTopRated,
            };        

        default:
            return state;
    }
}

export default reducer;