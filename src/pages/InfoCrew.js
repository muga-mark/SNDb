import React from 'react';

function InfoCrew({ crewDirector, crewWriters }) {
    return (
        <>
            {crewDirector.length>0?
                <div className="director__container">
                    <span className="info__text marginRight width">
                        {crewDirector.length>1? " Directors: ": "Director: "}
                    </span>

                    <div className="director">
                        {crewDirector.length>1?
                            <>
                                {crewDirector
                                    .map((result) => (
                                        <div key={result.crew_id}>
                                            <span className="info__text">
                                                {result.name}
                                            </span>
                                        </div>))
                                    .reduce((prev, curr) => [prev, 
                                        <span className="info__text marginRight"> ,</span>,curr])
                                }
                            </>
                        :
                            <>
                                {crewDirector
                                    .map((result) => (
                                    <div key={result.crew_id} >
                                        <span className="info__text">
                                            {result.name}
                                        </span>
                                    </div>))
                                }
                            </>
                        }
                    </div>
                    
                </div>
            :null}

            {crewWriters.length>0?
                <div className="writers__container">
                    <span className="info__text marginRight width">
                        {crewWriters.length>1? " Writers:" : "Writer:"}
                    </span>

                    <div className="writers">
                        {crewWriters.length>1?
                            <>
                                {crewWriters
                                    .map((result) => (
                                        <div key={result.crew_id}>
                                            <span className="info__text ">
                                                {result.job === "Writer" ?
                                                <>{result.name}</>
                                                :<>{result.name} ({result.job})</>}
                                            </span>
                                        </div>))
                                    .reduce((prev, curr) => [prev, 
                                        <span className="info__text marginRight"> ,</span>,curr])
                                }
                            </>
                        :
                            <>
                                {crewWriters
                                    .map((result) => (
                                    <div key={result.crew_id}>
                                        <span className="info__text ">
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
    )
}

export default InfoCrew
