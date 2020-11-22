import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SpinnerContentCustom from "./SpinnerContentCustom";

function TrailerButton({ trailer, handleOpen, trailerLoading }) {
    return (
        <button type="button" onClick={handleOpen} disabled={!trailer} > 
            {trailerLoading?
                <SpinnerContentCustom 
                    loading={trailerLoading} 
                    size={10}
                    color={"#ECF0F3"}
                />
            :
                <>
                    <PlayArrowIcon />
                    {trailer?
                        <span>Trailer</span>
                    :
                        <span>No Trailer</span>
                    }
                </>
            }
        </button>
    )
}

export default TrailerButton
