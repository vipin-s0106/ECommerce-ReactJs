import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Footer from './components/Footer';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Order from './components/Order';
import Profile from './components/Profile';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Error404 from './components/Error404';

function App() {

  const [loggedOut,setLoggedOut] = useState(!localStorage.getItem('access'))

  const setloggedIn = () =>{
    setLoggedOut(false)
  }

  const setLoggedOut1 = () =>{
    setLoggedOut(true)
  }

  return (
    <div className="App">
      <Router>
          {/* NavBar */}
          <Header loggedOut={loggedOut} setloggedOutFunc={setLoggedOut1} />

          {/* router */}
          <Switch>
            <Route path="/login">
                <Login setloggedInFunc={setloggedIn} />
            </Route>
            <Route path="/signup" component={Register} />
            <Route path="/orders" component={Order} />
            <Route path="/profile" component={Profile} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" exact component={Dashboard} />
            <Route path="*" component={Error404} />
          </Switch>
          {/* Footer */}
      </Router>
    </div>
  );
}

export default App;
