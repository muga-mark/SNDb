import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { SET_PAGE_TV_POPULAR } from '../actions/setPageNo';
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

function TVPopular({ tvPopularLoading }) {
    const history = useHistory();
    const [ { tvPopular, pageTVPopular, sortedByTVPopular } ] = useStateValue();
    
    useEffect(() => {
        if(pageTVPopular){
            history.push(`/tv/popular/${pageTVPopular}`);
        }

        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [ pageTVPopular, history]);

    return (
        <div className="page">
            {tvPopularLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom 
                        loading={tvPopularLoading} 
                        size={20}
                        color={"#D1312D"}
                    />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>Popular TV Shows</span>
                        </div>

                        <div className="page__filter">
                            <PageFilter
                                setSortBy={SET_SORTEDBY_TV_POPULAR}
                                setPage={SET_PAGE_TV_POPULAR}
                                sortBy={sortedByTVPopular}
                                menuItems={menuItems}
                            />
                        </div>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {tvPopular.results.length>0 && tvPopular.results.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <PaginationCustom 
                                page={pageTVPopular}
                                totalPages={tvPopular.total_pages}
                                setPage={SET_PAGE_TV_POPULAR}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default TVPopular



