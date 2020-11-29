import React from 'react';
import InfoCrew from './InfoCrew';
import './Info.css';

function Info2({ info, date, hours, minutes, onlyMinutes, homepage, certification, crewDirector, crewWriters, creator, language }) {
    return (
        <div>

            <div className="info__crew">
                <InfoCrew 
                    crewDirector={crewDirector}
                    crewWriters={crewWriters}
                    creator={creator}
                />
            </div>
            
            <div className="info2"> 
                <div className="infoWidth">
                    <span className="info__text info__text--bold info__text--small">
                        Content Rating: 
                    </span>
                </div>
                <div>
                    <span className="info__text info__text--small"> 
                        {certification?
                            <>
                                {certification}
                            </>
                        :
                            "No Rating"
                        }
                    </span>
                </div>
            </div>

            {language?
                <div className="info2"> 
                    <div className="infoWidth">
                        <span className="info__text info__text--bold info__text--small">
                            Language: 
                        </span>
                    </div>
                    <div>
                        <span className="info__text info__text--small"> 
                            {language}
                        </span>
                    </div>
                </div>
            :null}

            {info.networks?
                <div className="info2"> 
                    <div className="infoWidth">
                        <span className="info__text info__text--bold info__text--small">
                            Network: 
                        </span>
                    </div>
                    <div>
                        <span className="info__text info__text--small"> 
                            {info.networks[0].name}
                        </span>
                    </div>
                </div>
            :null}

            {info.number_of_seasons?
                <div className="info2"> 
                    <div className="infoWidth">
                        <span className="info__text info__text--bold info__text--small">
                            No. of seasons: 
                        </span>
                    </div>
                    <div>
                        <span className="info__text info__text--small"> 
                            {info.number_of_seasons}
                        </span>
                    </div>
                </div>
            :null}

            {info.number_of_episodes?
                <div className="info2"> 
                    <div className="infoWidth">
                        <span className="info__text info__text--bold info__text--small">
                            No. of episodes: 
                        </span>
                    </div>
                    <div>
                        <span className="info__text info__text--small"> 
                            {info.number_of_episodes}
                        </span>
                    </div>
                </div>
            :null}

            {info.status?
                <div className="info2"> 
                    <div className="infoWidth">
                        <span className="info__text info__text--bold info__text--small">
                            Status: 
                        </span>
                    </div>
                    <div>
                        <span className="info__text info__text--small"> 
                            {info.status}
                        </span>
                    </div>
                </div>
            :null}

            {hours && minutes?
                <div className="info2"> 
                    <div className="infoWidth">
                        <span className="info__text info__text--bold info__text--small">
                            Running Minutes: 
                        </span>
                    </div>
                    <div>
                        <span className="info__text info__text--small"> 
                            {hours}hr {" "}
                        </span>
                        <span className="info__text info__text--small"> 
                            {minutes}mins 
                        </span>
                    </div>
                </div>
            :null}

            {onlyMinutes?
                <div className="info2"> 
                    <div className="infoWidth">
                        <span className="info__text info__text--bold info__text--small infoWidth">
                            Running Minutes: 
                        </span>
                    </div>
                    <div>
                        <span className="info__text info__text--small"> 
                            {onlyMinutes}mins 
                        </span>
                    </div>
                </div>
            :null}

            {date?
                <div className="info2"> 
                    <div className="infoWidth">
                        <span className="info__text info__text--bold info__text--small infoWidth">
                            Release Date: 
                        </span>
                    </div>
                    <div>
                        <span className="info__text info__text--small">
                            {date} 
                        </span>
                    </div>
                </div>
            :null}

            {info.first_air_date && info.last_air_date && info.status?
                <div className="info2"> 
                    <div className="infoWidth">
                        <span className="info__text info__text--bold info__text--small infoWidth">
                            Release Date: 
                        </span>
                    </div>
                    <div>
                        <span className="info__text info__text--small">
                            {info.first_air_date} 
                            {" "}-{" "}
                            {info.status==="Returning Series"?
                                "Present" 
                            : 
                                <>{info.last_air_date}</>
                            }
                        </span>
                    </div>
                </div>
            :null}

            {homepage?
                <div className="info2">
                    <div className="infoWidth">
                        <span className="info__text info__text--bold info__text--small infoWidth">
                            Homepage:
                        </span>
                    </div>
                    <a href={`${info.homepage}`} 
                        target="_blank" 
                        className="info__text info__text--small description__link infoWidth"
                        rel="noopener noreferrer" 
                    >
                        {info.homepage} 
                    </a>  
                </div>
            :null}
        </div>
    )
}

export default Info2

