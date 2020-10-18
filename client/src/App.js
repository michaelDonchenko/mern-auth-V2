import React from 'react';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import './css/app.css'
import AuthState from './context/auth/AuthState';
import setAuthToken from './utills/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute';



const App = () => {

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  return (
  
    <AuthState>
      <Router>
        <div className="app">
          <Navbar />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
        </div>
      </Router>
    </AuthState>
    
  );
}

export default App;
