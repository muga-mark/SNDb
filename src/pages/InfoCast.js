import React from 'react';
import PersonIcon from '@material-ui/icons/Person';

function InfoCast({ castFiltered, IMG_API }) {
    return (
        <>
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
        </>
    )
}

export default InfoCast
