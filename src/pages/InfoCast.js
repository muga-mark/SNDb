import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import './Info.css';

function InfoCast({ cast, IMG_API }) {
    return (
        <>
            {cast.map((result) => (
                <div key={result.cast_id} className="cast__container">
                    <div className="cast__profile">
                        {result.profile_path?
                            <img 
                                src={IMG_API + result.profile_path} 
                                alt={result.original_name} 
                                className="cast__image"
                            />
                        :
                            <PersonIcon />
                        }
                    </div>
                    <div className="cast__name">
                        <span className="info__text info__text--bold info__text--small"> 
                            {result.original_name} 
                        </span>
                        <span className="info__text info__text--x-small info__text--grey"> 
                            {result.character} 
                        </span>
                    </div>
                    
                </div>
            ))}
        </>
    )
}

export default InfoCast
