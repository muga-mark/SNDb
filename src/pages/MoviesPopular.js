import React, { useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';
import { SET_PAGE_MOVIES_POPULAR } from '../actions/setPageNo';
import { SET_SORTEDBY_MOVIES_POPULAR } from '../actions/setSortBy';

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
        value: "primary_release_date.desc",
        item: "Date",
        icon: <ArrowDownwardIcon/>
    },
    {
        value: "primary_release_date.asc",
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

function MoviesPopular({ moviesPopularLoading }) {
    const history = useHistory();
    const [ { moviesPopular, pageMoviesPopular, sortedByMoviesPopular } ] = useStateValue();
   
    useEffect(() => {
        if(pageMoviesPopular){
            history.push(`/movie/popular/${pageMoviesPopular}`);
        }
        
        window.scrollTo({
            top: 0,
            left: 0,
        });
        
        
    }, [ pageMoviesPopular, history ]);

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
                                setSortBy={SET_SORTEDBY_MOVIES_POPULAR}
                                setPage={SET_PAGE_MOVIES_POPULAR}
                                sortBy={sortedByMoviesPopular}
                                menuItems={menuItems}
                            />
                        </div>
                    </div>
                    
                    <div className="page__content_container">
                        <div className="page__content">
                            {moviesPopular.results.length>0 && moviesPopular.results.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardMovie key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <PaginationCustom 
                                totalPages={moviesPopular.total_pages}
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
