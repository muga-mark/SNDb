import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import Hidden from '@material-ui/core/Hidden';

function PaginationCustom({ totalPages, page, setPage }) {

    const handleChange = (event, value) => {
        setPage(value);
      };

    return (
        <div>
            <Hidden smUp>
                <Pagination 
                    count={totalPages} 
                    color="secondary" 
                    page={page} 
                    onChange={handleChange} 
                    siblingCount={1}
                    size='small'
                />  
            </Hidden>
            <Hidden only="xs">
                <Pagination 
                    count={totalPages} 
                    color="secondary" 
                    page={page} 
                    onChange={handleChange} 
                    siblingCount={2}
                    size='medium'
                />  
            </Hidden>
        </div>
    )
}

export default PaginationCustom
