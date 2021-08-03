import React, { Component } from "react";
import {axiosInstance} from "../axiosApi";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "", 
            password: "", 
            errors: false,
            loginsucess: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        axiosInstance.post('/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            }).then(
                result => {
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
                    this.setState({loginsucess:true});
                }
        ).catch (error => {
            this.setState({errors:true});
            this.setState({loginsucess:false});
            throw error;
        })
    }

    render() {
        if (this.state.errors){
            alert("login fail please try again!");
            this.setState({errors:false});
        }
        if (this.state.loginsucess){
            alert("login successfully!")
            this.setState({loginsucess:false});
            localStorage.setItem('username', this.state.username);
            // redirect to map page.
        }
        
        return (
            <div>
                Login
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
export default Login;