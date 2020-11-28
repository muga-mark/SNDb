import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';

import { SET_PAGE_TV_ONTHEAIR } from '../actions/setPageNo';

import PageContent from '../components/PageContent';

function TVOnTheAir({ tvOnTheAirLoading, type }) {
    const history = useHistory();
    const [ { tvOnTheAir, pageTVOnTheAir } ] = useStateValue();

    useEffect(() => {
        if(pageTVOnTheAir){
            history.push(`/tv/on-the-air-today/${pageTVOnTheAir}`);
        }

        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [ pageTVOnTheAir, history ]);

    return (
        <div>
            <PageContent 
                type={type} 
                chartResult={tvOnTheAir}
                loading={tvOnTheAirLoading}
                title={"On The Air TV Shows"} 
                page={pageTVOnTheAir}
                setPage={SET_PAGE_TV_ONTHEAIR} 
            />
        </div>
    )
}

export default TVOnTheAir



