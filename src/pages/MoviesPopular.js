import React, { useEffect, useState } from 'react';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';
import { SET_PAGE_MOVIES_POPULAR } from '../actions/setPageNo';
import { API_KEY } from '../api';

import CardMovie from '../components/CardMovie';
import PageFilter from '../components/PageFilter';
import PaginationCustom from '../components/PaginationCustom';
import SpinnerContentCustom from '../components/SpinnerContentCustom';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import '../pages/z_styles.css';

const menuItems = [
    {
        value: "popularity.desc",
        item: "Popularity",
        icon: <ArrowDownwardIcon/>
    },
    {
        value: "popularity.asc",
        item: "Popularity",
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

function MoviesPopular() {
    // const { pageNo } = useParams();
    const history = useHistory();
    const [{ pageMoviesPopular }] = useStateValue();
    // const [ page, setPage] = useState(1);
    // console.log("PAGE NO>",pageMoviesPopular);
    const [ sortBy, setSortBy ] = useState("popularity.desc");
    const [ moviesPopular, setMoviesPopular ] = useState([]);
    const [ moviesPopularLoading, setMoviesPopularLoading ] = useState(true);
    const [ moviesPopularTotalPages, setMoviesPopularTotalPages ] = useState(0);
    
    const MOVIE_POPULAR_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${pageMoviesPopular}&vote_count.gte=250`;
   
    useEffect(() => {
        if(pageMoviesPopular){
            history.push(`/movie/popular/${pageMoviesPopular}`);
        }

        fetch(MOVIE_POPULAR_API)
        .then(res => res.json())
        .then(data => {
          setMoviesPopular(data.results);
          setMoviesPopularLoading(false);
          setMoviesPopularTotalPages(data.total_pages);
        });

        
        window.scrollTo({
            top: 0,
            left: 0,
        });
        
        
    }, [ MOVIE_POPULAR_API, pageMoviesPopular, history ]);

    return (
        <div className="page">
            {moviesPopularLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom 
                        loading={moviesPopularLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>Popular Movies</span>
                        </div>
                        <div className="page__filter">
                            <PageFilter
                                setSortBy={setSortBy}
                                setPage={SET_PAGE_MOVIES_POPULAR}
                                // setPage={setPageNo}
                                sortBy={sortBy}
                                menuItems={menuItems}
                            />
                        </div>
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
                            <PaginationCustom 
                                totalPages={moviesPopularTotalPages}
                                setPage={SET_PAGE_MOVIES_POPULAR}
                                page={pageMoviesPopular}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default MoviesPopular
