import React, { useState } from 'react'
import styles from './Register.module.css'
import { ErrorMessage, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

 const Register =() => {
 let navigate = useNavigate ()
const [errorMessage,setErrorMessage] =useState ("")
const [isLoading,setIsLoading] =useState (false)

 async function callRegister(getBody){
  setErrorMessage ("")
  setIsLoading (true)
  let {data} = await axios.post (`https://ecommerce.routemisr.com/api/v1/auth/signup`,getBody)
  .catch (err => {
    setIsLoading (false)
    setErrorMessage (err.response.data.message)
  })
    
   console.log(getBody)
  if (data.message == "success"){
    navigate ('/login')
  }
  }
const validationSchema = Yup.object ({
  name: Yup.string().min(3,"name is too short").required("type your name"),
  email: Yup.string().email('email not found').required('enter your mail'),
  password: Yup.string().required("pass is requierd"),
  rePassword:  Yup.string().oneOf([Yup.ref('password')],"pass and repass should mtch").required("pass is requierd"),
  phone:  Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone number").required("phone num is requierd"),
});
  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: callRegister
  })
  return (
    <>
     <Helmet>
                <title>Register</title>
            </Helmet>
      <div className="w-50 mx-auto my-3 mb-2">
        {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> :null}
        <h2>register now :</h2>
        <form onSubmit={registerForm.handleSubmit}>
          <div className="form-group py-1">
            <label htmlFor="FullName"> Full Name </label>
            <input onBlur={registerForm.handleBlur} type="text" id='FullName' name='name' className='form-control' value={registerForm.values.name} onChange={registerForm.handleChange} /> 
            {registerForm.errors.name && registerForm.touched.name? ( <div className="alert alert-danger">{" "} {registerForm.errors.name}</div>  ): null}
         
          </div>
          <div className="form-group py-1">
            <label htmlFor="Email"> Email </label>
            <input onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} type="email" id='Email' name='email' className='form-control' value={registerForm.values.email} />
            {registerForm.errors.email && registerForm.touched.email? ( <div className="alert alert-danger">{" "} {registerForm.errors.email}</div>  ): null}
         
          </div>
          <div className="form-group py-1">
            <label htmlFor="password"> Password </label>
            <input onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} type="password" id='password' name='password' className='form-control' value={registerForm.values.password} />
            {registerForm.errors.password && registerForm.touched.password? ( <div className="alert alert-danger">{" "} {registerForm.errors.password}</div>  ): null}

          </div>
          <div className="form-group py-1">
            <label htmlFor="rePassword"> rePassword </label>
            <input onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} type="password" id='rePassword' name='rePassword' className='form-control' value={registerForm.values.rePassword} />
            {registerForm.errors.rePassword && registerForm.touched.rePassword? ( <div className="alert alert-danger">{" "} {registerForm.errors.rePassword}</div>  ): null}

          </div>
          <div className="form-group py-1">
            <label htmlFor="phone"> phone </label>
            <input onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} type="tel" id='phone' name='phone' className='form-control' value={registerForm.values.phone} />
            {registerForm.errors.phone && registerForm.touched.phone? ( <div className="alert alert-danger">{" "} {registerForm.errors.phone}</div>  ): null}

          </div>
          <button className='bg-info text-white d-block ms-auto btn mb-5' disabled ={!(registerForm.isValid && registerForm.dirty)}> 
          {isLoading ?  <i className='fa fa-spinner fa-spin'></i>:'Register'}  </button>
        </form>
      </div>
    </>
  )
};


export default Register
