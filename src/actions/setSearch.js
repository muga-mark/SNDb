export function SET_SEARCH(search) {
    return{
        type: "SET_SEARCH",
        search: search,
    };
}

export function SET_PAGE_SEARCH(page) {
    return{
        type: "SET_PAGE_SEARCH",
        searchPage: page,
    };
}

export function SET_SEARCH_RESULT(result) {
    return{
        type: "SET_SEARCH_RESULT",
        searchResult: result,
    };
}