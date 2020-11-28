import React, { useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';

import { SET_PAGE_MOVIES_TOPRATED } from '../actions/setPageNo';
import { SET_SORTEDBY_MOVIES_TOPRATED } from '../actions/setSortBy';

import PageContent from '../components/PageContent';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const menuItems = [
    {
        value: "vote_average.desc",
        item: "Rating",
        icon: <ArrowDownwardIcon/>
    },
    {
        value: "vote_average.asc",
        item: "Rating",
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

function MoviesTopRated({ moviesTopRatedLoading, type }) {
    const history = useHistory();
    const [{ moviesTopRated, pageMoviesTopRated, sortedByMoviesTopRated }] = useStateValue();

    useEffect(() => {
        if(pageMoviesTopRated){
            history.push(`/movie/top-rated/${pageMoviesTopRated}`);
        }

        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [ pageMoviesTopRated, history ]);

    return (
        <div className="page">
            <PageContent 
                type={type} 
                chartResult={moviesTopRated}
                loading={moviesTopRatedLoading}
                title={"Top Rated Movies"} 
                menuItems={menuItems}
                sortBy={sortedByMoviesTopRated} 
                setSortBy={SET_SORTEDBY_MOVIES_TOPRATED} 
                page={pageMoviesTopRated}
                setPage={SET_PAGE_MOVIES_TOPRATED} 
            />
        </div>
    )
}

export default MoviesTopRated

