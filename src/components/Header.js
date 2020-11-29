import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';

import { SEARCH_API } from '../api/setAPI';
import { SET_SEARCH, SET_PAGE_SEARCH, SET_SEARCH_RESULT } from '../actions/setSearch';

import logo from '../image/sndb-icon-2.png';
import './Header.css';



function Header({ setSearchLoading }) {
    const history = useHistory(); 
    const [ { search, searchPage },  dispatch ] = useStateValue();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(search){
            fetch(SEARCH_API(search, searchPage))
            .then(res => res.json())
            .then(data => {
              dispatch(SET_SEARCH_RESULT(data));
              setSearchLoading(false);
              history.push(`/search/${search}/${searchPage}`);
            });
        }
    } 

    const handleOnChange = (e) => {
        e.preventDefault();
        dispatch(SET_SEARCH(e.target.value));
    }

    useEffect(() => {

        if(searchPage){
            fetch(SEARCH_API(search, searchPage))
            .then(res => res.json())
            .then(data => {
              dispatch(SET_SEARCH_RESULT(data));
              setSearchLoading(false);
            });
        }
        
        
    }, [ searchPage, dispatch, history ]);

    return (
        <div className="header">
            <div className="logo__container">
                <Link to='/'>
                    <img 
                        src={logo} 
                        alt="logo" 
                        className="logo"
                    />
                </Link>
            </div>
            <div>
                <form onSubmit={handleOnSubmit}>
                    <input 
                        className="search" 
                        type="search" 
                        placeholder="Search..." 
                        value={search}
                        onChange={handleOnChange}
                    />
                </form>
            </div>
        </div>
    )
}

export default Header
