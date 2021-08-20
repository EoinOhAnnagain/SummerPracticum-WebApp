import React, {useState, useContext} from "react";
import { useForm } from 'react-hook-form';
import { Redirect } from "react-router-dom";

import {axiosInstance} from "../axiosApi";
import firebaseConfig from "../config.js";
import { AuthContext } from "./Auth";

const SignupForm = () => {
    const {currentUser}  = useContext(AuthContext);
    if(currentUser && localStorage.getItem('email')){
        alert("Hi," +localStorage.getItem('email')+ " please log out first before signup another account.");
        return <Redirect to="/" />;
      }

  const [signsuccess, setSignsuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  
  const onSubmit = async (data) => {
    const { email, password } = data;

        try {
            const response = await axiosInstance.post('/user/create/', {
                email: email,
                password: password
            });
            firebaseConfig.auth().createUserWithEmailAndPassword(email, password);      
            setSignsuccess(true);
            reset();
            return response;
        } catch (error) {
            alert("Signup unsuccessful! Please make sure you are using an email address that hasn't been used before.");
            console.log(error);
        }
  };

  if(signsuccess){
    alert("Signup successful! Please verify your account via the email we are sending to you now, and then log in");
    // redirect to login
    return <Redirect to="/login/" />;
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
                  <h2> Signup </h2>
                    <input
                      type='email'
                      name='email'
                      defaultValue={localStorage.getItem('email')? localStorage.getItem('email') : '' }
                      {...register('email', {
                        required: true,
                        pattern:{
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ,
                            message: "Please use valid email address for signup."
                        } 
                      })}
                      className='form-control formInput'
                      placeholder= 'Email address'
                    ></input>
                    {errors.email && (
                      <small className='text-danger'>{errors.email.message}</small>
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
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        },
                        pattern:{
                            value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]*$/,
                            message: "Password contains invalid characters, like: , () <> [] ..."
                        } 
                      })}
                      className='form-control formInput'
                      placeholder= 'Password (at least 8 characters)'
                    ></input>
                    {errors.password && (
                      <small className='text-danger'>{errors.password.message}</small>
                    )}
                  </div>
                </div>
                <button className='btn' type='submit'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;