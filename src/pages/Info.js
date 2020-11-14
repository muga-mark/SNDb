import React from 'react';
import InfoCrew from './InfoCrew';
import TrailerButton from '../components/TrailerButton';
import StarIcon from '@material-ui/icons/Star';
import Hidden from '@material-ui/core/Hidden';

function Info({ IMG_API, info, certification, hours, minutes, handleOpen, trailer, crewDirector, crewWriters }) {
    return (
        <div className="info">
            <div className="card">
                <img 
                    src={IMG_API + info.poster_path} 
                    alt={info.title} 
                    className="card__image"
                />
            </div>

            <div className="description">
                <div className="description__header">
                    <span className="description__title">
                        {info.title}
                    </span>
                    
                    <div className="description__ratings">
                        <span className="marginRightLeft">
                            <StarIcon /> 
                        </span>

                        <div>
                            <div>    
                                <span className="info__text info__text--big info__text--bold">
                                    {info.vote_average}
                                </span>
                                <span className="info__text info__text--x-small info__text--bold">
                                    /10
                                </span>
                            </div>   

                            <div>
                                <span className="info__text info__text--x-small marginRightLeft">
                                    ({info.vote_count})
                                </span>
                            </div> 
                        </div>
                    </div>
                </div>

                <div className="description__sub_header">
                    {certification?
                        <div className="info__text">
                            <span>
                                {certification}
                            </span>
                        </div>
                    :
                        <div className="info__text">
                            <span>No Rating</span>
                        </div>
                    }
                    

                    {info.genres.length>0?
                    <>
                        <div className="info__text marginRightLeft">
                            <span>|</span>
                        </div>

                        {info.genres
                            .map((result) => (
                                <div key={result.id} className="info__text">
                                    {result.name}
                                </div>))
                            .reduce((prev, curr) => [prev, 
                                <span className="info__text marginRight"> ,</span>
                                ,curr])
                        }
                    </>
                    :null}
                    
                    
                    {hours && minutes ?
                    <>
                        <div className="info__text marginRightLeft">
                            <span>|</span>
                        </div>

                        <div>
                            <span className="info__text marginRight">
                                {hours}hr
                            </span>
                            <span className="info__text marginRight">
                                {minutes}min
                            </span>
                        </div>
                    </>
                    :null}

                    <div className="info__text marginRightLeft">
                        <span>|</span>
                    </div>

                    <div>
                        <span className="info__text marginRight">
                            {info.release_date} 
                        </span>
                    </div>
                </div>

                <div className="info__trailer">
                    <TrailerButton
                        handleOpen={handleOpen}
                        trailer={trailer}
                    />
                </div>

                <div className="info__overview">
                    <span className="info__text"> 
                        {info.overview}
                    </span>
                </div>

                <div className="info__crew">
                    <InfoCrew 
                        crewDirector={crewDirector}
                        crewWriters={crewWriters}
                    />
                </div>
            </div>
        </div>
        
    )
}

export default Info
