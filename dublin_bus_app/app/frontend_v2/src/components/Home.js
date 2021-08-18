import React from 'react'
import busImage from '../assets/busImage.jpg';
import busTitle from '../assets/DontBusAlone.png';
import * as AiIcons from "react-icons/ai";

const Home = () => {
    
    return (
        <div style={{backgroundImage: `url(${busImage})`}}>
            <div className="container" style={{backgroundImage: `url(${busImage})`}}>
                <div>
                    <div><img src={busTitle}/></div>
                    <div><h2>Plan your journey, connect with community</h2></div>
                    <div><h4>Follow the instructions on our Github to download our iOS app <AiIcons.AiFillApple/></h4></div>
                </div>
            </div>
        </div>
    )
}

export default Home
