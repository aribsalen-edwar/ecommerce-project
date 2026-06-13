import React, { useContext, useState } from 'react'
import * as Yup from 'yup'

import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useFormik } from 'formik'
import Register from '../Register/Register'
import { TokenContext } from '../../Context/Token'
import { Helmet } from 'react-helmet'


export default function Login() {
  let navigate = useNavigate ()
  const [errorMessage,setErrorMessage] =useState ("")
  const [isLoading,setIsLoading] =useState (false)
  let {setToken} = useContext(TokenContext)
  

   async function callLogin(getBody){
    setErrorMessage ("")
    setIsLoading (true)
    let {data} = await axios.post (`https://ecommerce.routemisr.com/api/v1/auth/signin`,getBody)
    .catch (err => {
      setIsLoading (false)
      setErrorMessage (err.response.data.message)
    })
      
     console.log(getBody)
    if (data.message == "success"){
      localStorage.setItem("userToken",data.token)
      setToken(data.token)
      navigate ('/home')
    }
    }
  const validationSchema = Yup.object ({
    email: Yup.string().email('email not found').required('enter your mail'),
    password: Yup.string().required("pass is requierd"),
  });
    const loginForm = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: callLogin
    })
    return (
      <>
       <Helmet>
                <title>Login</title>
            </Helmet>
        <div className="w-50 mx-auto my-3 mb-2">
          {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> :null}
          <h2>Login now :</h2>
          <form onSubmit={loginForm.handleSubmit}>
         
              <label htmlFor="Email"> Email </label>
              <input onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} type="email" id='Email' name='email' className='form-control' value={loginForm.values.email} />
              {loginForm.errors.email && loginForm.touched.email? ( <div className="alert alert-danger">{" "} {loginForm.errors.email}</div>  ): null}
           
              <label htmlFor="password"> Password </label>
              <input onBlur={loginForm.handleBlur} onChange={loginForm.handleChange} type="password" id='password' name='password' className='form-control' value={loginForm.values.password} />
              {loginForm.errors.password && loginForm.touched.password? ( <div className="alert alert-danger">{" "} {loginForm.errors.password}</div>  ): null}
  
      
            <button className='bg-info text-white d-block ms-auto btn mb-5' disabled ={!(loginForm.isValid && loginForm.dirty)}> 
            {isLoading ?  <i className='fa fa-spinner fa-spin'></i>:'Login'}  </button>
          </form>
        </div>
      </>
    )
}
