import React, { useEffect, useState } from 'react';
import StarIcon from '@material-ui/icons/Star';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReactPlayer from 'react-player';
import { API_KEY, MOVIE_DETAILS_API, IMG_API } from '../api';
import { makeStyles } from '@material-ui/core/styles';
import 'react-toastify/dist/ReactToastify.css';
import './Card.css';

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


function CardTV ({ name, poster_path, overview, vote_average, first_air_date, id }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [trailer, setTrailer] = useState([]);
    
    const TV_TRAILER_API = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`;
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
            // console.log("trailer",data.results);
            if(data.results){
                setTrailer(data.results[0]?.key);
            }
        })

      }, [ TV_TRAILER_API ])

    return (
        <div className="movie">
            
            <div className="movie_poster">
                <img 
                    src={IMG_API + poster_path} 
                    alt={name} 
                    className="poster"
                />
            </div>

            <div className="movie_info">
                <div className="movie_info_title">
                    <p>{name}</p>
                </div>
                
                <div className="movie_info_trailer">
                    
                    <button type="button" onClick={handleOpen} disabled={!trailer} > 
                        <PlayArrowIcon />
                        {!trailer?
                            <span>No Trailer</span>
                        :
                            <span>Trailer</span>
                        }
                    </button>
                        
                </div>
                
                <div className="movie_info_more">
                    <span>
                        {first_air_date}
                    </span>
                    <div className="movie_info_more_rating">
                        <StarIcon />
                        <span>{vote_average}</span>
                    </div>
                </div>
                
                
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
    );
}

export default CardTV;
