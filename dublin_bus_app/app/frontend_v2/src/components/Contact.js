import React from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

const serviceID = process.env.REACT_APP_SERVICE_ID;
const tempID = process.env.REACT_APP_TEMPLATE_ID;
const userID = process.env.REACT_APP_USER_ID;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  
  const onSubmit = async (data) => {
    const { email, subject, message } = data;
    try {
      const templateParams = {
        email,
        subject,
        message
      };
      await emailjs.send(
        serviceID,
        tempID,
        templateParams,
        userID
      );
      reset();
      alert("Message submitted")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='ContactForm'>
      <div className='container'>
        <p> Please leave the message and we will contact you soon.</p>
        <div className='row1'>
          <div className='col-12 text-center1'>
            <div className='contactForm'>
              <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Row 1 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <input
                      type='email'
                      name='email'
                      defaultValue={localStorage.getItem('email')? localStorage.getItem('email') : '' }
                      {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                      })}
                      className='form-control formInput'
                      placeholder= 'Email address(option)'
                    ></input>
                    {errors.email && (
                      <small className='text-danger'>Please enter a valid email address</small>
                    )}
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow'>
                  <div className='col'>
                  <select className="form-control" 
                    {...register("subject" ,{
                        required: { value: true, message: 'Please select a subject' }}
                        )}>
                    <option value="" selected disabled>Subject</option>
                    <option value="Request Feature">Request Feature</option>
                    <option value="Request Book">Request Book</option>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Bug in Weather">Bug in Weather</option>
                    <option value="Bug in Books">Bug in Books</option>
                    <option value="Bug in CodeBreaker">Bug in CodeBreaker</option>
                    <option value="Bug in Chat">Bug in Chat</option>
                    <option value="Bug in Prediction">Bug in Prediction</option>
                    <option value="Bug in Map">Bug in Map</option>
                    <option value="Bug in Login/SignUp">Bug in Login/SignUp</option>
                    <option value="Report Abuse of Chat">Report Abuse of Chat</option>
                    <option value="Others">Others</option>
                 </select>
                 {errors.subject && (
                      <small className='text-danger'>{errors.subject.message}</small>
                    )}
                  </div>
                </div>
                {/* Row 3 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <textarea
                      rows={3}
                      name='message'
                      {...register('message', {
                        required: true
                      })}
                      className='form-control formInput'
                      placeholder='Message'
                    ></textarea>
                    {errors.message && <small className='text-danger'>Please enter a message</small>}
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

export default ContactForm;