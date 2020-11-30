import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <span className="footer_text">
                Designed by 
                <a href={"https://github.com/muga-mark"} 
                        target="_blank" 
                        className="footer_text"
                        rel="noopener noreferrer" 
                >
                    Mark Muga
                </a>  
            </span>
           
        </div>
    )
}

export default Footer
