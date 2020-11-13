import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import StarIcon from '@material-ui/icons/Star';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReactPlayer from 'react-player';
import PersonIcon from '@material-ui/icons/Person';
import { API_KEY, IMG_API } from '../api';
import { makeStyles } from '@material-ui/core/styles';
import './Info.css';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        // backgroundColor: theme.palette.background.paper,
        outline: 'none',
        [theme.breakpoints.up('xs')]: {
            width: '90vw',
        },
        // [theme.breakpoints.up('sm')]: {
        //     width: '85vw',
        // },
        [theme.breakpoints.up('md')]: {
            width: '70vw',
        },
        // [theme.breakpoints.up('lg')]: {
        //     width: '70vw',
        // },
    },
}));

function InfoMovie({ }) {
    const classes = useStyles();
    const { movieId } = useParams();
    const [open, setOpen] = useState(false);
    const [ crewWriters, setCrewWriters ] = useState([]);
    const [ crewDirector, setCrewDirector ] = useState([]);
    const [ castFull, setCastFull ] = useState([]);
    const [ castFiltered, setCastFiltered ] = useState([]);
    const [ trailer, setTrailer] = useState([]);
    const [ certification, setCertification ] = useState("");
    const [ movieDetails, setMovieDetails ] = useState([]);
    const [ movieDetailsLoading, setMovieDetailsLoading ] = useState(true);
    
    const GET_MOVIE_CONTENT_RATING = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${API_KEY}`;
    const GET_MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=releases%2Cvideos%2Ccredits`;
    const MOVIE_TRAILER_API = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
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
        // fetch(MOVIE_TRAILER_API)
        // .then(res => res.json())
        // .then(data => {
        // //   console.log("trailer",data.results);
        //     if(data.results){
        //         setTrailer(data.results[0]?.key);
        //     }
          
        // });

        fetch(GET_MOVIE_DETAILS)
        .then(res => res.json())
        .then(data => {
          console.log("movieDetails",data);
        //   console.log("trailer key", data.videos.results[0]?.key);
            if(data){
                setMovieDetails(data);
                setMovieDetailsLoading(false);
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

    }, [ MOVIE_TRAILER_API, GET_MOVIE_DETAILS ]);
    

    return (
        <div className="info_page">
            <div className="details__container">
                {movieDetailsLoading?
                    <div className="page__spinner">
                        <SpinnerContentCustom loading={movieDetailsLoading} />
                    </div>
                :
                    <>
                        <div className="movie__details">

                            <div className="movie__poster_container">
                                <div className="movie__posters">
                                    <img 
                                        src={IMG_API + movieDetails.poster_path} 
                                        alt={movieDetails.title} 
                                        className="posters"
                                    />
                                </div>
                            </div>

                            <div className="movie__overview">

                                <div className="movie__title_container">
                                    <span>
                                        {movieDetails.title}
                                    </span>
                                    
                                    <div className="movie__ratings_container">
                                        <span className="movie__ratings marginRightLeft">
                                            <StarIcon /> 
                                        </span>

                                        <div>
                                            <div>    
                                                <span className="movie__ratings">
                                                    {movieDetails.vote_average}
                                                </span>
                                                <span className="movie__ratings_small">
                                                    /10
                                                </span>
                                            </div>   

                                            <div>
                                                <span className="movie__ratings_small marginRightLeft">
                                                    ({movieDetails.vote_count})
                                                </span>
                                            </div> 
                                        </div>
                                        
                                </div>
                                </div>

                                <div className="movie__genre_container">

                                    {certification?
                                        <div className="movie__genre">
                                            <span>
                                                {certification}
                                            </span>
                                        </div>
                                    :
                                        <div className="movie__genre">
                                            <span>No Rating</span>
                                        </div>
                                    }
                                    

                                    {movieDetails.genres.length>0?
                                    <>
                                        <div className="movie__genre marginRightLeft">
                                            <span>|</span>
                                        </div>

                                        {movieDetails.genres
                                            .map((result) => (
                                                <div key={result.id} className="movie__genre">
                                                    {result.name}
                                                </div>))
                                            .reduce((prev, curr) => [prev, <span className="movie__genre marginRight"> ,</span>, curr])
                                        }
                                    </>
                                    :null}
                                    
                                    
                                    {hours && minutes ?
                                    <>
                                        <div className="movie__genre marginRightLeft">
                                            <span>|</span>
                                        </div>

                                        <div className="movie__runtime">
                                            <span className="movie__genre marginRight">
                                                {hours}hr
                                            </span>
                                            <span className="movie__genre marginRight">
                                                {minutes}min
                                            </span>
                                        </div>
                                    </>
                                    :null}

                                    <div className="movie__genre marginRightLeft">
                                        <span>|</span>
                                    </div>

                                    <div className="movie__releaseDate">
                                        <span className="movie__genre marginRight">
                                            {movieDetails.release_date} 
                                        </span>
                                    </div>
                                </div>

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

                                

                                <div className="movie__overview_container">
                                    <span className="movie__genre "> 
                                        {movieDetails.overview}
                                    </span>
                                </div>

                                
                                <div className="movie__crew">
                                    <div className="director__container marginTop ">
                                        <span className="movie__genre marginRight width">
                                            {crewDirector.length>1? " Directors: ": "Director: "}
                                        </span>
                                        {crewDirector.length>0?
                                            <div className="director">
                                                {crewDirector.length>1?
                                                    <>
                                                        {crewDirector
                                                            .map((result) => (
                                                            <div key={result.crew_id}>
                                                                <span className="movie__genre">
                                                                    {result.name}
                                                                </span>
                                                            </div>))
                                                            .reduce((prev, curr) => [prev, <span className="movie__genre marginRight"> ,</span>, curr])
                                                        }
                                                    </>
                                                :
                                                    <>
                                                        {crewDirector
                                                            .map((result) => (
                                                            <div key={result.crew_id} >
                                                                <span className="movie__genre">
                                                                    {result.name}
                                                                </span>
                                                            </div>))
                                                        }
                                                    </>
                                                }
                                            </div>
                                        :null}
                                    </div>

                                    {crewWriters.length>0?
                                        <div className="writers__container marginTop">
                                            <span className="movie__genre marginRight width">
                                                {crewWriters.length>1? " Writers:" : "Writer:"}
                                            </span>
                                            <div className="writers">
                                                {crewWriters.length>1?
                                                    <>
                                                        {crewWriters
                                                            .map((result) => (
                                                            <div key={result.crew_id}>
                                                                <span className="movie__genre ">
                                                                    {result.job === "Writer" ?
                                                                    <>{result.name}</>
                                                                    :<>{result.name} ({result.job})</>}
                                                                </span>
                                                            </div>))
                                                            .reduce((prev, curr) => [prev, <span className="movie__genre marginRight"> ,</span>, curr])
                                                        }
                                                    </>
                                                :
                                                    <>
                                                        {crewWriters
                                                            .map((result) => (
                                                            <div key={result.crew_id}>
                                                                <span className="movie__genre ">
                                                                    {result.job === "Writer" ?
                                                                    <>{result.name}</>
                                                                    :<>{result.name} ({result.job})</>}
                                                                </span>
                                                            </div>))
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    :null}

                                </div>

                                
                                

                                

                                

                            </div>

                        </div>
                    </>
                }   
            </div>

            <div className="cast__container">
                {castFiltered.map((result) => (
                    <div key={result.cast_id} className="cast">
                        <div className="cast_profile__container">
                            {result.profile_path?
                                <img 
                                    src={IMG_API + result.profile_path} 
                                    alt={result.original_name} 
                                    className="cast_profile"
                                />
                            :
                                <PersonIcon />
                            }
                        </div>
                        <div className="cast_name__container">
                            <span className="cast_name"> 
                                {result.original_name} 
                            </span>
                            <span className="cast_character"> 
                                {result.character} 
                            </span>
                        </div>
                        
                    </div>
                ))}
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                >
                <Fade in={open}>
                <div className={classes.paper}>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            url={trailer_url}
                            width='100%'
                            height='100%'
                            controls={true}
                            playing
                        />
                    </div>
                </div>
                </Fade>
            </Modal>
            
        </div>
    )
}

export default InfoMovie
