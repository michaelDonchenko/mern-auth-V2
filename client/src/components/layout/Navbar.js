import React, {useContext, Fragment} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import '../../css/navbar.css'

const Navbar = () => {

  const authContext = useContext(AuthContext)
  const {isAuth, logout} = authContext

  const onLogout = () => {
    logout()
  }

  const authLinks = (
    <Fragment>
     <Link onClick={onLogout} className="navLink"><i class="fas fa-sign-out-alt fx-2"></i>  Logout</Link>
    </Fragment>
  ) 
  const guestLinks = (
    <Fragment> 
      <Link className="navLink" to='/register'>Register</Link>
      <Link className="navLink" to='/login'>Login</Link>
    </Fragment>
  )
  
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light myNav">
    <span class="navbar-brand navLogo">Authentication</span>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navIcon"><i class="fas fa-bars"></i></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
      {
       isAuth ?  authLinks :  guestLinks
      }
      </div>
    </div>
  </nav>
  )
}

export default Navbar
