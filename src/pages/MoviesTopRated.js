import React, { useEffect, useState } from 'react';
import { API_KEY, MOVIE_SEARCH_API } from '../api';
import CardMovie from '../components/CardMovie';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import Pagination from '@material-ui/lab/Pagination';
import '../pages/z_styles.css';


function MoviesTopRated() {
    const [page, setPage] = React.useState(1);
    const MOVIE_TOPRATED_API = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;

    const [ moviesTopRated, setMoviesTopRated ] = useState([]);
    const [ moviesTopRatedLoading, setMoviesTopRatedLoading ] = useState(true);
    const [ moviesTopRatedTotalPages, setMoviesTopRatedTotalPages ] = useState(0);
    
    const handleChange = (event, value) => {
      setPage(value);
    //   console.log("NEXT PAGE", page);
    };

    useEffect(() => {
        fetch(MOVIE_TOPRATED_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("popular movies", data);
          setMoviesTopRated(data.results);
          setMoviesTopRatedLoading(false);
          setMoviesTopRatedTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [MOVIE_TOPRATED_API]);

    return (
        <div className="page">
            {moviesTopRatedLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={moviesTopRatedLoading} />
                </div>
            :
                <>
                    <div className="page__title">
                        <span>Top Rated Movies</span>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {moviesTopRated.length>0 && moviesTopRated.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardMovie key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <Pagination 
                                count={moviesTopRatedTotalPages} 
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

export default MoviesTopRated

