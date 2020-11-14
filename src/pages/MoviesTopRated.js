import React, { useEffect, useState } from 'react';
import { API_KEY } from '../api';
import CardMovie from '../components/CardMovie';
import SpinnerContentCustom from '../components/SpinnerContentCustom';
import PaginationCustom from '../components/PaginationCustom';
import PageFilter from '../components/PageFilter';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import '../pages/z_styles.css';

const menuItems = [
    {
        value: "vote_average.desc",
        item: "Rating",
        icon: <ArrowDownwardIcon/>
    },
    {
        value: "vote_average.asc",
        item: "Rating",
        icon: <ArrowUpwardIcon/>
    },
    {
        value: "release_date.desc",
        item: "Date",
        icon: <ArrowDownwardIcon/>
    },
    {
        value: "release_date.asc",
        item: "Date",
        icon: <ArrowUpwardIcon/>
    },
    {
        value: "original_title.desc",
        item: "Title A-Z",
        icon: <ArrowDownwardIcon/>
    },
    {
        value: "original_title.asc",
        item: "Title A-Z",
        icon: <ArrowUpwardIcon/>
    },
]

function MoviesTopRated() {
    const [page, setPage] = useState(1);
    const [ sortBy, setSortBy ] = useState("vote_average.desc");
    const [ moviesTopRated, setMoviesTopRated ] = useState([]);
    const [ moviesTopRatedLoading, setMoviesTopRatedLoading ] = useState(true);
    const [ moviesTopRatedTotalPages, setMoviesTopRatedTotalPages ] = useState(0);

    const MOVIE_TOPRATED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&vote_count.gte=500&`;

    useEffect(() => {
        fetch(MOVIE_TOPRATED_API)
        .then(res => res.json())
        .then(data => {
          console.log("top rated movies", data);
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
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>Top Rated Movies</span>
                        </div>

                        <div className="page__filter">
                            <PageFilter
                                setSortBy={setSortBy}
                                setPage={setPage}
                                sortBy={sortBy}
                                menuItems={menuItems}
                            />
                        </div>
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
                            <PaginationCustom 
                                page={page}
                                totalPages={moviesTopRatedTotalPages}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default MoviesTopRated

