import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Hello from "./hello";
import {axiosInstance} from "../axiosApi";
import Welcome from "./Welcome";

import { useState, useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import MainMaps from "./Map";
import Navbar from './Navbar'

import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
import WebChat from "./WebChat"

firebase.initializeApp({
    apiKey: "AIzaSyBUubTNjY772TYe-SMwYfOut7oUMZS53mc",
    authDomain: "bda-2021.firebaseapp.com",
    projectId: "bda-2021",
    storageBucket: "bda-2021.appspot.com",
    messagingSenderId: "930954973669",
    appId: "1:930954973669:web:f2da910008a701469a1f0c",
});

const db = firebase.firestore();

function App () {
    
    const [logout, setLogout] = useState(false);
    const [username, setUsername] = useState("");
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            setLogout(true);
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };
   
    
const [stopData, setStopData] = useState([])

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

console.log(stopData, "hopefully all went okay...")



        // if (logout){
        //     alert("you are already log out!");
        //     setUsername(localStorage.getItem('username'));
        //     localStorage.removeItem('username');
        //     setLogout(false);
        // }

        return (
            <Router>
            <div className="container">
            <div className="site">
                <nav>
                    <Link className={"nav-link"} to={"/"}>Home</Link>
                    <Link className={"nav-link"} to={"/login/"}>Login</Link>
                    <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                    <Link className={"nav-link"} to={"/hello/"}>Hello</Link>
                    <Link className={"nav-link"} to={"/map/"}>Map</Link>
                    <Link className={"nav-link"} to={"/webChat/"}>Community Chat</Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
                {/* <Welcome name = {this.state.username}/>*/}
                <main>
                        <Route exact path={"/login/"} component={Login}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                        <Route exact path={"/hello/"} component={Hello}/>
                        <Route path={"/"} render={() => <div>Home again</div>}/>
                        <Route exact path='/map/' render={(props) => (<><MainMaps stopData={stopData}/><Navbar stopData={stopData}/></>)}/>
                        <Route exact path={"/webChat/"} render={(props) => (<WebChat user={null} db={db}/>)}/>
                    
                </main>
            </div>
            </div>
            </Router>
        );
    }


export default App;
