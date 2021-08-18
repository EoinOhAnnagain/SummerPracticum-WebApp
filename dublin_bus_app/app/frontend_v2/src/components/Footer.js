import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <div className="footerInfo">
                <div><p>Copyright 4TheWin 2021</p></div>
                    <div><Link to="/contact">Contact Us</Link></div>
                    <div><Link to='/about'>About</Link></div>
            </div>
        </footer>
    )
}

export default Footer
