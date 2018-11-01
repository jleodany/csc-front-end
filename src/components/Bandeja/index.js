import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Principal from './Principal';
import Casos from './Casos/Consultar';
import consultarUsuario from './Usuario/Consulta'
import Usuario from './Usuario/Datos'
import registrarUsuario from './Usuario/Registro'
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
            <li><Link onClick={this.forceUpdate} to="/bandeja/usuario/datos">Usuario</Link>
                <ul>
                {
                  JSON.parse(sessionStorage.getItem('userInfo')).type == 1 
                  ? <li><Link onClick={this.forceUpdate} to="/bandeja/usuario/consultar">Consultar</Link></li>
                  : null
                }{
                  JSON.parse(sessionStorage.getItem('userInfo')).type == 1 
                  ? <li><Link onClick={this.forceUpdate} to="/bandeja/usuario/registro">Registrar</Link></li>
                  : null
                }
                </ul>
            </li>
            <li><Link to="/" onClick={logOut}>Cerrar Sesión</Link></li>
          </ul>
        </nav>
        <Router>
          <div className="App main-content">
            <Route path="/bandeja/principal" component={Principal}></Route>
            {/* <Route path="/bandeja" component={Principal}></Route> */}
            <Route path="/bandeja/casos/consultar" component={Casos}></Route>
            <Route path="/bandeja/casos/aperturar" component={casosApertura}></Route>
            <Route path="/bandeja/usuario/consultar" component={consultarUsuario}></Route>
            <Route path="/bandeja/usuario/registro" component={registrarUsuario}></Route>
            <Route path="/bandeja/usuario/datos" component={Usuario}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default Bandeja;