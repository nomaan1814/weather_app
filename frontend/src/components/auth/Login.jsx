import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
// import MainScreen from './MainScreen';
import axios from 'axios';
import Loader from '../Loader';
import Message from '../Message';
import { Link, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { login } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/login.css';

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [email_err,setEmailErr]=useState({})
    const [pass_err,setPassErr]=useState({})
    const [errArr,setErrArr]=useState([]);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.userLogin);
    const {loading,error,userInfo}=userLogin
    const validation=()=>{
        const email_err={}
        const pass_err={}
        let isValid=true;
        if(email==""){
            email_err.required="*Required";
            isValid=false;
        }
        if(password==""){
             pass_err.required="*Required";
             isValid=false;
        }
        setEmailErr(email_err)
        setPassErr(pass_err)
        return isValid;
    }
    const submitHandler=async(e)=>{
          e.preventDefault();
          const isValid=validation();
          if(isValid){
               dispatch(login(email,password))
               navigate('/')
        }
}
   
  return (
    <>
    <div className="login">
        <h1>Login</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
    <Form onSubmit={submitHandler} className="form">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      {Object.keys(email_err).map((key)=>{
         return <div style={{color:'red'}}>{email_err[key]}</div>
      })}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      {Object.keys(pass_err).map((key)=>{
         return <div style={{color:'red'}}>{pass_err[key]}</div>
      })}
    </Form.Group>
    <Button variant="primary" type="submit">
      Login
    </Button>
    <Link to='/register' className='px-3'> Click to create an account?</Link>
  </Form>
 
  </div>
  </>

  )

}

export default Login;
