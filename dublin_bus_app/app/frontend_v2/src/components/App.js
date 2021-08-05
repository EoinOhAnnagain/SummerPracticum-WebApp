import React, { Component, useContext} from "react";
import { useState, useEffect } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router} from 'react-router-dom'
import {axiosInstance} from "../axiosApi";

import Login from "./login";
// import LogIn from "./SignIn_f";
import Signup from "./signup";
// import Signup from "./Signup_f";
import Hello from "./hello";
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
    const [username, setUsername] = useState("");
    const currentUser  = useContext(AuthContext);

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
                alert(localStorage.getItem('email') + ", you are already log out!");
            }else{
                alert("Don't touch the button!");
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
                    <nav>
                        <Link className={"nav-link"} to={"/"}>Home</Link>
                        <Link className={"nav-link"} to={"/login/"}>Login</Link>
                        <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                        <Link className={"nav-link"} to={"/hello/"}>Hello</Link>
                        <Link className={"nav-link"} to={"/map/"}>Map</Link>
                        <Link className={"nav-link"} to={"/webChat/"}>Community Chat</Link>
                        <button onClick={handleLogout}>Logout</button>
                        {/* <button onClick={() => firebaseConfig.auth().signOut()}>Logout</button> */}
                    </nav>
                
                    <main>
                        <Switch>
                            <Route exact path={"/login/"} component={Login}/>
                            <Route exact path={"/signup/"} component={Signup}/>
                            <Route exact path={"/hello/"} component={Hello}/>
                            <Route path={"/"} render={() => <div>Home again</div>}/>
                        </Switch>
                            <Route exact path='/map/' render={(props) => (<><MainMaps stopData={stopData}/><Navbar stopData={stopData}/></>)}/>
                            <Route exact path={"/webChat/"} render={(props) => (<WebChat user={null} db={db}/>)}/>
                    </main>
                </div>
                </div>
                </Router>
            </AuthProvider>
        );
    }


export default App;
