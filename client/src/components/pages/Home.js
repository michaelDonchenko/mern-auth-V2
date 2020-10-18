import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/auth/authContext'

const Home = () => {

  const authContex = useContext(AuthContext)
  const {loadUser, user} = authContex

  useEffect(() => {
    loadUser()  
  }, [])

  return (
    <div>
      <h1 className="mt-4 mb-4">Home page</h1>
      <h2>
        {user && `Hello ${user.displayName}, Welcome back.`}
      </h2>
    </div>
  )
}

export default Home
