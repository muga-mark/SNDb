import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { SET_PAGE_TV_TOPRATED } from '../actions/setPageNo';
import { SET_SORTEDBY_TV_POPULAR } from '../actions/setSortBy';

import CardTV from '../components/CardTV';
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

function TVTopRated({ tvTopRatedLoading }) {
    const history = useHistory();
    const [ { tvTopRated, pageTVTopRated, sortedByTVTopRated } ] = useStateValue();

    useEffect(() => {
        if(pageTVTopRated){
            history.push(`/tv/top-rated/${pageTVTopRated}`);
        }

        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [  pageTVTopRated, history ]);

    return (
        <div className="page">
            {tvTopRatedLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom 
                        loading={tvTopRatedLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>Top Rated TV Shows</span>
                        </div>

                        <div className="page__filter">
                            <PageFilter
                                setSortBy={SET_SORTEDBY_TV_POPULAR}
                                setPage={SET_PAGE_TV_TOPRATED}
                                sortBy={sortedByTVTopRated}
                                menuItems={menuItems}
                            />
                        </div>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {tvTopRated.results.length>0 && tvTopRated.results.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <PaginationCustom 
                                page={pageTVTopRated}
                                totalPages={tvTopRated.total_pages}
                                setPage={SET_PAGE_TV_TOPRATED}
                            />
                        </div>
                    </div>
                </>
            }
            
            

        </div>
    )
}

export default TVTopRated




