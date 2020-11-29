import React, { useEffect } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SpinnerContentCustom from "./SpinnerContentCustom";

function TrailerButton({ trailer, handleOpen, isFetchTrailer, trailerLoading }) {

    return (
        <button type="button" onClick={handleOpen} > 
            
                <>
                    
                    {/* <span>Trailer</span> */}
                    {isFetchTrailer?
                        <>
                            <PlayArrowIcon />
                            <span>Trailer</span>
                        </>
                    :
                        <>
                            {trailerLoading?
                                <SpinnerContentCustom 
                                    loading={trailerLoading} 
                                    size={10}
                                    color={"#ECF0F3"}
                                />
                            :
                                <>
                                    <PlayArrowIcon />
                                    <span>No Trailer</span>
                                </>
                            }
                        </>    
                    }
                </>
        </button>
    )
}

export default TrailerButton
