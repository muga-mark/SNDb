import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { SET_PAGE_TV_ONTHEAIR } from '../actions/setPageNo';

import CardTV from '../components/CardTV';
import PaginationCustom from '../components/PaginationCustom';
import SpinnerContentCustom from "../components/SpinnerContentCustom";

import '../pages/z_styles.css';

function TVOnTheAir({ tvOnTheAirLoading }) {
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
        <div className="page">
            {tvOnTheAirLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom 
                        loading={tvOnTheAirLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>On The Air TV Shows</span>
                        </div>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {tvOnTheAir.results.length>0 && tvOnTheAir.results.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                             <PaginationCustom 
                                page={pageTVOnTheAir}
                                totalPages={tvOnTheAir.total_pages}
                                setPage={SET_PAGE_TV_ONTHEAIR}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default TVOnTheAir



