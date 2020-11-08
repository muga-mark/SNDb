import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/sndb-icon-2.png';
import './Header.css';


function Header() {
    return (
        <Link to='/'>
            <div className="header">
                <img 
                    src={logo} 
                    alt="logo" 
                    className="logo"
                />
            </div>
        </Link>
    )
}

export default Header
