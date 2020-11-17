import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, IMG_API } from '../api';
import Info from './Info';
import InfoCast from './InfoCast';
import ModalCustom from '../components/ModalCustom';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import CarouselCustom from "../components/CarouselCustom";
import './InfoTVMovie.css';

function InfoMovie({ }) {
    const { movieId } = useParams();
    const [ open, setOpen] = useState(false);
    const [ crewWriters, setCrewWriters ] = useState([]);
    const [ crewDirector, setCrewDirector ] = useState([]);
    const [ cast, setCast ] = useState([]);
    // const [ castFiltered, setCastFiltered ] = useState([]);
    const [ trailer, setTrailer] = useState([]);
    const [ certification, setCertification ] = useState("");
    const [ movieDetails, setMovieDetails ] = useState([]);
    const [ movieDetailsLoading, setMovieDetailsLoading ] = useState(true);
    
    const GET_MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=releases%2Cvideos%2Ccredits`;
    // const MOVIE_TRAILER_API = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
    const trailer_url = `https://www.youtube.com/watch?v=${trailer}`;

    const totalMinutes = movieDetails.runtime;
    const hours = Math.floor(totalMinutes / 60);          
    const minutes = totalMinutes % 60;

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch(GET_MOVIE_DETAILS)
        .then(res => res.json())
        .then(data => {
          console.log("movieDetails",data);
        //   console.log("trailer key", data.videos.results[0]?.key);
            if(data){
                setMovieDetails(data);
                setMovieDetailsLoading(false);
            
                if((data.videos.results).lenth>0){
                    setTrailer(data.videos.results[0]?.key);
                }

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
                    setCast(data.credits.cast);
                    console.log("CAST", data.credits.cast);
                    // const castNew = (data.credits.cast);
                    // setCastFiltered(castNew);
                }
            }
          
        });

    }, [ GET_MOVIE_DETAILS ]);
    

    return (
        <div className="infopage__container">
            {movieDetailsLoading?
                <div className="info_page__spinner">
                    <SpinnerContentCustom loading={movieDetailsLoading} />
                </div>
            :
                <>
                    <div className="info_page__details">
                        <Info 
                            IMG_API={IMG_API}
                            info={movieDetails}
                            title={movieDetails.title}
                            date={movieDetails.release_date}
                            certification={certification }
                            hours={hours}
                            minutes={minutes}
                            handleOpen={handleOpen}
                            trailer={trailer}
                            crewDirector={crewDirector}
                            crewWriters={crewWriters}
                            trailer_url={trailer_url}
                        />
                    </div>

                    <div className="infopage__separator">
                        <span>
                            Cast and Crew
                        </span>
                    </div>

                    <div className="info_page__cast_container">
                        <CarouselCustom content=
                            {cast.length>0 && cast.map((result) => (
                                <div key={result.id}>
                                    <InfoCast 
                                        // {...result}
                                        IMG_API={IMG_API}
                                        profile_path={result.profile_path}
                                        original_name={result.original_name}
                                        character={result.character}
                                    />
                                </div>
                            ))} 
                        />
                    </div>

                    <div className="infopage__separator_footer" />

                    <ModalCustom 
                        open={open}
                        handleClose={handleClose}
                        trailer_url={trailer_url}
                    />
                </>
            } 
            
        </div>
    )
}

export default InfoMovie
