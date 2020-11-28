import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

import { SET_PAGE_TV_TOPRATED } from '../actions/setPageNo';
import { SET_SORTEDBY_TV_TOPRATED } from '../actions/setSortBy';

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

function TVTopRated({ tvTopRatedLoading, type }) {
    const history = useHistory();
    const [ { tvTopRated, pageTVTopRated, sortedByTVTopRated } ] = useStateValue();

    useEffect(() => {
        if(pageTVTopRated){
            history.push(`/tv/top-rated/${pageTVTopRated}`);
        }

        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [  pageTVTopRated, history ]);

    return (
        <div>
            <PageContent 
                type={type} 
                chartResult={tvTopRated}
                loading={tvTopRatedLoading}
                title={"Popular TV Shows"} 
                menuItems={menuItems}
                sortBy={sortedByTVTopRated} 
                setSortBy={SET_SORTEDBY_TV_TOPRATED} 
                page={pageTVTopRated}
                setPage={SET_PAGE_TV_TOPRATED} 
            />
        </div>
    )
}

export default TVTopRated




