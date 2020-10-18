import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import '../../css/formPages.css'

const Register = (props) => {
  const authContext = useContext(AuthContext)
  const {register, error, clearErrors, isAuth} = authContext

  const [user, setUser] = useState({
    displayName: '',
    email: '',
    password: '',
    password2: '',
  })

  const {displayName, email, password, passwordCheck} = user

  const change = e => {
    setUser({...user, [e.target.name]: e.target.value}) 
    clearErrors()
  }

  const submit = async e => {
    e.preventDefault();
     await register({
        email,
        password,
        passwordCheck,
        displayName,
      })
  }

  useEffect(() => {
    if (isAuth) {
      props.history.push('/')
    }
  }, [ isAuth, props.history])

 
  return (
    <div>
      <h2 className="mt-4 mb-4 h2__form">Account <span className="h2__style">Register</span></h2>
      {
        error && <div class="alert alert-danger" role="alert">{error}</div>
      }
      <form onSubmit={submit}>
          <div className="form-group">
            <label className="text-muted formLable">Display Name</label>
            <input onChange={change} value={displayName} autoComplete="off" name='displayName' type="text" className="form-control myInput" required></input>
          </div>
      
          <div className="form-group">
            <label className="text-muted formLable">Email</label>
            <input onChange={change} value={email} autoComplete="off" name='email' type="email" className="form-control myInput" required></input>
          </div>
      
          <div className="form-group">
            <label className="text-muted formLable">Password</label>
            <input onChange={change} value={password} autoComplete="off" name='password' type="password" className="form-control myInput" required minLength="5"></input>
          </div>

          <div className="form-group">
            <label className="text-muted formLable">Confirm Password</label>
            <input onChange={change} value={passwordCheck} autoComplete="off" name='passwordCheck' type="password" className="form-control myInput" required minLength="5"></input>
          </div>
          <button type="submit" className="btn btn-raised btn-primary submit_button btn-block"><i class="fas fa-check mr-2"></i>Submit</button>
      </form>

      <div className="formFooter">
      
            <span className="grayText">Already have an account?</span> <Link to="/login" type="button" class="btn btn-secondary changePage__button">click here</Link>
       
       
      </div>
      
    
    </div>
  )
}

export default Register
