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
    const [trailer, setTrailer] = useState([]);
    const credits = movieDetails.credits;
    const totalMinutes = movieDetails.runtime;
    const hours = Math.floor(totalMinutes / 60);          
    const minutes = totalMinutes % 60;

    
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


    }, [ MOVIE_TRAILER_API ])

    useEffect(() => {
        fetch(GET_MOVIE_DETAILS)
        .then(res => res.json())
        .then(data => {
          console.log("movieDetails",data);
            if(data){
                setMovieDetails(data);
                setMovieDetailsLoading(false);
            }
          
        })


      }, [ GET_MOVIE_DETAILS ])
    

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
                            </div>

                            <div className="movie__genre_container">
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

                            <div className="movie__ratings_container marginTop">
                                <span className="movie__ratings marginRightLeft">
                                    <StarIcon /> 
                                </span>
                                
                                <span className="movie__ratings">
                                    {movieDetails.vote_average}
                                </span>

                                <div>
                                    <span className="movie__genre">
                                        /10
                                    </span>
                                    
                                    <span className="movie__genre marginRightLeft">
                                        ({movieDetails.vote_count})
                                    </span>
                                </div>
                            </div>

                            <div className="movie__overview_container">
                                <span className="movie__genre "> 
                                    {movieDetails.overview}
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
