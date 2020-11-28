import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

import { SET_PAGE_TV_AIRINGTODAY } from '../actions/setPageNo';

import PageContent from '../components/PageContent';

function TVAiringToday({ tvAiringTodayLoading, type }) {
    const history = useHistory();
    const [ { tvAiringToday, pageTVAiringToday } ] = useStateValue();
    
    useEffect(() => {
        if(pageTVAiringToday){
            history.push(`/tv/airing-today/${pageTVAiringToday}`);
        }

        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [ pageTVAiringToday, history ]);

    return (
        <div>
            <PageContent 
                type={type} 
                chartResult={tvAiringToday}
                loading={tvAiringTodayLoading}
                title={"Airing Today TV Shows"} 
                page={pageTVAiringToday}
                setPage={SET_PAGE_TV_AIRINGTODAY} 
            />
        </div>
    )
}

export default TVAiringToday


