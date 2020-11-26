import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/sndb-icon-2.png';
import './Header.css';


function Header() {
    return (
        <div className="header">
            <Link to='/'>
                <img 
                    src={logo} 
                    alt="logo" 
                    className="logo"
                />
            </Link>
            {/* <input className="search" type="search" placeholder="Search..." /> */}
        </div>
    )
}

export default Header
