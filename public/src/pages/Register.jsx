import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Logo from '../pages/assets/logo.png'
import {ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios' ;
import { registerroute } from '../addons/APIroutes';
function Register() {
  const navigate = useNavigate 
  const [values,setValues] =useState({
    username: "",
    email: "" ,
    password:"",
    confirmPassword:"",
  })
 const decoration = 
  {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      
    }
 
  const handlesubmit= async (event) => {
    event.preventDefault(); 
    if(handleValidation()) {
      const{password,username,email} =values ;
      const {data} = axios.post(registerroute ,{
        username,
        email,
        password,
      })   ;
      if(data.trfl===false) { 
        toast.error(data.msg, decoration)
      }
      if(data.trfl===true) {
        localStorage.setItem('test-users',JSON.stringify(data.user))
     }
      navigate("/");
    }
  }
 const handleValidation =() => {
  const{password,confirmPassword,username,email} =values ;

  if(password!==confirmPassword) {
    toast.error("mismatching password and confirm password",
    decoration
    ) ;
    return false;

  } 
  else if(username.length<3) {
    toast.error("Username must be greater than 3 charecter",decoration)
    return false;
  }
  else if(password.length < 8){
    toast.error("password should be greater than 8 chars ",decoration)
    return false;
  } else if(email==="") 
  {
    toast.error("email cannot be empty")
  }
  return true; 
 }

  const handlechange =(event) => {
     setValues({...values,[event.target.name]:event.target.value})
  }
  return (
    <>
     
    <FormContainer>
    
      <form onSubmit={(event)=>handlesubmit(event)}>
        <div className="brand">
          <img src={Logo} alt='logo' />
          <h1>Chattify</h1>
        </div>
          <input type='text' 
        placeholder='Username' 
        name='username' 
        onChange={(e) => handlechange(e)}/> 

        <input type='email' 
        placeholder='email' 
        name='email' 
        onChange={(e) => handlechange(e)}/> 

        <input type='password' 
        placeholder='password' 
        name='password' 
        onChange={(e) => handlechange(e)}/> 

        <input type='password' 
        placeholder='confirmPassword' 
        name='confirmPassword' 
        onChange={(e) => handlechange(e)}/> 
             
        <button type='submit'>Create User</button>
        <span>Already have an account ? <Link to="/login">Login</Link></span>
        </form>
    </FormContainer>
    <ToastContainer/>
    
  </>
  )
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #848091 ;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #385162;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid grey;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #848091;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #848091;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register