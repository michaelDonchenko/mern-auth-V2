import React, {useReducer} from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './AuthReducer'
import setAuthToken from '../../utills/setAuthToken'
import 
{
REGISTER_SUCCESS,
REGISTER_FAIL,
USER_LOADED,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
CLEAR_ERRORS,
} from '../types'

const AuthState = props => {
  const initialState =  {
    token: localStorage.getItem('token'),
    isAuth: localStorage.getItem('token') ? true : null,
    loading: false,
    user: null,
    error: null,
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  //setting auth token for headers
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  //load user data
 const loadUser = async () => {
    try {
      const res = await axios.get('/auth/user')
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })  
    } catch (err) {
      dispatch({type: AUTH_ERROR})
    }
  }

  //Register user
 const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const res = await axios.post('/auth/register', formData, config) 
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token
      })  
      loadUser()
     } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      })
     }
   }

   //Login user
 const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const res = await axios.post('/auth/login', formData, config) 
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token
      })  
      loadUser()

    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      })
    }
   }

   //Logout
 const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }

  //Clear errors
 const clearErrors = () => {
    dispatch({
      type:CLEAR_ERRORS,
    })
  }

  return (
    <AuthContext.Provider
    value={{
      token: state.token,
      isAuth: state.isAuth,
      loading: state.loading,
      user: state.user,
      error: state.error,
      register,
      clearErrors,
      loadUser,
      login,
      logout,
    }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState