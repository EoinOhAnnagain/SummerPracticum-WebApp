import React from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  
  const onSubmit = async (data) => {
    const { email, subject, message } = data;
    console.log('Email: ', email);
    console.log('Subject: ', subject);
    console.log('Message: ', message);
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
                        // required: true,
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
                    <option value="sub1">sub1</option>
                    <option value="sub2">sub2</option>
                    <option value="sub3">sub3</option>
                    <option value="other">other</option>
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

export default ContactForm;