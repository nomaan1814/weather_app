import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Loader from '../Loader';
import Message from '../Message';
import { Link, useNavigate } from 'react-router-dom';
import { login, register } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/register.css'

const Register = () => {
   const initialValues={name:"",email:"",password:"",cpassword:""};
   const [formValues,setFormValue]=useState(initialValues);
   const [formErrors,setFormErrors]=useState({});
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const userRegister=useSelector(state=>state.userRegister);
    const {loading,error,userInfo}=userRegister
    const [success,setSuccess]=useState(false)
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormValue({...formValues,[name]:value})
    }
    const validate=(values)=>{
        const errors={};
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let regexName=/^[a-zA-Z ]+$/
        if(!values.name){
            errors.name="Name is required"
        }
        else if(!regexName.test(values.name)){
            errors.name="Enter a valid name"
        }
        else if(values.name.length<3){
            errors.name="Enter a valid name"
        }
        if(!values.email){
            errors.email="Email is required"
        }
        else if(!regexEmail.test(values.email)){
            errors.email="Enter a valid email"
        }
        if(!values.password){
            errors.password="Password is required"
        }
        else if(values.password.length<6){
            errors.password="Password should contain 6 characters"
        }
       else if(values.cpassword!=values.password){
        errors.cpassword="Password and confirm password is not matching"
        errors.password="Password and confirm password is not matching"
       }
       if(!values.cpassword){
        errors.cpassword="Required"
       }
        return errors;
    }
    
    const submitHandler=async(e)=>{
          e.preventDefault();
          console.log(formValues);
          setFormErrors(validate(formValues));
          if(Object.keys(formErrors).length==0){
                dispatch(register(formValues))
                setFormValue(initialValues)
                setSuccess(true)
                setTimeout(() => {
                  navigate('/login')
                }, 2000)
          }
    }
   
  return (
    <div className='register mt-5'>
        <h1 className='pt-5'>Sign Up</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Successfully Registered! Now login</Message>}
    <Form onSubmit={submitHandler} className="form">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" name="name" placeholder="Enter name" value={formValues.name} onChange={handleChange}/>
      <div style={{color:'red'}}>{formErrors.name}</div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name="email" placeholder="Enter email" value={formValues.email} onChange={handleChange}/>
      <div style={{color:'red'}}>{formErrors.email}</div>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange}/>
      <div style={{color:'red'}}>{formErrors.password}</div>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" name="cpassword" placeholder="Confirm Password" value={formValues.cpassword} onChange={handleChange}/>
      <div style={{color:'red'}}>{formErrors.cpassword}</div>
    </Form.Group>
    
    <Button variant="primary" type="submit">
      Sign Up
    </Button>
    <Link to='/login' className='ps-3'>Click here to login?</Link>
  </Form>
  
  </div>
//   </MainScreen>
  
  )
}

export default Register
