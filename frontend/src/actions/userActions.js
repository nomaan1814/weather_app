import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGOUT,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL } from '../constants/userConstants';
export const logout=()=>(dispatch)=>{
    localStorage.removeItem('userdetailsinfo');
    dispatch({type:USER_LOGOUT})
}
export const login=(email,password)=>async (dispatch)=>{
      try {
          dispatch({type:USER_LOGIN_REQUEST})
          const config={headers:{'Content-Type':'application/json'}}
          const {data}=await axios.post('api/user/login',{email,password},config)
          dispatch({
              type:USER_LOGIN_SUCCESS,
              payload:data
          })
          localStorage.setItem('userdetailsinfo',JSON.stringify(data))
      } catch (error) {
          dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.errors
                ? error.response.data.errors[0].msg
                : error.message,
          })
          console.log(error)
       
      }
}
export const register=({name,email,password})=>async (dispatch)=>{
      try {
          dispatch({type:USER_REGISTER_REQUEST})
          const config={headers:{'Content-Type':'application/json'}}
          const { data }=await axios.post('api/user/register',{name,email,password},config)
          console.log(data)
          dispatch({
              type:USER_REGISTER_SUCCESS,
              payload:data
          })
          
      } catch (error) {
          dispatch({
            type: USER_REGISTER_FAIL,
            payload:
            error.response && (error.response.data.errors||error.response.data.message)
            ? error.response.data.message?error.response.data.message:error.response.data.errors[0].msg
            : error.message,
                
          })
          console.log(error)
       
      }
}


export const getUserDetails=()=>async (dispatch,getState)=>{
    try {
      dispatch({
          type:USER_DETAIL_REQUEST
      })
      const {userLogin:{userInfo}}=getState();
      const config={headers:{'Content-Type':'application/json',Authorization:`Bearer ${userInfo.token}`}};
      const { data }=await axios.get(`api/user/profile`,config)
  
      dispatch({
          type:USER_DETAIL_SUCCESS,
          payload:data.user
      })
    } catch (error) {
          dispatch({
              type:USER_DETAIL_FAIL,
              payload:error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
          })
    }
}

export const updateuserProfile=({name,email,password})=>async(dispatch,getState)=>{
    try {
      dispatch({
          type:USER_UPDATE_PROFILE_REQUEST
      })
      const {userLogin:{userInfo}}=getState();
      const config={headers:{
          'Content-Type':'application/json',
          Authorization:`Bearer ${userInfo.token}`
      }}
      const {data}=await axios.put('api/user/update',{name,email,password},config);

      dispatch({
          type:USER_UPDATE_PROFILE_SUCCESS,
          payload:data
      })
      localStorage.setItem('userdetailsinfo',JSON.stringify(data))
      
    } catch (error) {
        dispatch({
          type:USER_UPDATE_PROFILE_FAIL,
          payload:error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
        })
    }
}

