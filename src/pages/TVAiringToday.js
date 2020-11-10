import React, { useEffect, useState } from 'react';
import { API_KEY } from '../api';
import CardTV from '../components/CardTV';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import Pagination from '@material-ui/lab/Pagination';
import '../pages/z_styles.css';


function TVAiringToday() {
    const [page, setPage] = useState(1);
    const TV_AIRINGTODAY_API = `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`;

    const [ tvAiringToday, setTVAiringToday ] = useState([]);
    const [ tvAiringTodayLoading, setTVAiringTodayLoading ] = useState(true);
    const [ tvAiringTodayTotalPages, setTVAiringTodayTotalPages ] = useState(0);
    
    const handleChange = (event, value) => {
      setPage(value);
    //   console.log("NEXT PAGE", page);
    };

    useEffect(() => {
        fetch(TV_AIRINGTODAY_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("popular movies", data);
          setTVAiringToday(data.results);
          setTVAiringTodayLoading(false);
          setTVAiringTodayTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [TV_AIRINGTODAY_API]);

    return (
        <div className="page">
            {tvAiringTodayLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={tvAiringTodayLoading} />
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
                            <Pagination 
                                count={tvAiringTodayTotalPages} 
                                color="secondary" 
                                page={page} 
                                onChange={handleChange} 
                                siblingCount={1}
                                size='small'
                            />
                        </div>
                    </div>
                </>
            }
            
            

        </div>
    )
}

export default TVAiringToday


