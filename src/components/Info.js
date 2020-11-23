import React from 'react';
// import TrailerButton from '../components/TrailerButton';
import StarIcon from '@material-ui/icons/Star';
import Hidden from '@material-ui/core/Hidden';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
// import ReactPlayer from 'react-player';
import './Info.css';

function Info({ id, IMG_API, info, title,  certification, crewDirector }) {

    return (
        <div className="info">
            <Hidden smDown>
                <div className="card">
                    {info.poster_path?
                        <img 
                            src={IMG_API + info.poster_path} 
                            alt={info.title} 
                            className="card__image"
                        />
                    :
                        <div className="card__image image__broken">
                            <BrokenImageIcon/>
                        </div>
                    }
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
                        {(info.genres)?.length>0?
                            <div className="description__genres">
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
                                
                            </div>
                        :null}

                        {info.vote_average && info.vote_count?
                            <>
                                <div className="description__ratings">
                                    <div>
                                        <span className="marginRightLeft">
                                            <StarIcon /> 
                                        </span>
                                    </div>

                                    <div>
                                        <div>    
                                            <span className="info__text info__text--big info__text--bold">
                                                {info.vote_average}
                                            </span>
                                            <span className="info__text info__text--x-small">
                                                /10
                                            </span>
                                        </div>   

                                        {/* <div>
                                            <span className="info__text info__text--x-small marginRightLeft">
                                                ({info.vote_count})
                                            </span>
                                        </div>  */}
                                    </div>
                                </div>
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


                    
                    <div className="info__overview info__text info__text--regular">
                        <Hidden mdUp>
                            <img 
                                src={IMG_API + info.poster_path} 
                                alt={info.title} 
                                className="card__image info__overview_image"
                            />
                        </Hidden>
                        <div className="info__over"> 
                            <span className="info__over_text">
                                {info.overview}
                            </span>
                            {crewDirector?
                                <>
                                    {crewDirector.length>0?
                                        <div className="director__container">
                                            <div className="crewWidth">
                                                <span className="info__text info__text--bold info__text--small">
                                                    {crewDirector.length>1? " Directors: ": "Director: "}
                                                </span>
                                            </div>

                                            <div className="director">
                                                {crewDirector.length>1?
                                                    <>
                                                        {crewDirector
                                                            .map((result) => (
                                                                <div key={result.id}>
                                                                    <span key={result.id} className="info__text info__text--small">
                                                                        {result.name}
                                                                    </span>
                                                                </div>))
                                                            .reduce((prev, curr) => [prev, 
                                                                <span className="info__text marginRight">,</span>
                                                                ,curr])
                                                        }
                                                    </>
                                                :
                                                    <>
                                                        {crewDirector
                                                            .map((result) => (
                                                            <div key={result.id}>
                                                                <span key={result.id} className="info__text info__text--small">
                                                                    {result.name}
                                                                </span>
                                                            </div>))
                                                        }
                                                    </>
                                                }
                                            </div>
                                            
                                        </div>
                                    :null}
                                </>
                            :null}
                        </div>
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
