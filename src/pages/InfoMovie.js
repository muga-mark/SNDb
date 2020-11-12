import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import StarIcon from '@material-ui/icons/Star';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReactPlayer from 'react-player';
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
    const { movieId } = useParams();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [ movieDetails, setMovieDetails ] = useState([]);
    const [ movieDetailsLoading, setMovieDetailsLoading ] = useState(true);
    const [ crews, setCrews ] = useState([]);
    const [ cast, setCast ] = useState([]);
    const [trailer, setTrailer] = useState([]);

    const [ contentRating, setContentRating ] = useState([]);
    


    const totalMinutes = movieDetails.runtime;
    const hours = Math.floor(totalMinutes / 60);          
    const minutes = totalMinutes % 60;

    

   

   

    const GET_MOVIE_CONTENT_RATING = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${API_KEY}`;
    const GET_MOVIE_DETAILS = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
    const MOVIE_TRAILER_API = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
    const trailer_url = `https://www.youtube.com/watch?v=${trailer}`;

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch(MOVIE_TRAILER_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("trailer",data.results);
            if(data.results){
                setTrailer(data.results[0]?.key);
            }
          
        })


    }, [ MOVIE_TRAILER_API ]);

    useEffect(() => {
        fetch(GET_MOVIE_DETAILS)
        .then(res => res.json())
        .then(data => {
          console.log("movieDetails",data);
            if(data){
                setMovieDetails(data);
                setMovieDetailsLoading(false);
                setCrews(data.credits.crew);
                setCast(data.credits.cast);
            }
          
        })


    }, [ GET_MOVIE_DETAILS ]);

    useEffect(() => {
        
        fetch(GET_MOVIE_CONTENT_RATING)
        .then(res => res.json())
        .then(data => {
          console.log("rating",data.results);
            if(data){
                const contentRatingResult = data.results.filter(function(el){
                    return  el.iso_3166_1 === "US" || el.iso_3166_1 === "CA";
                });
        
                setContentRating(contentRatingResult[0]?.release_dates[0]);
            }
          
        })


    }, [ GET_MOVIE_CONTENT_RATING ])
    

    // const crewNew = credits.crew;
    // console.log("CREW NEW", crews);

    const crewWriters = crews.filter(function(el){
        return  el.department === "Writing" &&
                (el.job === "Screenplay" || el.job === "Writer" || el.job === "Novel");
    });

    // console.log("Screenplay Array", crewWriters);

    const crewDirector = crews.filter(function(el){
        return  el.department === "Directing" &&
                el.job === "Director";
    });

    // console.log("Director Array", crewDirector);

    // const contentRatingResult = contentRating.filter(function(el){
    //     return  el.iso_3166_1 === "US";
    // });
    // const [ certification, setCertification ] = useState(contentRatingResult);
    // setContentRating(contentRatingResult[0].release_dates);
    console.log("contentRatingResult>>>>", contentRating);
    // console.log("certification", certification);

    // console.log("contentRating",contentRating);

    return (
        <div className="page">
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

                                {contentRating.certification ?
                                    <div className="movie__genre">
                                        <span>{contentRating.certification}</span>
                                    </div>
                                :
                                    <div className="movie__genre">
                                        <span>No Rating</span>
                                    </div>
                                }
                                

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

                                <div className="movie__genre marginRightLeft">
                                    <span>|</span>
                                </div>

                                <div className="movie__releaseDate">
                                    <span className="movie__genre marginRight">
                                        {movieDetails.release_date} 
                                    </span>
                                </div>
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
