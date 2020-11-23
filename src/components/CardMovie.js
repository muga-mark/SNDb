import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY, IMG_API } from '../api';

import ModalCustom from './ModalCustom';
import TrailerButton from './TrailerButton';

import StarIcon from '@material-ui/icons/Star';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

import './Card.css';

function CardMovie ({ title, poster_path, vote_average, release_date, id }) {
    const [ open, setOpen ] = useState(false);
    const [ trailer, setTrailer ] = useState("");
    const [ trailerLoading, setTrailerLoading ] = useState(true);
    
    const MOVIE_TRAILER_API = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
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
            if(data.results){
                setTrailer(data.results[0]?.key);
                setTrailerLoading(false);
            }
        });
    }, [ MOVIE_TRAILER_API ]);

    return (
        <div className="movie">
            
            <div className="movie_poster">
                <Link to={`/movie/${id}`} className="poster__link">
                    {poster_path?
                        <img 
                            src={IMG_API + poster_path} 
                            alt={title} 
                            className="poster"
                        />
                    :
                        <div className="poster image__broken">
                            <BrokenImageIcon/>
                        </div>
                    }
                </Link>
            </div>

            <div className="movie_info">
                <div className="movie_info_title">
                    <Link to={`/movie/${id}`} className="poster__link">
                        {title}
                    </Link>
                </div>
               
                
                <div className="movie_info_trailer">
                    <TrailerButton
                        handleOpen={handleOpen}
                        trailer={trailer}
                        trailerLoading={trailerLoading}
                    />
                </div>
                
                <div className="movie_info_more">
                    <span>
                        {release_date}
                    </span>
                    <div className="movie_info_more_rating">
                        <StarIcon />
                        <span>{vote_average}</span>
                    </div>
                </div>
                
                
            </div>

            <ModalCustom 
                open={open}
                handleClose={handleClose}
                trailer_url={trailer_url}
            />

        </div>
    );
}

export default CardMovie;
