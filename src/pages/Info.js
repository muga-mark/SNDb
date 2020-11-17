import React from 'react';
import InfoCrew from './InfoCrew';
import TrailerButton from '../components/TrailerButton';
import StarIcon from '@material-ui/icons/Star';
import Hidden from '@material-ui/core/Hidden';
import ReactPlayer from 'react-player';
import './Info.css';

function Info({ IMG_API, info, title, trailer_url, date, certification, hours, minutes, onlyMinutes, handleOpen, trailer, crewDirector, crewWriters, creator }) {
    return (
        <div className="info">
            <Hidden smDown>
                <div className="card">
                    <img 
                        src={IMG_API + info.poster_path} 
                        alt={info.title} 
                        className="card__image"
                    />
                    <div className="description__certfication_container">
                        {certification?
                            <div className="description__certification">
                                {certification}
                            </div>
                        :
                            <div className="description__certification">
                                NR
                            </div>
                        }
                    </div>
                </div>
            </Hidden>

            
            
            <div className="description">
                
                <div className="description__header">
                    <div className="separator">
                        <span className="description__title">
                            {title}
                        </span>
                    </div>
                </div>

                <div className="description__content">
                    <div className="description__subheader">
                        {/* {hours && minutes ?
                            <>
                                <div>
                                    <span> {hours}hr </span>
                                    <span> {minutes}min </span>
                                </div>
                                <span className="ghost"> | </span>
                            </>
                        :null}

                        {onlyMinutes?
                            <>
                                <div>
                                    <span> {onlyMinutes}min </span>
                                </div>
                                <span className="ghost"> | </span>
                            </>
                        :null} */}
                        
                        {info.genres.length>0?
                        <>
                        
                            {info.genres
                                .map((result) => (
                                    <div key={result.id}>
                                        <span>{result.name}</span>
                                    </div>
                                    ))
                                .reduce((prev, curr) => [prev,
                                    <span className="marginRight">,</span>
                                    ,curr])
                            }
                            {/* <span className="ghost">|</span> */}
                        </>
                        :null}
            
                        {/* <span> {date} </span> */}
                    </div>

                    {/* <div className="description__ratings">
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
                    </div> */}


                    <div className="info__overview">
                        <Hidden mdUp>
                            <div className="card">
                                <img 
                                    src={IMG_API + info.poster_path} 
                                    alt={info.title} 
                                    className="card__image"
                                />
                                <div className="description__certfication_container">
                                    {certification?
                                        <div className="description__certification">
                                            {certification}
                                        </div>
                                    :
                                        <div className="description__certification">
                                            NR
                                        </div>
                                    }
                                </div>
                            </div>
                        </Hidden>
                        <span className="info__text marginRightLeft"> 
                            {info.overview}
                        </span>
                    </div>

                    
                    <div className="info__crew">
                        <InfoCrew 
                            crewDirector={crewDirector}
                            crewWriters={crewWriters}
                            creator={creator}
                        />
                    </div>
                </div>


                <div className="separator_footer" />
                 
            
                {/* <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url={trailer_url}
                        width='100%'
                        height='100%'
                        controls={true}
                        // playing
                    />
                </div> */}

                    
            </div>
        </div>
        
    )
}

export default Info
