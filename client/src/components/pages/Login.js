import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'
import { Link } from 'react-router-dom'
import '../../css/formPages.css'

 const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const {email, password} = user

  const authContext = useContext(AuthContext)
  const {login, error, clearErrors, isAuth} = authContext


  const change = e => {
    setUser({...user, [e.target.name]: e.target.value}) 
    clearErrors()
  }

  const submit = async e => {
    e.preventDefault();
     await login({
        email,
        password,
      })
   }

   useEffect(() => {
    if (isAuth) {
      props.history.push('/')
    }
  }, [ isAuth, props.history])

  return (
    <div>
      <h2 className="mt-4 mb-4 h2__form">Account <span className="h2__style">Log-In</span></h2>
      {
        error && <div class="alert alert-danger" role="alert">{error}</div>
      }
        <form onSubmit={submit}>  
            <div className="form-group">
              <label className="text-muted formLable">Email</label>
              <input onChange={change} value={email} autoComplete="off" name='email' type="email" className="form-control myInput" required></input>
            </div>
        
            <div className="form-group">
              <label className="text-muted formLable">Password</label>
              <input onChange={change} value={password} autoComplete="off" name='password' type="password" className="form-control myInput" required minLength="5"></input>
            </div>

            <button type="submit" className="btn btn-raised btn-primary submit_button btn-block"><i className="fas fa-location-arrow mr-2"></i>Log-in</button>
        </form>

        <div className="formFooter">
          <span className="grayText">Dont have an account?</span> <Link to="/register" type="button" class="btn btn-secondary changePage__button">Click here</Link>
        </div>
        
    </div>
  )
}

export default Login
