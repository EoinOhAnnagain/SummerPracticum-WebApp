import React, { Component, useContext} from "react";
import { useState, useEffect } from 'react';
import { Route, Link } from "react-router-dom";
import { BrowserRouter as Router} from 'react-router-dom'


import LoginForm from "./Login_v2";
import SignupForm from "./Signup_v2";
import handleLogout from "./Logout";
import AuthButton from "./AuthBtn";

import ContactForm from "./Contact";
import Weather from "./Weather";
import About from "./About"
import Home from "./Home"
import Footer from "./Footer"

import MainMaps from "./Map";
import Navbar from './Navbar';

import "firebase/firestore";
import WebChat from "./WebChat"

import { AuthProvider} from "./Auth";
import firebaseConfig from "../config";

import * as AiIcons from "react-icons/ai"
import * as ImIcons from "react-icons/im"
import * as MdIcons from "react-icons/md"
import * as TiIcons from "react-icons/ti"

import { useSelector, useDispatch } from 'react-redux';
import { setShowAllStopsBoolean } from "../redux/showAllStopsBool";
import { setDirectionsRenderBoolean } from "../redux/directionsRenderBool";

const db = firebaseConfig.firestore();

function App(){
    
    const [logout, setLogout] = useState(false);
    const [stopData, setStopData] = useState([]);
    const [routeData, setRouteData] = useState([]);

    useEffect(()=> {
    const fetchStops = async () => {
        const res = await fetch(`http://localhost:8000/core/stops`)
        const data = await res.json()
        setStopData(data)
        console.log("stop data", data)
        return data
    }
    fetchStops()
    }, [])

    useEffect(()=> {
        const fetchRoutes = async () => {
        const res = await fetch(`http://localhost:8000/core/routes`)
        const data = await res.json()
        setRouteData(data)
        console.log("route data", data)
        return data
        }
        fetchRoutes()
    }, [])


    console.log(stopData, "hopefully all went okay...")

            return (
                <AuthProvider>
                    <Router>
                    <div className="site">
                        <header>
                        <div className="nav">
                            <nav>
                                <ul>
                                    <li><Link className={"nav-link"} to={"/"}><AiIcons.AiOutlineHome/></Link></li>
                                    <li><Link className={"nav-link"} to={"/weather/"}><TiIcons.TiWeatherPartlySunny/></Link></li>
                                    <li><Link className={"nav-link"} to={"/map/"}><MdIcons.MdDirectionsBus/></Link></li>
                                    <li><Link className={"nav-link"} to={"/webChat/"}><ImIcons.ImBubbles/></Link></li>
                                </ul>
                                <div className="dropdown-container">
                                <AiIcons.AiOutlineUser/> 
                                    <div className="dropdown-body">
                                        <AuthButton/>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        </header>
                        <main>
                                <Route exact path={"/login/"} component={LoginForm}/>
                                <Route exact path={"/signup/"} component={SignupForm}/>
                                <Route exact path={"/logout/"} component={handleLogout}/>
                                <Route exact path={"/weather/"} component={Weather}/>
                                <Route exact path={"/contact/"} component={ContactForm}/>
                                <Route exact path={"/"} component = {Home}/>
                                <Route exact path={'/map/'} render={(props) => (<><Navbar stopData={stopData}/><MainMaps stopData={stopData}/></>)}/>
                                <Route exact path={"/webChat/"} render={(props) => (<WebChat user={null} db={db} routeData={routeData}/>)}/>
                                <Route exact path={"/about/"} render={() => (<About/>)}/>
                        </main>
                        <Footer/>
                    </div>
                    </Router>
                </AuthProvider>
            );
        }

export default App;
