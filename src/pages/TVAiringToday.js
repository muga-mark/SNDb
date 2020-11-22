import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { SET_PAGE_TV_AIRINGTODAY } from '../action';
import { API_KEY } from '../api';
import CardTV from '../components/CardTV';
import SpinnerContentCustom from '../components/SpinnerContentCustom';
import PaginationCustom from '../components/PaginationCustom';
import '../pages/z_styles.css';


function TVAiringToday() {
    const history = useHistory();
    const [{ pageTVAiringToday }] = useStateValue();
    const [ tvAiringToday, setTVAiringToday ] = useState([]);
    const [ tvAiringTodayLoading, setTVAiringTodayLoading ] = useState(true);
    const [ tvAiringTodayTotalPages, setTVAiringTodayTotalPages ] = useState(0);

    const TV_AIRINGTODAY_API = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${pageTVAiringToday}`;
    
    useEffect(() => {
        if(pageTVAiringToday){
            history.push(`/tv/airing-today/${pageTVAiringToday}`);
        }

        fetch(TV_AIRINGTODAY_API)
        .then(res => res.json())
        .then(data => {
          setTVAiringToday(data.results);
          setTVAiringTodayLoading(false);
          setTVAiringTodayTotalPages(data.total_pages);
        });

        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [TV_AIRINGTODAY_API, pageTVAiringToday, history ]);

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
                            {tvAiringToday.length>0 && tvAiringToday.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <PaginationCustom 
                                page={pageTVAiringToday}
                                totalPages={tvAiringTodayTotalPages}
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


