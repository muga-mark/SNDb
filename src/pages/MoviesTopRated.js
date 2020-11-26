import React, { useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import { useHistory } from 'react-router-dom';
import { SET_PAGE_MOVIES_TOPRATED } from '../actions/setPageNo';
import { SET_SORTEDBY_MOVIES_TOPRATED } from '../actions/setSortBy';

import CardMovie from '../components/CardMovie';
import PageFilter from '../components/PageFilter';
import PaginationCustom from '../components/PaginationCustom';
import SpinnerContentCustom from '../components/SpinnerContentCustom';

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

function MoviesTopRated({ moviesTopRatedLoading }) {
    const history = useHistory();
    const [{ moviesTopRated, pageMoviesTopRated, sortedByMoviesTopRated }] = useStateValue();

    useEffect(() => {
        if(pageMoviesTopRated){
            history.push(`/movie/top-rated/${pageMoviesTopRated}`);
        }

        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [ pageMoviesTopRated, history ]);

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
                                setSortBy={SET_SORTEDBY_MOVIES_TOPRATED}
                                setPage={SET_PAGE_MOVIES_TOPRATED}
                                sortBy={sortedByMoviesTopRated}
                                menuItems={menuItems}
                            />
                        </div>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {moviesTopRated.results.length>0 && moviesTopRated.results.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardMovie key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <PaginationCustom 
                                totalPages={moviesTopRated.total_pages}
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

