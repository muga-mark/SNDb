import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_KEY, IMG_API } from '../api/setAPI';

import ModalCustom from './ModalCustom';
import TrailerButton from './TrailerButton';

import StarIcon from '@material-ui/icons/Star';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

import './Card.css';

function Card ({ media_type, type, title, name, poster_path, vote_average, release_date, first_air_date, id }) {
    const [ open, setOpen ] = useState(false);
    const [ trailer, setTrailer ] = useState("");
    const [ trailerLoading, setTrailerLoading ] = useState(true);
    const [ isFetchTrailer, setIsFetchTrailer ] = useState(true);
    
    const TRAILER_API = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`;
    const trailer_url = `https://www.youtube.com/watch?v=${trailer}`;   


    const fetchTrailer = () => {
        fetch(TRAILER_API)
        .then(res => res.json())
        .then(data => {
            if(data.results){
                if(data.results[0]?.key){
                    setTrailer(data.results[0]?.key);
                    setOpen(true);
                }else{
                    setIsFetchTrailer(false);
                    setTimeout(() => {
                        setTrailerLoading(false);
                    }, 500);
                }
            }
        });
    }
    
    const handleOpen = () => {
        fetchTrailer();
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="movie">
            
            <div className="movie_poster">
                {media_type?
                    <Link to={`/${media_type}/${id}`} className="poster__link">
                        {poster_path?
                            <img 
                                src={IMG_API + poster_path} 
                                alt={title||name} 
                                className="poster"
                            />
                        :
                            <div className="poster image__broken">
                                <BrokenImageIcon/>
                            </div>
                        }
                    </Link>
                :
                    <Link to={`/${type}/${id}`} className="poster__link">
                        {poster_path?
                            <img 
                                src={IMG_API + poster_path} 
                                alt={title||name} 
                                className="poster"
                            />
                        :
                            <div className="poster image__broken">
                                <BrokenImageIcon/>
                            </div>
                        }
                    </Link>
                }
                
            </div>

            <div className="movie_info">
                <div className="movie_info_title">
                    {media_type?    
                        <Link to={`/${media_type}/${id}`} className="poster__link">
                            {title||name}
                        </Link>
                    :
                        <Link to={`/${type}/${id}`} className="poster__link">
                            {title||name}
                        </Link>
                    }
                </div>
               
                
                <div className="movie_info_trailer">
                    <TrailerButton
                        handleOpen={handleOpen}
                        trailer={trailer}
                        trailerLoading={trailerLoading}
                        isFetchTrailer={isFetchTrailer}
                        setTrailerLoading={setTrailerLoading}
                    />
                </div>
                
                <div className="movie_info_more">
                    <span>
                        {release_date||first_air_date}
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

export default Card;
