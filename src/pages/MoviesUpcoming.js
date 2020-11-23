import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { SET_PAGE_MOVIES_UPCOMING } from '../actions/setPageNo';
import { API_KEY } from '../api';

import CardMovie from '../components/CardMovie';
import PaginationCustom from '../components/PaginationCustom';
import SpinnerContentCustom from '../components/SpinnerContentCustom';

import '../pages/z_styles.css';


function MoviesUpcoming() {
    const history = useHistory();
    const [{ pageMoviesUpcoming }] = useStateValue();
    const [ moviesUpcoming, setMoviesUpcoming ] = useState([]);
    const [ moviesUpcomingLoading, setMoviesUpcomingLoading ] = useState(true);
    const [ moviesUpcomingTotalPages, setMoviesUpcomingTotalPages ] = useState(0);

    const MOVIE_UPCOMING_API = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageMoviesUpcoming}`;
  
    useEffect(() => {
        if(pageMoviesUpcoming){
            history.push(`/movie/upcoming/${pageMoviesUpcoming}`);
        }

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
        });
        
    }, [ MOVIE_UPCOMING_API, pageMoviesUpcoming, history ]);

    return (
        <div className="page">
            {moviesUpcomingLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom 
                        loading={moviesUpcomingLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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
                                totalPages={moviesUpcomingTotalPages}
                                setPage={SET_PAGE_MOVIES_UPCOMING}
                                page={pageMoviesUpcoming}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default MoviesUpcoming


