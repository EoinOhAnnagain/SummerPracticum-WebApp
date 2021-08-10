import React, { Component, useContext} from "react";
import { useState, useEffect } from 'react';
import { Switch, Route, Link ,Redirect} from "react-router-dom";
import { BrowserRouter as Router} from 'react-router-dom'
import {axiosInstance} from "../axiosApi";

// import Login from "./login";
import LoginForm from "./Login_v2";

import Signup from "./signup";


import Hello from "./hello";
import ContactForm from "./Contact";

import About from "./About"

import Welcome from "./Welcome";
import MainMaps from "./Map";
import Navbar from './Navbar';

import "firebase/firestore";
import WebChat from "./WebChat"

import { AuthProvider} from "./Auth";
import firebaseConfig from "../config";
import { AuthContext } from "./Auth";

const db = firebaseConfig.firestore();


function App(){
    
    const [logout, setLogout] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            setLogout(true);
            firebaseConfig.auth().signOut();
            return response;
            // return <Redirect to="/" />;
        }
        catch (e) {
            console.log(e);
        }
    };
   
    
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


    useEffect(()=> {
    const fetchStops = async () => {
        const res = await fetch(`http://localhost:8000/core/stops`)
        const data = await res.json()
        setStopData(data)
        console.log("stop data", data)
        return data
    }
    fetchStops()
    }, []);

    useEffect(() => {
        if (logout){
            if (localStorage.getItem('email')){
                alert(localStorage.getItem('email') + ", you are already log out");
            }else{
                alert("You are not login yet");
            }
            localStorage.removeItem('email');
            setLogout(false);
        }
    });

        return (
            <AuthProvider>
                <Router>
                <div className="container">
                <div className="site">
                    <header>
                        <nav>
                            <ul className={"mainNav"}>
                                <li><Link className={"nav-link"} to={"/"}>Home</Link></li>
                                <li><Link className={"nav-link"} to={"/login/"}>Login</Link></li>
                                <li><Link className={"nav-link"} to={"/signup/"}>Signup</Link></li>
                                <li><Link className={"nav-link"} to={"/hello/"}>Hello</Link></li>
                                <li><Link className={"nav-link"} to={"/map/"}>Map</Link></li>
                                <li><Link className={"nav-link"} to={"/webChat/"}>Community Chat</Link></li>
                                <li><Link className={"nav-link"} to={"/contact/"}>Contact</Link></li>
                                <li><Link className={"nav-link"} to={"/about/"}>About</Link></li>
                                <button onClick={handleLogout}>Logout</button>
                            </ul>
                        </nav>
                    </header>
                
                    <main>
                        <Switch>
                            <Route exact path={"/login/"} component={LoginForm}/>
                            <Route exact path={"/signup/"} component={Signup}/>
                            <Route exact path={"/hello/"} component={Hello}/>
                            <Route exact path={"/contact/"} component={ContactForm}/>
                            <Route exact path={"/"} render={() => <div>Home again</div>}/>
                        </Switch>
                            <Route exact path='/map/' render={(props) => (<><Navbar stopData={stopData}/><MainMaps stopData={stopData}/></>)}/>
                            <Route exact path={"/webChat/"} render={(props) => (<WebChat user={null} db={db} routeData={routeData}/>)}/>
                            <Route exact path={"/about/"} render={() => (<About/>)}/>
                    </main>
                </div>
                </div>
                </Router>
            </AuthProvider>
        );
    }


export default App;
