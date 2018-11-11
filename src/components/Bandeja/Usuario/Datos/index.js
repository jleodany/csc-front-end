import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import userIcon from '../../../assets/imagenes/user.png';
import passIcon from '../../../assets/imagenes/cont.png';
import emailIcon from '../../../assets/imagenes/email.png';
import nameIcon from '../../../assets/imagenes/name.png';

let axios = require("axios");

class DatosUsuario extends Component {
  constructor() {
    super();
    this.growl = {};
    this.state = {
      nombre: "",
      apellido: "",
      email: "",
      userName: "",
      passWord: "",
      invalidToken: false
    }
    this.showUserData()
  }

  renderRedirect = () => {
    if (this.state.invalidToken) {
      return <Redirect to="/" />
    }
  }

  showUserData = () => {
    axios({
      method: 'get',
      url: '../../getUserData',
      headers: { 'content-type': 'application/json' },
      params: {
        token: sessionStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response);
      if (response.data.status === 200) {
        const userInfo = response.data.data
        console.log('userInfo', userInfo)
        this.setState({
          nombre: userInfo.firstName,
          apellido: userInfo.lastName,
          email: userInfo.email,
          userName: userInfo.userName,
          passWord: "*******",
        })
      } else if (response.data.status === 400) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      } else if (response.data.status === 405) {
        toast.error('Su Sesión ha Expirado', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setTimeout(
          function () {
            this.setState({ invalidToken: true });
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userInfo')
          }
            .bind(this),
          3000
        );
      }
    }).catch(function (error) {
      console.log("There was an error => ", error);
    })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // Debe estar, para que se actualice el valor de la variable.
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="datosPersonales">
        {this.renderRedirect()}
        <h1>Datos Personales</h1>
        <div className="formDiv divDataUsuario">
          {/* Nombre */}
          <div className="w100 basic-div">
            <img className="border ic icons" alt="userIcon" src={nameIcon} />
            <input type="text" name="nombre" value={this.state.nombre} onKeyPress={this.handleChange} placeholder="&nbsp;&nbsp;Nombre" className='inputs' required disabled />
          </div>

          {/* Apellido */}
          <div className="w100 basic-div">
            <img className="border ic icons" alt="userIcon" src={nameIcon} />
            <input type="text" name="apellido" value={this.state.apellido} onKeyPress={this.handleChange} placeholder="&nbsp;&nbsp;Apellido" className='inputs' required disabled />
          </div>

          {/* Correo */}
          <div className="w100 basic-div">
            <img className="border ic icons" alt="userIcon" src={emailIcon} />
            <input type="email" name="correo" value={this.state.email} onKeyPress={this.handleChange} placeholder="&nbsp;&nbsp;Correo" className='inputs' required disabled />
          </div>

          {/* Telefono */}
          {/* <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="number" name="telefono" value={this.state.telefono} placeholder="&nbsp;&nbsp;Teléfono" className='inputs' required disabled/>
            </div> */}

          {/* Usuario */}
          <div className="w100 basic-div">
            <img className="border ic icons" alt="userIcon" src={userIcon} />
            <input type="text" name="user" value={this.state.userName} onKeyPress={this.handleChange} placeholder="&nbsp;&nbsp;Usuario" className='inputs' required disabled />
          </div>

          {/* Contraseña */}
          <div className="w100 basic-div">
            <img className="border ic icons" alt="passIcon" src={passIcon} />
            <input type="password" name="pass" value={this.state.passWord} onKeyPress={this.handleChange} placeholder="&nbsp;&nbsp;Contraseña" className='inputs' required disabled />
          </div>

          {/* repetir contraseña */}
          {/* <div className="w100 basic-div">
              <img className="border ic icons" alt="passIcon" src={passIcon} />
              <input type="password" name="repeatpass" value={this.state.RepearPassWord} placeholder="&nbsp;&nbsp;Repetir Contraseña" className='inputs' required disabled/>
            </div> */}


          {/* Modificar usuario */}
          <button className="botoniniciar button">
            Modificar
						</button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl
            pauseOnVisibilityChange
            draggable
            pauseOnHover={false}
            closeButton={false}
            pauseOnFocusLoss={false}
          />

        </div>
      </div>
    )
  }
}

export default DatosUsuario;