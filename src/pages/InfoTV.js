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

function InfoTV({ }) {
    const { TVId } = useParams();
    const [ TVDetails, setTVDetails ] = useState([]);
    const [ TVDetailsLoading, setTVDetailsLoading ] = useState(true);


    const classes = useStyles();
    const [open, setOpen] = useState(false);
    
    const [trailer, setTrailer] = useState([]);
    const credits = TVDetails.credits;
    const totalMinutes = TVDetails.episode_run_time;
    const hours = Math.floor(totalMinutes / 60);          
    const minutes = totalMinutes % 60;

    const GET_TV_DETAILS = `https://api.themoviedb.org/3/tv/${TVId}?api_key=${API_KEY}&language=en-US`;
    const TV_TRAILER_API = `https://api.themoviedb.org/3/tv/${TVId}/videos?api_key=${API_KEY}&language=en-US`;
    const trailer_url = `https://www.youtube.com/watch?v=${trailer}`;

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetch(TV_TRAILER_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("trailer",data.results);
            if(data.results){
                setTrailer(data.results[0]?.key);
            }
          
        })


    }, [ TV_TRAILER_API ])

    useEffect(() => {
        fetch(GET_TV_DETAILS)
        .then(res => res.json())
        .then(data => {
          console.log("TVDetails",data);
            if(data){
                setTVDetails(data);
                setTVDetailsLoading(false);
            }
          
        })


      }, [ GET_TV_DETAILS ])
    

    return (
        <div className="page">
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

                            <div className="movie__ratings_container marginTop">
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

export default InfoTV