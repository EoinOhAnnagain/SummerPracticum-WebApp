import React, {useState} from 'react'
import * as AiIcons from "react-icons/ai"
import { Link } from 'react-router-dom'
import SidebarInputFields from './SidebarInputFields'
import './Navbar.css'
import Button from "./Button"

const Navbar = ({stopData}) => {
    const[sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
    return (
        <>
        <div className="toggleContainer">
            <Button text="Toggle Journey Selector" className="btn" onClick={showSidebar}/>
        </div>
        <div className = {sidebar ? 'nav-menu active' : 'nav-menu'}>
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
