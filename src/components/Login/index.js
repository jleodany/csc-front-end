import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from '../assets/imagenes/loginImg.png';
import userIcon from '../assets/imagenes/user.png';
import passIcon from '../assets/imagenes/cont.png';



class Login extends Component {

  render() {
    return (
      <div className="body">
        <div className='form'>

          {/* Logo */}
          <div className="logo-login">
            <img src={logo} alt="CSC" />
          </div>

          <div className="formDiv">
            <div className="w100">
              <div>
                {/* User */}
                <div className="w100 basic-div">
                  <img className="border ic icons" alt="userIcon" src={userIcon} />
                  <input type="text" name="user" placeholder="&nbsp;&nbsp;Usuario" className='inputs' required />
                </div>

                {/* Password */}
                <div className="w100 basic-div">
                  <img className="border ic icons" alt="passIcon" src={passIcon} />
                  <input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña" className='inputs' required />
                </div>
              </div>

              {/* Botón iniciar */}
              <div className='w100 basic-div'>
                <input type="submit" value="Iniciar Sesion" className="botoniniciar button" />
              </div>
            </div>

            {/* Enlace para ir a registro */}
            <div className='w100 basic-div divFather'>
              <Link className='w100' to="/register" id="link">
                <button className="botoniniciar button">
                  Registro
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;