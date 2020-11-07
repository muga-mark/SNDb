import React, { useEffect, useState } from 'react';
import { API_KEY, MOVIE_SEARCH_API } from '../api';
import CardTV from '../components/CardTV';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import Pagination from '@material-ui/lab/Pagination';
import '../pages/z_styles.css';


function TVTopRated() {
    const [page, setPage] = React.useState(1);
    const TV_TOPRATED_API = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;

    const [ tvTopRated, setTVTopRated ] = useState([]);
    const [ tvTopRatedLoading, setTVTopRatedLoading ] = useState(true);
    const [ tvTopRatedTotalPages, setTVTopRatedTotalPages ] = useState(0);
    
    const handleChange = (event, value) => {
      setPage(value);
    //   console.log("NEXT PAGE", page);
    };

    useEffect(() => {
        fetch(TV_TOPRATED_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("popular movies", data);
          setTVTopRated(data.results);
          setTVTopRatedLoading(false);
          setTVTopRatedTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [TV_TOPRATED_API]);

    return (
        <div className="page">
            {tvTopRatedLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={tvTopRatedLoading} />
                </div>
            :
                <>
                    <div className="page__title">
                        <span>Top Rated TV Shows</span>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {tvTopRated.length>0 && tvTopRated.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <Pagination 
                                count={tvTopRatedTotalPages} 
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

export default TVTopRated




