import React from 'react';
import './css/estilos-login.css';
import { Link } from 'react-router-dom'
import logo from './imagenes/loginImg.png';
import userIcon from './imagenes/user.png';
import passIcon from './imagenes/cont.png';



const LogIn = () => (
  <div class='body'>
    <form action='' method='post'>

      {/* Logo */}
      <div class="logo-login">
        <img src={logo} alt="Solinca" />
      </div>
      <br />

      {/* User */}
      <div class="row basic-div">
        <img class="border ic icons" src={userIcon} />
        <input type="text" name="user" placeholder="&nbsp;&nbsp;Usuario" class='inputs' required />
      </div>
      <br />

      {/* Password */}
      <div class="row basic-div">
        <img class="border ic icons" src={passIcon}/>
        <input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña" class='inputs' required />
      </div>
      <br/>

      {/* Botón iniciar */}
      <div class='basic-div'>
        <input type="submit" value="Iniciar Sesion" class="botoniniciar button" />
      </div>

      {/* Botón registro */}
      <div class='basic-div'>
        <Link type="submit" class="botoniniciar button" to="/register" value="Registro">Registro</Link>  
      </div> 

      </form>
  </div >
);

export default LogIn;