import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Registro';
import Bandeja from './components/Bandeja';
import Recuperar from './components/Recuperar';
import Credenciales from './components/Credenciales';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  // login = new LogIn();
  // register = new Register();

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/bandeja" component={Bandeja}/>
          <Route path="/recuperar" component={Recuperar}/>
          <Route path="/credenciales" component={Credenciales}/>
          {/* <LogIn></LogIn> */}
        </div>
      </Router>
    );
  }
}

export default App;
