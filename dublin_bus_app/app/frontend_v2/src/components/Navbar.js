import React, {useState} from 'react'
import * as FaIcons from "react-icons/fa"
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
        <div>
            <Button text="Toggle Journey Selector" className="btn" onClick={showSidebar}/>
        </div>
        <nav className = {sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                    <Link to='#' className =  'menu-bars'>
                        <AiIcons.AiOutlineClose onClick={showSidebar}/>
                    </Link>
                    <SidebarInputFields stopData={stopData}/>
                </li>
                    
                
            </ul>
        </nav>
        </>
    )
}

export default Navbar
