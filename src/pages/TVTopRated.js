import React, { useEffect, useState } from 'react';
import { API_KEY } from '../api';
import CardTV from '../components/CardTV';
import SpinnerContentCustom from "../components/SpinnerContentCustom";
import Pagination from '@material-ui/lab/Pagination';
import '../pages/z_styles.css';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 40,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));


function TVTopRated() {
    const [page, setPage] = useState(1);
    const [ tvTopRated, setTVTopRated ] = useState([]);
    const [ tvTopRatedLoading, setTVTopRatedLoading ] = useState(true);
    const [ tvTopRatedTotalPages, setTVTopRatedTotalPages ] = useState(0);
    
    const classes = useStyles();
    const [ sortBy, setSortBy ] = useState("vote_average.desc");

    const TV_TOPRATED_API = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&page=${page}&timezone=America%2FNew_York&vote_average.gte=3&vote_count.gte=500&include_null_first_air_dates=false&with_original_language=en`;

    const handleChange = (event, value) => {
      setPage(value);
    //   console.log("NEXT PAGE", page);
    };

    const sortHandleChange = (event) => {
        setSortBy(event.target.value);
        setPage(1);
    };

    useEffect(() => {
        fetch(TV_TOPRATED_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("popular movies", data);
          setTVTopRated(data.results);
          setTVTopRatedLoading(false);
          setTVTopRatedTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [TV_TOPRATED_API]);

    return (
        <div className="page">
            {tvTopRatedLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={tvTopRatedLoading} />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>Top Rated TV Shows</span>
                        </div>

                        <div className="page__filter">
                            <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sortBy}
                                    onChange={sortHandleChange}
                                >
                                    <MenuItem  value={"vote_average.desc"}>
                                        <div className="menuItem"> Rating <ArrowDownwardIcon/> </div>
                                    </MenuItem >
                                    <MenuItem  value={"vote_average.asc"}>
                                        <div className="menuItem"> Rating <ArrowUpwardIcon/> </div>
                                    </MenuItem>
                                    <MenuItem  value={"release_date.asc"}>
                                        <div className="menuItem"> Date <ArrowDownwardIcon/> </div>
                                    </MenuItem >
                                    <MenuItem  value={"release_date.desc"}>
                                        <div className="menuItem"> Date <ArrowUpwardIcon/> </div>
                                    </MenuItem >
                                    <MenuItem  value={"original_title.asc"}>
                                        <div className="menuItem"> Title A-Z </div>
                                    </MenuItem >
                                    <MenuItem  value={"original_title.desc"}>
                                        <div className="menuItem"> Title Z-A </div>
                                    </MenuItem >
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                
                    <div className="page__content_container">
                        <div className="page__content">
                            {tvTopRated.length>0 && tvTopRated.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <Pagination 
                                count={tvTopRatedTotalPages} 
                                color="secondary" 
                                page={page} 
                                onChange={handleChange} 
                                siblingCount={1}
                                size='small'
                            />
                        </div>
                    </div>
                </>
            }
            
            

        </div>
    )
}

export default TVTopRated




