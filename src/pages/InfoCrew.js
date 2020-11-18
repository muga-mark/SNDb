import React from 'react';
import './Info.css';

function InfoCrew({ crewDirector, crewWriters, creator }) {
    return (
        <>
            {crewDirector?
                <>
                    {crewDirector.length>0?
                        <div className="director__container">
                            <span className="info__text info__text--bold info__text--small crewWidth">
                                {crewDirector.length>1? " Directors: ": "Director: "}
                            </span>

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
                                                <span className="info__text info__text--small marginRight"> ,</span>,curr])
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

            {crewWriters?
                <>
                {crewWriters.length>0?
                    <div className="writers__container">
                        <span className="info__text info__text--bold info__text--small crewWidth">
                            {crewWriters.length>1? " Writers:" : "Writer:"}
                        </span>

                        <div className="writers">
                            {crewWriters.length>1?
                                <>
                                    {crewWriters
                                        .map((result) => (
                                            <div key={result.id}>
                                                <span key={result.id} className="info__text info__text--small">
                                                    {result.job === "Writer" ?
                                                    <>{result.name}</>
                                                    :<>{result.name} ({result.job})</>}
                                                </span>
                                            </div>))
                                        .reduce((prev, curr) => [prev, 
                                            <span className="info__text info__text--small marginRight"> ,</span>,curr])
                                    }
                                </>
                            :
                                <>
                                    {crewWriters
                                        .map((result) => (
                                        <div key={result.id}>
                                            <span key={result.id} className="info__text info__text--small ">
                                                {result.job === "Writer" ?
                                                <>{result.name}</>
                                                :<>{result.name} ({result.job})</>}
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

            {creator? 
                <>
                    {creator.length>0?
                        <div className="director__container">
                            <span className="info__text info__text--bold info__text--small crewWidth">
                                {creator.length>1? " Creators:" : "Creator:"}
                            </span>

                            <div className="directors">
                                {creator.length>1?
                                    <>
                                        {creator
                                            .map((result) => (
                                                <div key={result.id}>
                                                    <span key={result.id} className="info__text info__text--small">
                                                        {result.name}
                                                    </span>
                                                </div>))
                                            .reduce((prev, curr) => [prev, 
                                                <span className="info__text marginRight"> ,</span>,curr])
                                        }
                                    </>
                                :
                                    <>
                                        {creator
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
        </>
    )
}

export default InfoCrew
