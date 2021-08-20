import React from 'react'
import * as AiIcons from "react-icons/ai";
import logoLetters from "../assets/logoLetters.png"

// Simple landing page
const Home = () => {
    
    return (
        <div>
            <div className="container" style={{backgroundColor:"black", color:"white"}}>
                <div className="homeStyle">
                    <div><img src={logoLetters} style={{width:"100%"}}/></div>
                    <div><h2>Connect With Your City</h2></div><br/>
                    <div><h1 style={{color:"#ffcf31"}}>Don't Bus Alone</h1></div><br/>
                    <div><h4>Contact us to get access to our Github and download our iOS app <AiIcons.AiFillApple/></h4></div>
                </div>
            </div>
        </div>
    )
}

export default Home
