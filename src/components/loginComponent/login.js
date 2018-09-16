import React from 'react';
import './css/estilos-login.css';
import { Link } from 'react-router-dom'
import logo from './imagenes/loginImg.png';
import userIcon from './imagenes/user.png';
import passIcon from './imagenes/cont.png';

const LogIn = () => (
  <div class='body'>
    <form action='' method='post'>
      <div class="logo-login">
        <img src={logo} alt="Solinca" />
      </div>
      <br />
      <div class="row basic-div">
        <img class="border ic icons" src={userIcon} />
        <input type="text" name="user" placeholder="&nbsp;&nbsp;Usuario" class='inputs' required />
      </div>
      <br />
      <div class="row basic-div">
        <img class="border ic icons" src={passIcon}/>
        <input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña" class='inputs' required />
      </div>
      <br/>
      <div class='basic-div'>
        <input type="submit" value="Iniciar Sesion" class="botoniniciar button" />
      </div>
      <Link to="/register">Registro</Link>
    </form>
  </div >
);

export default LogIn;