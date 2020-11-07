import React, { useEffect, useState } from 'react';
import { API_KEY, MOVIE_SEARCH_API } from '../api';
import CardTV from '../components/CardTV';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import Pagination from '@material-ui/lab/Pagination';
import '../pages/z_styles.css';


function TVOnTheAir() {
    const [page, setPage] = React.useState(1);
    const TV_ONTHEAIR_API = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`;

    const [ tvOnTheAir, setTVOnTheAir ] = useState([]);
    const [ tvOnTheAirLoading, setTVOnTheAirLoading ] = useState(true);
    const [ tvOnTheAirTotalPages, setTVOnTheAirTotalPages ] = useState(0);
    
    const handleChange = (event, value) => {
      setPage(value);
    //   console.log("NEXT PAGE", page);
    };

    useEffect(() => {
        fetch(TV_ONTHEAIR_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("popular movies", data);
          setTVOnTheAir(data.results);
          setTVOnTheAirLoading(false);
          setTVOnTheAirTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [TV_ONTHEAIR_API]);

    return (
        <div className="page">
            {tvOnTheAirLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={tvOnTheAirLoading} />
                </div>
            :
                <>
                    <div className="page__title">
                        <span>On The Air TV Shows</span>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {tvOnTheAir.length>0 && tvOnTheAir.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <Pagination 
                                count={tvOnTheAirTotalPages} 
                                color="secondary" 
                                page={page} 
                                onChange={handleChange} 
                                siblingCount={2}
                            />
                        </div>
                    </div>
                </>
            }
            
            

        </div>
    )
}

export default TVOnTheAir



