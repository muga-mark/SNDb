import React, { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';
import { SET_PAGE_MOVIES_TOPRATED } from '../action';
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
    const history = useHistory();
    const [{ pageMoviesTopRated }] = useStateValue();
    const [ sortBy, setSortBy ] = useState("vote_average.desc");
    const [ moviesTopRated, setMoviesTopRated ] = useState([]);
    const [ moviesTopRatedLoading, setMoviesTopRatedLoading ] = useState(true);
    const [ moviesTopRatedTotalPages, setMoviesTopRatedTotalPages ] = useState(0);

    const MOVIE_TOPRATED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${pageMoviesTopRated}&vote_count.gte=500&`;

    useEffect(() => {
        if(pageMoviesTopRated){
            history.push(`/movie/top-rated/${pageMoviesTopRated}`);
        }

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
        });
        
    }, [ MOVIE_TOPRATED_API, pageMoviesTopRated, history ]);

    return (
        <div className="page">
            {moviesTopRatedLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom 
                        loading={moviesTopRatedLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
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
                                setPage={SET_PAGE_MOVIES_TOPRATED}
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
                                totalPages={moviesTopRatedTotalPages}
                                setPage={SET_PAGE_MOVIES_TOPRATED}
                                page={pageMoviesTopRated}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default MoviesTopRated

