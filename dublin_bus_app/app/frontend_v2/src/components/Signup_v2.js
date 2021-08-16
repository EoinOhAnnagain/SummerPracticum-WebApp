import React, { useEffect, useState, useContext } from "react";
import { useForm } from 'react-hook-form';
import { Redirect } from "react-router-dom";

import {axiosInstance} from "../axiosApi";
import firebaseConfig from "../config.js";

const SignupForm = () => {
  
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
            alert("Signup fail!");
            console.log(error.stack);
            setErrors({
                error: error.response.data
            });
            console.log("Error: " + errors);
        }
  };

  if(signsuccess){
    alert("Signup successfully!");
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
                <button className='submit-btn' type='submit'>
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