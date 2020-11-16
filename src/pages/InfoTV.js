import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, IMG_API } from '../api';
import Info from './Info';
import InfoCast from './InfoCast';
import ModalCustom from '../components/ModalCustom';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import './InfoTVMovie.css';


function InfoTV({ }) {
    const { TVId } = useParams();
    const [open, setOpen] = useState(false);
    // const [ crewWriters, setCrewWriters ] = useState([]);
    // const [ crewDirector, setCrewDirector ] = useState([]);
    const [ createdBy, setCreatedBy ] = useState("");
    const [ totalMinutes, setTotalMinutes ] = useState("");
    const [ onlyMinutes, setOnlyMinutes ] = useState("");
    const [ cast, setCast ] = useState([]);
    // const [ castFiltered, setCastFiltered ] = useState([]);
    const [ trailer, setTrailer] = useState([]);
    const [ certification, setCertification ] = useState("");
    const [ TVDetails, setTVDetails ] = useState([]);
    const [ TVDetailsLoading, setTVDetailsLoading ] = useState(true);
    
    const GET_TV_DETAILS = `https://api.themoviedb.org/3/tv/${TVId}?api_key=${API_KEY}&language=en-US&append_to_response=content_ratings%2Cvideos%2Ccredits`;
    // const TV_TRAILER_API = `https://api.themoviedb.org/3/tv/${TVId}/videos?api_key=${API_KEY}&language=en-US`;
    const trailer_url = `https://www.youtube.com/watch?v=${trailer}`;

    
    // const totalMinutes = TVDetails.episode_run_time[0];
    
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
            
                if((data.videos.results).length>0){
                    setTrailer(data.videos.results[0]?.key);
                    console.log("Trailer", data.videos.results[0]?.key);
                }

                if((data.episode_run_time).length>0){
                    if(data.episode_run_time[0]>60){
                        // console.log("more than 60");
                        setTotalMinutes(data.episode_run_time[0]);
                    }
                    if(data.episode_run_time[0]<60){
                        // console.log("less than 60");
                        setOnlyMinutes(data.episode_run_time[0]);
                    }
                    console.log(data.episode_run_time[0]);
                }

                if(data.content_ratings.results){
                    const certificationUS = (data.content_ratings.results).filter(function(el){
                        return  el.iso_3166_1 === "US";
                    });
                    console.log("content_ratings.results", certificationUS);

                    if(certificationUS[0]?.rating){
                        setCertification(certificationUS[0]?.rating);
                        console.log("certificationUS Result", certificationUS[0]?.rating);
                    }


                    // const filterCountriesByDate = (data.releases.countries).filter(function(el){
                    //     var date = data.release_date;
                    //     return el.release_date === date;
                    // });
                    // console.log("filterCountriesByDate",filterCountriesByDate);

                    // if(!(certificationUS[0]?.certification) && filterCountriesByDate[0]?.certification){
                    //     setCertification(filterCountriesByDate[0]?.certification);
                    //     console.log("filterCountriesByDate Result",filterCountriesByDate[0]?.certification);
                    // }

                    
                    // const filterCountriesByCountry = filterCountriesByDate.filter(function (o1) {
                    //     return (data.production_countries).some(function (o2) {
                    //         return o1.iso_3166_1 === o2.iso_3166_1; 
                    //     });
                    // });
                    // console.log("filterCountriesByCountry", filterCountriesByCountry);

                    // if(!(certificationUS[0]?.certification) && !(filterCountriesByDate[0]?.certification) && filterCountriesByCountry[0]?.certification){
                    //     setCertification(filterCountriesByCountry[0]?.certification);
                    //     console.log("filterCountriesByCountry Result",filterCountriesByCountry[0]?.certification);

                    // }
                }

                if(data.created_by){
                    setCreatedBy(data.created_by);
                    console.log("CREATED BY", data.created_by);
                }

                if(data.credits.cast){
                    setCast(data.credits.cast);
                    
                    // const castNew = (data.credits.cast).slice(0,6);
                    // setCastFiltered(castNew);
                    // console.log("CAST >", data.credits.cast);
                }
            }
          
        });

    }, [ GET_TV_DETAILS ]);

    
    return (
        <div className="infopage__container">
            {TVDetailsLoading?
                <div className="infopage__spinner">
                    <SpinnerContentCustom loading={TVDetailsLoading} />
                </div>
            :
                <>
                    <div className="info_page__details">
                        <Info 
                            IMG_API={IMG_API}
                            info={TVDetails}
                            title={TVDetails.name}
                            date={TVDetails.first_air_date}
                            certification={certification }
                            hours={hours}
                            minutes={minutes}
                            onlyMinutes={onlyMinutes}
                            handleOpen={handleOpen}
                            trailer={trailer}
                            creator={createdBy}
                            trailer_url={trailer_url}
                        />
                    </div>

                    <div className="info_page__cast">
                        <div class>

                        </div>
                        <InfoCast 
                            cast={cast.slice(0,6)} 
                            IMG_API={IMG_API}
                        />
                    </div>

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

export default InfoTV