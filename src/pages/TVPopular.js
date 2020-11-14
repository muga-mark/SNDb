import React, { useEffect, useState } from 'react';
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

function TVPopular() {
    const [page, setPage] = useState(1);
    const [ sortBy, setSortBy ] = useState("popularity.desc");
    const [ tvPopular, setTVPopular ] = useState([]);
    const [ tvPopularLoading, setTVPopularLoading ] = useState(true);
    const [ tvPopularTotalPages, setTVPopularTotalPages ] = useState(0);
    
    const TV_POPULAR_API = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&vote_count.gte=250`;

    useEffect(() => {
        fetch(TV_POPULAR_API)
        .then(res => res.json())
        .then(data => {
          setTVPopular(data.results);
          setTVPopularLoading(false);
          setTVPopularTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [TV_POPULAR_API]);

    return (
        <div className="page">
            {tvPopularLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={tvPopularLoading} />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>Popular TV Shows</span>
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
                            {tvPopular.length>0 && tvPopular.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <PaginationCustom 
                                page={page}
                                totalPages={tvPopularTotalPages}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default TVPopular



