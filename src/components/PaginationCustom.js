import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import Pagination from '@material-ui/lab/Pagination';
import Hidden from '@material-ui/core/Hidden';

function PaginationCustom({ totalPages, setPage, page }) {
    const { pageNo } = useParams();
    const [{},  dispatch] = useStateValue();
   
    const handleChange = (event, value) => {
        dispatch(setPage(value));
        
        if(parseInt(pageNo) !== page){
            dispatch(setPage(parseInt(pageNo)));
        }
    };

    useEffect(() => {
        if(parseInt(pageNo) !== page){
            dispatch(setPage(parseInt(pageNo)));
        }
    }, [ pageNo, dispatch ]);


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
