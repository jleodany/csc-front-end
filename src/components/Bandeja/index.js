import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Principal from './Principal';
import Casos from './Casos';
import Usuario from './Usuario'
import Logo from '../assets/imagenes/loginImg.png';

class Bandeja extends Component {
  constructor(){
    super();
    this.state = {toShow: ''}
  }

  renderBandeja = () => {
    // if()
    return 
  }

  render() {
    return (
      <div className="body">
        <nav className="nav-bar">
          <Link onClick={this.forceUpdate} to="/bandeja/principal">
            <img src={Logo} alt="CSC" className="logo"/>
          </Link>
          <ul>
            {/* if (condition) {
              
            } */}
            <li><Link onClick={this.forceUpdate} to="/bandeja/casos">Casos</Link></li>
            <li><Link onClick={this.forceUpdate} to="/bandeja/usuario">Usuario</Link></li>
            <li><Link to="/">Casos</Link></li>
          </ul>
        </nav>
        <Router>
          <div className="App main-content">
            <Route path="/bandeja/principal" component={Principal}></Route>
            {/* <Route path="/bandeja" component={Principal}></Route> */}
            <Route path="/bandeja/casos" component={Casos}></Route>
            <Route path="/bandeja/usuario" component={Usuario}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default Bandeja;