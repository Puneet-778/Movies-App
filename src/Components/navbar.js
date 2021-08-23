import React from 'react';
import './nav.css'
import { Link } from 'react-router-dom';

export default function Nav(){
    return(
        <nav className="nav-class">
            <h1>Logo</h1>
            <ul className="list">
                <Link to="/"><li className="li">Home</li></Link>
                <Link to="/about"><li className="li">About</li></Link>
                <Link to="/movies"><li className="li">Movies</li></Link>    
            </ul>
        </nav>
    );
}