import React, { useEffect, useState } from 'react';
import { API_KEY, MOVIE_SEARCH_API } from '../api';
import CardTV from '../components/CardTV';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import Pagination from '@material-ui/lab/Pagination';
import '../pages/z_styles.css';


function TVPopular() {
    const [page, setPage] = React.useState(1);
    const TV_POPULAR_API = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

    const [ tvPopular, setTVPopular ] = useState([]);
    const [ tvPopularLoading, setTVPopularLoading ] = useState(true);
    const [ tvPopularTotalPages, setTVPopularTotalPages ] = useState(0);
    
    const handleChange = (event, value) => {
      setPage(value);
    //   console.log("NEXT PAGE", page);
    };

    useEffect(() => {
        fetch(TV_POPULAR_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("popular movies", data);
          setTVPopular(data.results);
          setTVPopularLoading(false);
          setTVPopularTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [TV_POPULAR_API]);

    return (
        <div className="page">
            {tvPopularLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={tvPopularLoading} />
                </div>
            :
                <>
                    <div className="page__title">
                        <span>Popular TV Shows</span>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {tvPopular.length>0 && tvPopular.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <Pagination 
                                count={tvPopularTotalPages} 
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

export default TVPopular



