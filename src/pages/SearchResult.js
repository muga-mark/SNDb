import React, { useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';

import { SET_SEARCH, SET_PAGE_SEARCH, SET_SEARCH_RESULT } from '../actions/setSearch';

import PageContent from '../components/PageContent';

function SearchResult({ searchLoading, setSearchLoading }) {
    const history = useHistory();
    const [ { search, searchPage, searchResult },  dispatch] = useStateValue();

    useEffect(() => {
        if(searchPage){
            history.push(`/search/${search}/${searchPage}`);
        }
        
        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [ searchPage, dispatch, history ]);
    
    return (
        <div>
            <PageContent 
                loading={searchLoading}
                chartResult={searchResult}
                title={"Search"} 
                page={searchPage}
                setPage={SET_PAGE_SEARCH} 
            />
        </div>
    )
}

export default SearchResult;
