import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { Redirect, Link } from "react-router-dom";

import {axiosInstance} from "../axiosApi";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";

const LoginForm = () => {
  const [loginsucess, setLoginsucess] = useState(false);
  const {currentUser}  = useContext(AuthContext);
  
  if(currentUser && localStorage.getItem('email')){
    alert("You are already logged in, welcome back" +localStorage.getItem('email'));
    return <Redirect to="/" />;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  
  const onSubmit = async (data) => {
    const { email, password } = data;

    axiosInstance.post('/token/obtain/', {
        email: email,
        password: password
    }).then(
        result => {
            firebaseConfig.auth().signInWithEmailAndPassword(email, password);
            axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
            localStorage.setItem('access_token', result.data.access);
            localStorage.setItem('refresh_token', result.data.refresh);
            localStorage.setItem('email', email);
            setLoginsucess(true);
            reset();
        }
    ).catch (error => {
        alert("Woops, login has failed. This sometimes happens when our server is overloaded. Please wait a moment and try again!");
        setLoginsucess(false);
        throw error;
    }); 
  };

  if (loginsucess){
    return <Redirect to="/" />;
  }

  return (
    <div className='ContactForm'>
      <div className='container'>
        <div className='row1'>
          <div className='col-12 text-center1'>
            <div className='contactForm'>
              <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Row 1 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <h2> Login </h2>
                    <input
                      type='email'
                      name='email'
                      defaultValue={localStorage.getItem('email')? localStorage.getItem('email') : '' }
                      {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                      })}
                      className='form-control formInput'
                      placeholder= 'Email address'
                    ></input>
                    {errors.email && (
                      <small className='text-danger'>Please enter a valid email address</small>
                    )}
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow'>
                  <div className='col'>
                  <input
                      type='password'
                      name='password'
                      {...register('password', {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*$/
                      })}
                      className='form-control formInput'
                      placeholder= 'Password'
                    ></input>
                    {errors.password && (
                      <small className='text-danger'>Please enter a valid password</small>
                    )}
                  </div>
                </div>
                <button className='btn' type='submit'>
                  Submit
                </button>
              </form>
              <div className="signup-in-login">Not signed up yet? <Link className={"nav-link"} to={"/signup/"}>Signup here</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;