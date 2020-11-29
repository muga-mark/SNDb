import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

import { SET_PAGE_MOVIES_UPCOMING } from '../actions/setPageNo';

import PageContent from '../components/PageContent';

function MoviesUpcoming({ moviesUpcomingLoading, type }) {
    const history = useHistory();
    const [ { moviesUpcoming, pageMoviesUpcoming } ] = useStateValue();

  
    useEffect(() => {
        if(pageMoviesUpcoming){
            history.push(`/movie/upcoming/${pageMoviesUpcoming}`);
        }
        
        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [ pageMoviesUpcoming, history ]);

    return (
        <div className="page">
            <PageContent 
                type={type} 
                loading={moviesUpcomingLoading}
                chartResult={moviesUpcoming}
                title={"Upcoming Movies"} 
                page={pageMoviesUpcoming}
                setPage={SET_PAGE_MOVIES_UPCOMING} 
            />
        </div>
    )
}

export default MoviesUpcoming


