import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LogIn from './components/loginComponent/login';
import Register from './components/registerComponent/register';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  // login = new LogIn();
  // register = new Register();

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LogIn}/>
          <Route path="/login" component={LogIn}/>
          <Route path="/register" component={Register}/>
          {/* <LogIn></LogIn> */}
        </div>
      </Router>
    );
  }
}

export default App;
