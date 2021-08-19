import React, {useState} from 'react'
import * as AiIcons from "react-icons/ai"
import { Link } from 'react-router-dom'
import SidebarInputFields from './SidebarInputFields'
import Weather from './Weather'
import './Navbar.css'
import Button from "./Button"
import * as TiIcons from "react-icons/ti"

const Navbar = ({stopData}) => {
    const[sidebar, setSidebar] = useState(false);
    const [weatherVisible, setWeatherVisible] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
            <div className="weatherButton">
            <div className="weatherButton">
                <button className="btn" onClick={()=>setWeatherVisible(!weatherVisible)} title="Show Weather Info">{weatherVisible ? "Hide Weather Info" : "Show Weather Info"}</button>
            </div>
            </div>
        {weatherVisible && (<div className="toggleContainer">
             <><button title="See Today's Weather" className="btn"  onClick={showSidebar}><TiIcons.TiWeatherPartlySunny/></button>
            <p>Our journey planner uses weather data to predict your journey length</p>
            <p>As we avail of a 14-day forecast, we can judge your journey length with high accuracy within that time</p></>
        </div>)}
        <div className = {(weatherVisible && sidebar) ? 'nav-menu-r active' : 'nav-menu-r'}>
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
