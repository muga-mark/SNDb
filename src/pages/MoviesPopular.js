import React, { useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';

import { SET_PAGE_MOVIES_POPULAR } from '../actions/setPageNo';
import { SET_SORTEDBY_MOVIES_POPULAR } from '../actions/setSortBy';

import PageContent from '../components/PageContent';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const menuItems = [
    {
        value: "popularity.desc",
        item: "Popularity",
        icon: <ArrowDownwardIcon/>
    },
    {
        value: "popularity.asc",
        item: "Popularity",
        icon: <ArrowUpwardIcon/>
    },
    {
        value: "primary_release_date.desc",
        item: "Date",
        icon: <ArrowDownwardIcon/>
    },
    {
        value: "primary_release_date.asc",
        item: "Date",
        icon: <ArrowUpwardIcon/>
    },
    {
        value: "original_title.desc",
        item: "Title A-Z",
        icon: <ArrowDownwardIcon/>
    },
    {
        value: "original_title.asc",
        item: "Title A-Z",
        icon: <ArrowUpwardIcon/>
    },
]

function MoviesPopular({ moviesPopularLoading, type }) {
    const history = useHistory();
    const [ { moviesPopular, pageMoviesPopular, sortedByMoviesPopular } ] = useStateValue();
   
    useEffect(() => {
        if(pageMoviesPopular){
            history.push(`/movie/popular/${pageMoviesPopular}`);
        }
        
        window.scrollTo({
            top: 0,
            left: 0,
        });
        
        
    }, [ pageMoviesPopular, history ]);

    return (
        <div>
            <PageContent 
                type={type} 
                chartResult={moviesPopular}
                loading={moviesPopularLoading}
                title={"Popular Movies"} 
                menuItems={menuItems}
                sortBy={sortedByMoviesPopular} 
                setSortBy={SET_SORTEDBY_MOVIES_POPULAR} 
                page={pageMoviesPopular}
                setPage={SET_PAGE_MOVIES_POPULAR} 
            />
        </div>
    )
}

export default MoviesPopular
