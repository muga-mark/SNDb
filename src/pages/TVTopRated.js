import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { SET_PAGE_TV_TOPRATED } from '../action';
import { API_KEY } from '../api';
import CardTV from '../components/CardTV';
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

function TVTopRated() {
    const history = useHistory();
    const [{ pageTVTopRated }] = useStateValue();
    const [ sortBy, setSortBy ] = useState("vote_average.desc");
    const [ tvTopRated, setTVTopRated ] = useState([]);
    const [ tvTopRatedLoading, setTVTopRatedLoading ] = useState(true);
    const [ tvTopRatedTotalPages, setTVTopRatedTotalPages ] = useState(0);
    
    const TV_TOPRATED_API = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&page=${pageTVTopRated}&timezone=America%2FNew_York&vote_average.gte=3&vote_count.gte=500&include_null_first_air_dates=false&with_original_language=en`;

    useEffect(() => {
        if(pageTVTopRated){
            history.push(`/tv/top-rated/${pageTVTopRated}`);
        }

        fetch(TV_TOPRATED_API)
        .then(res => res.json())
        .then(data => {
          setTVTopRated(data.results);
          setTVTopRatedLoading(false);
          setTVTopRatedTotalPages(data.total_pages);
        });

        window.scrollTo({
            top: 0,
            left: 0,
        });
        
    }, [ TV_TOPRATED_API, pageTVTopRated, history ]);

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
                                setSortBy={setSortBy}
                                setPage={SET_PAGE_TV_TOPRATED}
                                sortBy={sortBy}
                                menuItems={menuItems}
                            />
                        </div>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {tvTopRated.length>0 && tvTopRated.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <PaginationCustom 
                                page={pageTVTopRated}
                                totalPages={tvTopRatedTotalPages}
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




