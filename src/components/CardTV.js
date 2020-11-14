import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalCustom from './ModalCustom';
import StarIcon from '@material-ui/icons/Star';
import { API_KEY, IMG_API } from '../api';
import TrailerButton from './TrailerButton';
import './Card.css';

function CardTV ({ name, poster_path, vote_average, first_air_date, id }) {
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
            if(data.results){
                setTrailer(data.results[0]?.key);
            }
        });
    }, [ TV_TRAILER_API ]);

    return (
        <div className="movie">
            
            <div className="movie_poster">
                <Link to={`/tv/${id}`} className="poster__link">
                    <img 
                        src={IMG_API + poster_path} 
                        alt={name} 
                        className="poster"
                    />
                </Link>
            </div>

            <div className="movie_info">
                <div className="movie_info_title">
                    <p>{name}</p>
                </div>
                
                <div className="movie_info_trailer">
                    <TrailerButton
                        handleOpen={handleOpen}
                        trailer={trailer}
                    />
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

            <ModalCustom 
                open={open}
                handleClose={handleClose}
                trailer_url={trailer_url}
            />

        </div>
    );
}

export default CardTV;
