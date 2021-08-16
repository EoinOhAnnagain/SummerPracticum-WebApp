import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <p>Copyright 4TheWin 2021</p>
            <Link to="/contact">Contact Us</Link> <br/>
            <Link to='/about'>About</Link>
        </footer>
    )
}

export default Footer
