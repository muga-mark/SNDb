import React, { useEffect, useState } from 'react';
import { API_KEY } from '../api';
import CardMovie from '../components/CardMovie';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import Pagination from '@material-ui/lab/Pagination';
import '../pages/z_styles.css';


function MoviesUpcoming() {
    const [page, setPage] = useState(1);
    const MOVIE_UPCOMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;

    const [ moviesUpcoming, setMoviesUpcoming ] = useState([]);
    const [ moviesUpcomingLoading, setMoviesUpcomingLoading ] = useState(true);
    const [ moviesUpcomingTotalPages, setMoviesUpcomingTotalPages ] = useState(0);
    
    const handleChange = (event, value) => {
      setPage(value);
    //   console.log("NEXT PAGE", page);
    };

    useEffect(() => {
        fetch(MOVIE_UPCOMING_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("popular movies", data);
          setMoviesUpcoming(data.results);
          setMoviesUpcomingLoading(false);
          setMoviesUpcomingTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [MOVIE_UPCOMING_API]);

    return (
        <div className="page">
            {moviesUpcomingLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={moviesUpcomingLoading} />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>Upcoming Movies</span>
                        </div>
                    </div>
                    
                        <div className="page__content_container">
                            <div className="page__content">
                                {moviesUpcoming.length>0 && moviesUpcoming.map((result)=> (
                                    <div key={result.id} className="movie_content">
                                        <CardMovie key={result.id} {...result} />
                                    </div>
                                ))}
                            </div>

                            <div className="page__content page__content_pagination">
                                <Pagination 
                                    count={moviesUpcomingTotalPages} 
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

export default MoviesUpcoming


