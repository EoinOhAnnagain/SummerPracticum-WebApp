import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Hello from "./hello";
import {axiosInstance} from "../axiosApi";
import Welcome from "./Welcome";

class App extends Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            logout: false,
            username: ""
        };
    }

    async handleLogout() {
        try {
            const response = await axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            this.setState({logout:true});
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };

    render() {
        if (this.state.logout){
            alert("you are already log out!");
            this.setState({username: localStorage.getItem('username')});
            localStorage.removeItem('username');
            this.setState({logout:false});
            // redirect to login page.
        }
        
        return (
            <div className="site">
                <nav>
                    <Link className={"nav-link"} to={"/"}>Home</Link>
                    <Link className={"nav-link"} to={"/login/"}>Login</Link>
                    <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                    <Link className={"nav-link"} to={"/hello/"}>Hello</Link>
                    {/* if login show logout button */}
                    <button onClick={this.handleLogout}>Logout</button>
                </nav>
                {/* <Welcome name = {this.state.username}/>*/}
                <main>
                    <Switch>
                        <Route exact path={"/login/"} component={Login}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                        <Route exact path={"/hello/"} component={Hello}/>
                        <Route path={"/"} render={() => <div>Home again</div>}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
