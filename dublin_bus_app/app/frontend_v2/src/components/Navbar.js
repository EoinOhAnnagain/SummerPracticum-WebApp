import React, {useState} from 'react'
import * as AiIcons from "react-icons/ai"
import { Link } from 'react-router-dom'
import SidebarInputFields from './SidebarInputFields'
import Weather from './Weather'
import './Navbar.css'
import Button from "./Button"
import * as TiIcons from "react-icons/ti"

const Navbar = ({stopData}) => {
    const[sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
        <div className="toggleContainer">
            <button className="btn"  onClick={showSidebar}><TiIcons.TiWeatherPartlySunny/></button>
            <p>Our journey planner uses weather data to predict your journey length</p>
        </div>
        <div className = {sidebar ? 'nav-menu-r active' : 'nav-menu-r'}>
            <div className="nav-menu-items">
                <div className="navbar-toggle">
                    <Weather/>
                </div>
            </div>
        </div>
        <div className = {'nav-menu-l active'}>
            <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                    <SidebarInputFields stopData={stopData}/>
                </li>
                    

            </ul>
            </div>
        </>
    )
}

export default Navbar
