import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Hello from "./hello";
import {axiosInstance} from "../axiosApi";
import { useState, useEffect } from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import MainMaps from "./Map";
import Navbar from './Navbar'


function App () {
    
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
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



        return (
            <Router>
            <div className="site">
                <nav>
                    <Link className={"nav-link"} to={"/"}>Home</Link>
                    <Link className={"nav-link"} to={"/login/"}>Login</Link>
                    <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                    <Link className={"nav-link"} to={"/hello/"}>Hello</Link>
                    <Link className={"nav-link"} to={"/map/"}>Map</Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
                <main>

                    
                        <Route exact path={"/login/"} component={Login}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                        <Route exact path={"/hello/"} component={Hello}/>
                        <Route path={"/"} render={() => <div>Home again</div>}/>
                        <Route exact path='/map/' render={(props) => (<>Here<MainMaps stopData={stopData}/><Navbar stopData={stopData}/></>)}/>
                    
                </main>
            </div>
            </Router>
        );
    }


export default App;
