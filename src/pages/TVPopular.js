import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

import { SET_PAGE_TV_POPULAR } from '../actions/setPageNo';
import { SET_SORTEDBY_TV_POPULAR } from '../actions/setSortBy';

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

function TVPopular({ tvPopularLoading, type }) {
    const history = useHistory();
    const [ { tvPopular, pageTVPopular, sortedByTVPopular } ] = useStateValue();
    
    useEffect(() => {
        if(pageTVPopular){
            history.push(`/tv/popular/${pageTVPopular}`);
        }

        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [ pageTVPopular, history]);

    return (
        <div>
            <PageContent 
                type={type} 
                chartResult={tvPopular}
                loading={tvPopularLoading}
                title={"Popular TV Shows"} 
                menuItems={menuItems}
                sortBy={sortedByTVPopular} 
                setSortBy={SET_SORTEDBY_TV_POPULAR} 
                page={pageTVPopular}
                setPage={SET_PAGE_TV_POPULAR} 
            />
        </div>
    )
}

export default TVPopular



