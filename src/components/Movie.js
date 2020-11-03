import React from 'react';
import './Movie.css';

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const Movie = ({ title, poster_path, overview, vote_average, release_date }) => (
    <div className="movie">
        
        <img 
            src={IMG_API + poster_path} 
            alt={title} 
            className="movie_poster"
        />
        <h3>{vote_average}</h3>
        <h2>{title}</h2>
        <h3>{release_date}</h3>
    </div>
);

export default Movie;
