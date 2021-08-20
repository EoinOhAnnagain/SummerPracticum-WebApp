import React, { Component, useContext} from "react";
import {axiosInstance} from "../axiosApi";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import { Redirect } from "react-router-dom";

const handleLogout = () => {
    const {currentUser}  = useContext(AuthContext);

    if (currentUser && localStorage.getItem('email')){
        try {
            // send logout request to djnago backend.
            axiosInstance.post('/blacklist/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            // remove token from cookies
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            // modify post request header
            axiosInstance.defaults.headers['Authorization'] = null;
            // signout firebase account
            firebaseConfig.auth().signOut();
            alert(localStorage.getItem('email') + ", you have logged out");
            // remove user info from cookies
            localStorage.removeItem('email');
            // redirect to home page
            return <Redirect to="/" />;
        }
        catch (e) {
            console.log(e);
            return <Redirect to="/" />;
        }
    }else{
        alert("You are not login yet");
        return <Redirect to="/login" />;
    }
}

export default handleLogout;
