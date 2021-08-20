import React, {useState} from 'react'
import SidebarInputFields from './SidebarInputFields'
import Weather from './Weather'
import './Navbar.css'
import * as TiIcons from "react-icons/ti"

// A manager component that aligns the journey/ weather sidebars seen on our transit/ map page for desktop and mobile

const Navbar = ({stopData}) => {
    const[sidebar, setSidebar] = useState(false);
    const [weatherVisible, setWeatherVisible] = useState(false);


    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
            <div className="infoButton">
                <button className="btn" onClick={()=>setWeatherVisible(!weatherVisible)} title="Show Weather Info">{weatherVisible ? "Hide Weather Info" : "Show Weather Info"}</button>
            </div>
        {weatherVisible && (<div className="toggleContainer">
            <p>Our journey planner uses weather data to predict your journey length - see today's weather here: <button title="See Today's Weather" className="btn"  onClick={showSidebar}><TiIcons.TiWeatherPartlySunny/></button></p>
            <p>As we avail of a 14-day forecast, we can judge your journey length with high accuracy within that time</p>
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
