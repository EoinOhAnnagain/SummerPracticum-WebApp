import React from 'react'
import busTitle from '../assets/DontBusAlone.png';
import * as AiIcons from "react-icons/ai";

const Home = () => {
    
    return (
        <div>
            <div className="container">
                <div>
                    <div><img src={busTitle}/></div>
                    <div><h2>Don't Bus Alone is an app that connects you to your community as you connect to Dublin City</h2></div>
                    <div><h4>Follow the instructions on our Github to download our iOS app <AiIcons.AiFillApple/></h4></div>
                </div>
            </div>
        </div>
    )
}

export default Home
