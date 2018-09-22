import React from 'react';
import { Link } from 'react-router-dom'
import logo from './imagenes/loginImg.png';
import userIcon from './imagenes/user.png';
import passIcon from './imagenes/cont.png';



const LogIn = () => (
  <div class='body'>
    <form action='' method='post'>

      {/* Logo */}
      <div class="logo-login">
        <img src={logo} alt="CSC" />
      </div>

      <div class="formDiv">
        <div class="w100">
          <div>
            {/* User */}
            <div class="w100 basic-div">
              <img class="border ic icons" src={userIcon} />
              <input type="text" name="user" placeholder="&nbsp;&nbsp;Usuario" class='inputs' required />
            </div>

            {/* Password */}
            <div class="w100 basic-div">
              <img class="border ic icons" src={passIcon}/>
              <input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña" class='inputs' required />
            </div>
          </div>

          {/* Botón iniciar */}
          <div class='w100 basic-div'>
            <input type="submit" value="Iniciar Sesion" class="botoniniciar button" />
          </div>
        </div>

        {/* Enlace para ir a registro */}
        <div class='w100 basic-div divFather'>
          <div class="divAnda">
            <Link to="/register">Registro</Link>
          </div>
        </div>
      </div>
    </form>
  </div >
);

export default LogIn;