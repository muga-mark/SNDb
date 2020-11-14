import React, { useEffect, useState } from 'react';
import { API_KEY } from '../api';
import CardTV from '../components/CardTV';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import PaginationCustom from '../components/PaginationCustom';
import '../pages/z_styles.css';

function TVOnTheAir() {
    const [page, setPage] = useState(1);
    const [ tvOnTheAir, setTVOnTheAir ] = useState([]);
    const [ tvOnTheAirLoading, setTVOnTheAirLoading ] = useState(true);
    const [ tvOnTheAirTotalPages, setTVOnTheAirTotalPages ] = useState(0);

    const TV_ONTHEAIR_API = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`;

    useEffect(() => {
        fetch(TV_ONTHEAIR_API)
        .then(res => res.json())
        .then(data => {
          setTVOnTheAir(data.results);
          setTVOnTheAirLoading(false);
          setTVOnTheAirTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [TV_ONTHEAIR_API]);

    return (
        <div className="page">
            {tvOnTheAirLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={tvOnTheAirLoading} />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>On The Air TV Shows</span>
                        </div>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {tvOnTheAir.length>0 && tvOnTheAir.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                             <PaginationCustom 
                                page={page}
                                totalPages={tvOnTheAirTotalPages}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default TVOnTheAir



