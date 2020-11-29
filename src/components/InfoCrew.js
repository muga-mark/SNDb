import React from 'react';
import './Info.css';

function InfoCrew({ crewWriters, createdBy }) {
    return (
        <>
            {crewWriters?
                <>
                {crewWriters.length>0?
                    <div className="writers__container">
                        <div className="infoWidth">
                            <span className="info__text info__text--bold info__text--small">
                                {crewWriters.length>1? " Writers:" : "Writer:"}
                            </span>
                        </div>

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
                                            <span className="info__text marginRight">,</span>
                                            ,curr])
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

            
        </>
    )
}

export default InfoCrew
