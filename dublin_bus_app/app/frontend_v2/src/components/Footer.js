import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <p>Copyright 4TheWin 2021</p>
            <div className="nav">
                <div><Link to="/contact">Contact Us</Link></div>
            </div>
            <div className="nav">
            <div><Link to='/about'>About</Link></div>
            </div>
        </footer>
    )
}

export default Footer
