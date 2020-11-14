import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function TrailerButton({ trailer, handleOpen }) {
    return (
        <button type="button" onClick={handleOpen} disabled={!trailer} > 
            <PlayArrowIcon />
            
            {!trailer?
                <span>No Trailer</span>
            :
                <span>Trailer</span>
            }
        </button>
    )
}

export default TrailerButton
