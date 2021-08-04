import React, { Component, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {axiosInstance} from "../axiosApi";
import Welcome from "./Welcome";

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(false);
    const [loginsucess, setLoginsucess] = useState(false);
    const [test, settest] = useState(false);

    const handleChange = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
      };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post('/token/obtain/', {
                email: email,
                password: password
            }).then(
                result => {
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
                    setLoginsucess(true);
                    setPassword("");

                }
        ).catch (error => {
            setErrors(true);
            setLoginsucess(false);
            throw error;
        })  
    };

    useEffect(()=> {
        if (errors){
            alert("login fail please try again!");
            setErrors(false);
        }
    }
    );

    if (loginsucess){
        alert("login successfully!")
        // setLoginsucess(false);
        localStorage.setItem('email', email);
        // redirect to map page.
        return <Redirect to="/hello" />;
    }

    return (
        <div >
            Login
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input name="email" type="text" value={email} placeholder="E.g: abc123@gmail.com"
                    onChange={handleChange}/>
                </label>
                <label>
                    Password:
                    <input name="password" type="password" value={password} placeholder="E.g: abcd1234"
                    onChange={handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Login;