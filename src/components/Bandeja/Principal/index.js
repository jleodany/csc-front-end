import React, { Component } from 'react';
import logo from '../../assets/imagenes/loginImg.png';

class Principal extends Component {


  render() {
    return (
      <div>
        <h1>¡Bienvenido!</h1>
        <img src={logo} alt="CSC" className="principalImage"/>
      </div>
    )
  }
}

export default Principal;