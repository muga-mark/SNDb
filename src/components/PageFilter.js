import React from 'react';
import { useStateValue } from '../StateProvider';
import { SET_PAGE_MOVIES_POPULAR } from '../action';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import './PageFilter.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 40,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function PageFilter({ setSortBy, sortBy, menuItems, setPage }) {
    const [{},  dispatch] = useStateValue();
    const classes = useStyles();

    const sortHandleChange = (event) => {
        setSortBy(event.target.value);
        // setPage(1);
        dispatch(setPage(1));
    };

    return (
        <FormControl className={classes.formControl}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                onChange={sortHandleChange} 
            >
                {menuItems.map((result)=>(
                    <MenuItem  value={result.value}>
                        <div className="menuItem"> 
                            {result.item} {result.icon}
                        </div>
                    </MenuItem >
                ))}
                
                
            </Select>
        </FormControl>
    )
}

export default PageFilter
