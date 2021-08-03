import React, { Component} from "react";
import { useState, useEffect } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router} from 'react-router-dom'
import Login from "./login";
import Signup from "./signup";
import Hello from "./hello";
import {axiosInstance} from "../axiosApi";

function App(){
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
    }

    if (logout){
        alert("you are already log out!");
        setUsername(localStorage.getItem('username'));
        localStorage.removeItem('username');
        setLogout(false);
    }

    return (
        <Router>
        <div className="container">
        <div className="site">
            <nav>
                <Link className={"nav-link"} to={"/"}>Home</Link>
                <Link className={"nav-link"} to={"/login/"}>Login</Link>
                <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                <Link className={"nav-link"} to={"/hello/"}>Hello</Link>
                {/* <Link className={"nav-link"} to={"/map/"}>Map</Link> */}
                <button onClick={handleLogout}>Logout</button>
            </nav>
            
            <main>
                <Switch>
                    <Route exact path={"/login/"} component={Login}/>
                    <Route exact path={"/signup/"} component={Signup}/>
                    <Route exact path={"/hello/"} component={Hello}/>
                    <Route path={"/"} render={() => <div>Home again</div>}/>
                    {/* <Route exact path='/map/' render={(props) => (<><MainMaps stopData={stopData}/><Navbar stopData={stopData}/></>)}/> */}
                </Switch>
            </main>
        </div>
        </div>
        </Router>
    );
}

export default App;
