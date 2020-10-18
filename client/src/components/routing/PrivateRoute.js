import React, {useContext} from 'react'
import AuthContext from '../../context/auth/authContext'
import {Route, Redirect} from 'react-router-dom'



const PrivateRoute = ({component: Component, ...rest}) => {

  const authContext = useContext(AuthContext)
  const {isAuth} = authContext

  return (
    <Route 
    {...rest}
    render={props => !isAuth ? (<Redirect to="/login" />) : (<Component {...props} />)}
     />
  )
}

export default PrivateRoute