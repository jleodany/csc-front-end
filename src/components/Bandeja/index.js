import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Principal from './Principal';
import Casos from './Casos';
import Usuario from './Usuario'
import casosApertura from './Casos/Aperturar'
import { Redirect } from 'react-router-dom';
import Logo from '../assets/imagenes/loginImg.png';
import { logOut } from "./methods";

class Bandeja extends Component {
  constructor(){
    super();
    this.state = {toShow: 'principal', childComponent: null}
  }

  redirectLogIn = () => {
    if(sessionStorage.getItem('token') == null){
      return <Redirect to="/login"/>
    }
  }

  changeShowingComponent = (toShow, childComponent) => {
    console.log('childComponent', childComponent)
    this.setState({toShow: toShow, childComponent: childComponent})
  }

  render() {
    return (
      <div className="body">
        {this.redirectLogIn()}
        <nav className="nav-bar">
          <Link onClick={() => this.changeShowingComponent('principal')} to="/bandeja/principal">
            <img src={Logo} alt="CSC" className="logo"/>
          </Link>
          <ul>
            {/* if (condition) {
              
            } */}
            <li><Link onClick={() => this.changeShowingComponent('casos', 'consultar')} to="/bandeja/casos">Casos</Link>
                <ul>
                  <li><Link onClick={() => this.changeShowingComponent('casos', 'aperturar')} to="/bandeja/casos/aperturar">Aperturar</Link></li>
                  <li><Link onClick={() => this.changeShowingComponent('casos', 'consultar')} to="/bandeja/casos/consultar">Consultar</Link></li>
                </ul>
            </li>
            <li><Link onClick={() => this.changeShowingComponent('usuario', 'datos')} to="/bandeja/usuario/datos">Usuario</Link>
                <ul>
                {
                  JSON.parse(sessionStorage.getItem('userInfo')).type == 1 
                  ? <li><Link onClick={() => this.changeShowingComponent('usuario', 'consultar')} to="/bandeja/usuario/consultar">Consultar</Link></li>
                  : null
                }{
                  JSON.parse(sessionStorage.getItem('userInfo')).type == 1 
                  ? <li><Link onClick={() => this.changeShowingComponent('usuario', 'registrar')} to="/bandeja/usuario/registro">Registrar</Link></li>
                  : null
                }
                </ul>
            </li>
            <li><Link to="/" onClick={logOut}>Cerrar Sesión</Link></li>
          </ul>
        </nav>
          <div className="App main-content">
          {
            this.state.toShow == 'principal' ? <Principal />
            : this.state.toShow == 'casos' ? <Casos toShow={this.state.childComponent}/>
            : <Usuario toShow={this.state.childComponent}/>
          }

            {/* <Route path="/bandeja/principal" component={Principal}></Route> */}
            {/* <Route path="/bandeja" component={Principal}></Route> */}
            {/* <Route path="/bandeja/casos/consultar" component={Casos}></Route>
            <Route path="/bandeja/casos/aperturar" component={casosApertura}></Route>
            <Route path="/bandeja/usuario/consultar" component={consultarUsuario}></Route>
            <Route path="/bandeja/usuario/registro" component={registrarUsuario}></Route>
            <Route path="/bandeja/usuario/datos" component={Usuario}></Route> */}
          </div>
      </div>
    );
  }
}

export default Bandeja;