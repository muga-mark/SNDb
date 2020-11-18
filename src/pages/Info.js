import React from 'react';
import InfoCrew from './InfoCrew';
// import TrailerButton from '../components/TrailerButton';
// import StarIcon from '@material-ui/icons/Star';
import Hidden from '@material-ui/core/Hidden';
// import ReactPlayer from 'react-player';
import './Info.css';

function Info({ id, IMG_API, info, title, trailer_url, date, certification, hours, minutes, onlyMinutes, handleOpen, trailer, crewDirector, crewWriters, creator }) {

    
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
                        {info.genres.length>0?
                            <>
                                {info.genres
                                    .map((result) => (
                                        <div key={result.id}>
                                            <span key={result.id} className="info__text info__text--small">
                                                {result.name}
                                            </span>
                                        </div>
                                        ))
                                    .reduce((prev, curr) => [prev,
                                        <span className="marginRight">,</span>
                                        ,curr])
                                }
                                
                            </>
                        :null}

                        
                    </div>

                    <div className="description__subheader2">
                        {/* {info.vote_average && info.vote_count?
                            <>
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
                                <span className="ghost">|</span>
                            </>
                        :null} */}

                    </div>


                    
                    <div className="info__overview info__text">
                        <Hidden mdUp>
                            <img 
                                src={IMG_API + info.poster_path} 
                                alt={info.title} 
                                className="card__image info__overview_image"
                            />
                        </Hidden>
                        <div className="info__over"> 
                            {info.overview}
                        </div>
                    </div>
                    

                   
                    
                    
                    <div className="info__crew">
                        <InfoCrew 
                            crewDirector={crewDirector}
                            crewWriters={crewWriters}
                            creator={creator}
                        />
                    </div>
                    
                    {/* {hours && minutes ?
                        <div className="director__container">
                            <span className="info__text info__text--bold info__text--small detailsWidth">
                                Running time:
                            </span>

                            <div className="director">
                                <span className="info__text info__text--small marginRight"> 
                                    {hours}hr 
                                </span>
                                <span className="info__text info__text--small"> 
                                    {minutes}min 
                                </span>
                            </div>
                        </div>
                    :null}

                    {onlyMinutes?
                       <div className="director__container">
                            <span className="info__text info__text--bold info__text--small detailsWidth">
                                Running time:
                            </span>

                            <div className="director">
                                <span className="info__text info__text--small"> 
                                    {onlyMinutes}min
                                </span>
                            </div>
                        </div>
                    :null} */}

                    
                    {/* {date?
                        <div className="director__container">
                            <span className="info__text info__text--bold info__text--small detailsWidth">
                                Release date:
                            </span>

                            <div className="director">
                                <span className="info__text info__text--small"> 
                                    {date}
                                </span>
                            </div>
                            
                        </div>
                    :null} */}

                    {/* {info.homepage?
                    <div className="director__container">
                            <span className="info__text info__text--bold info__text--small detailsWidth">
                                Homepage:
                            </span>

                            <div className="director">
                                <a href={`${info.homepage}`} 
                                    target="_blank" 
                                    className="info__text info__text--small description__link"
                                    rel="noopener noreferrer" 
                                >
                                    {info.homepage}
                                </a>  
                            </div>
                        </div>
                    :null} */}
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
