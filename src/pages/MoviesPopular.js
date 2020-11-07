import React, { useEffect, useState } from 'react';
import { API_KEY, MOVIE_SEARCH_API } from '../api';
import CardMovie from '../components/CardMovie';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import Pagination from '@material-ui/lab/Pagination'
import '../pages/z_styles.css';


function MoviesPopular() {
    const [page, setPage] = React.useState(1);
    const MOVIE_POPULAR_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

    const [ moviesPopular, setMoviesPopular ] = useState([]);
    const [ moviesPopularLoading, setMoviesPopularLoading ] = useState(true);
    const [ moviesPopularTotalPages, setMoviesPopularTotalPages ] = useState(0);
    
    const handleChange = (event, value) => {
      setPage(value);
    //   console.log("NEXT PAGE", page);
    };

    useEffect(() => {
        fetch(MOVIE_POPULAR_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("popular movies", data);
          setMoviesPopular(data.results);
          setMoviesPopularLoading(false);
          setMoviesPopularTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [MOVIE_POPULAR_API]);

    return (
        <div className="page">
            {moviesPopularLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={moviesPopularLoading} />
                </div>
            :
                <>
                    <div className="page__title">
                        <span>Popular Movies</span>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {moviesPopular.length>0 && moviesPopular.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardMovie key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <Pagination 
                                count={moviesPopularTotalPages} 
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

export default MoviesPopular
