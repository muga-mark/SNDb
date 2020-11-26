import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { SET_PAGE_TV_AIRINGTODAY } from '../actions/setPageNo';

import CardTV from '../components/CardTV';
import PaginationCustom from '../components/PaginationCustom';
import SpinnerContentCustom from '../components/SpinnerContentCustom';

import '../pages/z_styles.css';


function TVAiringToday({ tvAiringTodayLoading }) {
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
        <div className="page">
            {tvAiringTodayLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom 
                        loading={tvAiringTodayLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>Airing Today TV Shows</span>
                        </div>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {tvAiringToday.results.length>0 && tvAiringToday.results.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <PaginationCustom 
                                page={pageTVAiringToday}
                                totalPages={tvAiringToday.total_pages}
                                setPage={SET_PAGE_TV_AIRINGTODAY}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default TVAiringToday


