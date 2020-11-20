import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import './Info.css';

function InfoCast({ profile_path, original_name, character, IMG_API, id }) {
    return (
        <>
                {/* {cast.map((result) => (
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
                ))} */}
                
                <div className="cast__container" key={id} >
                    <div className="cast__profile">
                        {profile_path?
                            <img 
                                src={IMG_API + profile_path} 
                                alt={original_name} 
                                className="cast__image"
                            />
                        :
                            <PersonIcon />
                        }
                    </div>
                    <div className="cast__name">
                        <span className="info__text info__text--bold info__text--small"> 
                            {original_name} 
                        </span>
                        <span className="info__text info__text--x-small info__text--grey"> 
                            {character} 
                        </span>
                    </div>
                    
                </div>
                
        </>
    )
}

export default InfoCast
