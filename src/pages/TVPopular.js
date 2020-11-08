import React, { useEffect, useState } from 'react';
import { API_KEY, MOVIE_SEARCH_API } from '../api';
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

function TVPopular() {
    const [page, setPage] = useState(1);
    const [ tvPopular, setTVPopular ] = useState([]);
    const [ tvPopularLoading, setTVPopularLoading ] = useState(true);
    const [ tvPopularTotalPages, setTVPopularTotalPages ] = useState(0);
    
    const classes = useStyles();
    const [ sortBy, setSortBy ] = useState("popularity.desc");

    const TV_POPULAR_API = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&vote_count.gte=250`;

    const handleChange = (event, value) => {
      setPage(value);
    //   console.log("NEXT PAGE", page);
    };

    const sortHandleChange = (event) => {
        setSortBy(event.target.value);
        setPage(1);
    };

    useEffect(() => {
        fetch(TV_POPULAR_API)
        .then(res => res.json())
        .then(data => {
        //   console.log("popular movies", data);
          setTVPopular(data.results);
          setTVPopularLoading(false);
          setTVPopularTotalPages(data.total_pages);
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
    }, [TV_POPULAR_API]);

    return (
        <div className="page">
            {tvPopularLoading?
                <div className="page__spinner">
                    <SpinnerContentCustom loading={tvPopularLoading} />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>Popular TV Shows</span>
                        </div>

                        <div className="page__filter">
                        <FormControl className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sortBy}
                                    onChange={sortHandleChange}
                                >
                                    <MenuItem  value={"popularity.desc"}>
                                        <div className="menuItem"> Popularity <ArrowDownwardIcon/> </div>
                                    </MenuItem>
                                    <MenuItem  value={"popularity.asc"}>
                                        <div className="menuItem"> Popularity <ArrowUpwardIcon/> </div>
                                    </MenuItem >
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
                            {tvPopular.length>0 && tvPopular.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    <CardTV key={result.id} {...result} />
                                </div>
                            ))}
                        </div>

                        <div className="page__content page__content_pagination">
                            <Pagination 
                                count={tvPopularTotalPages} 
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

export default TVPopular



