import React, { useEffect, useState } from 'react';
import { API_KEY } from '../api';
import CardMovie from '../components/CardMovie';
import SpinnerContentCustom from '../components/SpinnerContentCustom';
import PaginationCustom from '../components/PaginationCustom';
import '../pages/z_styles.css';


function MoviesUpcoming() {
    const [page, setPage] = useState(1);
    const [ moviesUpcoming, setMoviesUpcoming ] = useState([]);
    const [ moviesUpcomingLoading, setMoviesUpcomingLoading ] = useState(true);
    const [ moviesUpcomingTotalPages, setMoviesUpcomingTotalPages ] = useState(0);

    const MOVIE_UPCOMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`;
  
    useEffect(() => {
        fetch(MOVIE_UPCOMING_API)
        .then(res => res.json())
        .then(data => {
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
                            <PaginationCustom 
                                page={page}
                                totalPages={moviesUpcomingTotalPages}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default MoviesUpcoming


