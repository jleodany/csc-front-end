import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Principal from './Principal';
import Casos from './Casos/Consultar';
import Usuario from './Usuario'
import casosApertura from './Casos/Aperturar'
import { Redirect } from 'react-router-dom';
import Logo from '../assets/imagenes/loginImg.png';
import { logOut } from "./methods";

class Bandeja extends Component {
  constructor(){
    super();
    this.state = {toShow: ''}
  }

  redirectLogIn = () => {
    if(sessionStorage.getItem('token') == null){
      return <Redirect to="/login"/>
    }
  }

  render() {
    return (
      <div className="body">
        {this.redirectLogIn()}
        <nav className="nav-bar">
          <Link onClick={this.forceUpdate} to="/bandeja/principal">
            <img src={Logo} alt="CSC" className="logo"/>
          </Link>
          <ul>
            {/* if (condition) {
              
            } */}
            <li><Link onClick={this.forceUpdate} to="/bandeja/casos">Casos</Link>
                <ul>
                  <li><Link onClick={this.forceUpdate} to="/bandeja/casos/aperturar">Aperturar</Link></li>
                  <li><Link onClick={this.forceUpdate} to="/bandeja/casos/consultar">Consultar</Link></li>
                </ul>
            </li>
            <li><Link onClick={this.forceUpdate} to="/bandeja/usuario">Usuario</Link></li>
            <li><Link to="/" onClick={logOut}>Cerrar Sesión</Link></li>
          </ul>
        </nav>
        <Router>
          <div className="App main-content">
            <Route path="/bandeja/principal" component={Principal}></Route>
            {/* <Route path="/bandeja" component={Principal}></Route> */}
            <Route path="/bandeja/casos/consultar" component={Casos}></Route>
            <Route path="/bandeja/casos/aperturar" component={casosApertura}></Route>
            <Route path="/bandeja/usuario" component={Usuario}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default Bandeja;