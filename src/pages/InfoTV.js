import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import StarIcon from '@material-ui/icons/Star';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ModalCustom from '../components/ModalCustom';
import { API_KEY, IMG_API } from '../api';

import './Info.css';


function InfoTV({ }) {
    const { TVId } = useParams();
    const [open, setOpen] = useState(false);
    const [ crewWriters, setCrewWriters ] = useState([]);
    const [ crewDirector, setCrewDirector ] = useState([]);
    const [ castFull, setCastFull ] = useState([]);
    const [ castFiltered, setCastFiltered ] = useState([]);
    const [ trailer, setTrailer] = useState([]);
    const [ certification, setCertification ] = useState("");
    const [ TVDetails, setTVDetails ] = useState([]);
    const [ TVDetailsLoading, setTVDetailsLoading ] = useState(true);
    
    const GET_TV_DETAILS = `https://api.themoviedb.org/3/tv/${TVId}?api_key=${API_KEY}&language=en-US&append_to_response=releases%2Cvideos%2Ccredits`;
    // const TV_TRAILER_API = `https://api.themoviedb.org/3/tv/${TVId}/videos?api_key=${API_KEY}&language=en-US`;
    const trailer_url = `https://www.youtube.com/watch?v=${trailer}`;

    const totalMinutes = TVDetails.runtime;
    const hours = Math.floor(totalMinutes / 60);          
    const minutes = totalMinutes % 60;

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch(GET_TV_DETAILS)
        .then(res => res.json())
        .then(data => {
          console.log("GET_TV_DETAILS",data);
        //   console.log("trailer key", data.videos.results[0]?.key);
            if(data){
                setTVDetails(data);
                setTVDetailsLoading(false);
                setTrailer(data.videos.results[0]?.key);

                if(data.releases.countries){
                    const certificationUS = (data.releases.countries).filter(function(el){
                        return  el.iso_3166_1 === "US";
                    });
                    console.log("certificationUS", certificationUS);

                    if(certificationUS[0]?.certification){
                        setCertification(certificationUS[0]?.certification);
                        console.log("certificationUS Result", certificationUS[0]?.certification);
                    }


                    const filterCountriesByDate = (data.releases.countries).filter(function(el){
                        var date = data.release_date;
                        return el.release_date === date;
                    });
                    console.log("filterCountriesByDate",filterCountriesByDate);

                    if(!(certificationUS[0]?.certification) && filterCountriesByDate[0]?.certification){
                        setCertification(filterCountriesByDate[0]?.certification);
                        console.log("filterCountriesByDate Result",filterCountriesByDate[0]?.certification);
                    }

                    
                    const filterCountriesByCountry = filterCountriesByDate.filter(function (o1) {
                        return (data.production_countries).some(function (o2) {
                            return o1.iso_3166_1 === o2.iso_3166_1; 
                        });
                    });
                    console.log("filterCountriesByCountry", filterCountriesByCountry);

                    if(!(certificationUS[0]?.certification) && !(filterCountriesByDate[0]?.certification) && filterCountriesByCountry[0]?.certification){
                        setCertification(filterCountriesByCountry[0]?.certification);
                        console.log("filterCountriesByCountry Result",filterCountriesByCountry[0]?.certification);

                    }
                }

                if(data.credits.crew){
                    const crewWriters = (data.credits.crew).filter(function(el){
                        return  el.department === "Writing" &&
                                (el.job === "Screenplay" || el.job === "Writer" || el.job === "Novel");
                    });
                    setCrewWriters(crewWriters);
                
                    const crewDirector = (data.credits.crew).filter(function(el){
                        return  el.department === "Directing" &&
                                el.job === "Director";
                    });
                    setCrewDirector(crewDirector);
                }
                
                if(data.credits.cast){
                    setCastFull(data.credits.cast);
                    
                    const castNew = (data.credits.cast).slice(0,12);
                    setCastFiltered(castNew);
                }
            }
          
        });

    }, [ GET_TV_DETAILS ]);

    
    return (
        <div className="info_page">
            {TVDetailsLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={TVDetailsLoading} />
                </div>
            :
                <>
                    <div className="movie__details">

                        <div className="movie__poster_container">
                            <div className="movie__posters">
                                <img 
                                    src={IMG_API + TVDetails.poster_path} 
                                    alt={TVDetails.name} 
                                    className="posters"
                                />
                            </div>
                        </div>

                        <div className="movie__overview">

                            <div className="movie__title_container">
                                <span>
                                    {TVDetails.name}
                                </span>
                            </div>

                            <div className="movie__genre_container">
                                {TVDetails.genres
                                    .map((result) => (
                                        <div key={result.id} className="movie__genre">
                                            {result.name}
                                        </div>))
                                    .reduce((prev, curr) => [prev, <span className="movie__genre marginRight"> ,</span>, curr])
                                }
                                
                                
                                <div className="movie__genre marginRightLeft">
                                    <span>|</span>
                                </div>

                                <div className="movie__runtime">
                                    {hours != 0?
                                        <span className="movie__genre marginRight">
                                            {hours}hr
                                        </span>
                                    :null}
                                    
                                    <span className="movie__genre marginRight">
                                        {minutes}min
                                    </span>
                                </div>

                                <div className="movie__genre marginRightLeft">
                                    <span>|</span>
                                </div>

                                <div className="movie__releaseDate">
                                    <span className="movie__genre marginRight">
                                        {TVDetails.release_date} 
                                    </span>
                                </div>
                            </div>

                            <div className="movie__ratings_container">
                                <span className="movie__ratings marginRightLeft">
                                    <StarIcon /> 
                                </span>
                                
                                <span className="movie__ratings">
                                    {TVDetails.vote_average}
                                </span>

                                <div>
                                    <span className="movie__genre">
                                        /10
                                    </span>
                                    
                                    <span className="movie__genre marginRightLeft">
                                        ({TVDetails.vote_count})
                                    </span>
                                </div>
                            </div>

                            <div className="movie__overview_container">
                                <span className="movie__genre "> 
                                    {TVDetails.overview}
                                </span>
                            </div>

                            
                            {/* <div className="movie__crew">
                                <div className="director">
                                    <span className="movie__genre">
                                        Director: 
                                    </span>
                                    {credits.crew
                                        .map((result) => (
                                        <div key={result.crew_id} className="movie__genre">
                                            
                                            {result.department === "Directing"? 
                                                <>
                                                    <span className="movie__genre">
                                                        {result.name}
                                                    </span>
                                                </>
                                            :null}
                                        </div>))
                                    }
                                </div>

                                <div className="writers">
                                    <span className="movie__genre">
                                        Writers: 
                                    </span>
                                    {credits.crew
                                        .map((result) => (
                                        <div key={result.crew_id}>
                                            
                                            {result.department === "Writing"? 
                                                    <>
                                                        <span className="movie__genre">
                                                            {result.name}
                                                        </span>

                                                        <span className="movie__genre">
                                                            ({result.job})
                                                        </span>
                                                    </>
                                                :null}
                                        </div>))
                                    }
                                </div>
                            </div> */}

                            
                            

                            <div className="movie__info_trailer">
                                <button type="button" onClick={handleOpen} disabled={!trailer}>
                                    <PlayArrowIcon />
                                    {!trailer?
                                        <span>No Trailer</span>
                                    :
                                        <span>Trailer</span>    
                                    }
                                </button>
                            </div>

                            

                        </div>

                    </div>
                </>
            }

            <ModalCustom 
                open={open}
                handleClose={handleClose}
                trailer_url={trailer_url}
            />
            
        </div>
    )
}

export default InfoTV