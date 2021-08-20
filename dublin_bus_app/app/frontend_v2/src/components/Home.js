import React from 'react'
import * as AiIcons from "react-icons/ai";
import logoLetters from "../assets/logoLetters.png"

const Home = () => {
    
    return (
        <div>
            <div className="container" style={{backgroundColor:"black", color:"white"}}>
                <div className="homeStyle">
                    <div><img src={logoLetters} style={{width:"100%"}}/></div>
                    <div><h2>Connect With Your City</h2></div><br/>
                    <div><h1 style={{color:"#ffcf31"}}>Don't Bus Alone</h1></div><br/>
                    <div><h4>Follow the instructions on our Github to download our iOS app <AiIcons.AiFillApple/></h4></div>
                </div>
            </div>
        </div>
    )
}

export default Home
