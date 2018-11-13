import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Growl } from 'primereact/growl';
import logo from '../assets/imagenes/loginImg.png';
import userIcon from '../assets/imagenes/user.png';
import passIcon from '../assets/imagenes/cont.png';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

let axios = require("axios");

class Credenciales extends Component {

  constructor() {
    super();
    this.state = { userName: '', newUserName: '', pass: '', changed: false };
    this.growl = {};
    this.handleChange = this.handleChange.bind(this);
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

  reStartCredentials = () => {
    if (!toast.isActive(this.toastId)) {
      if (!this.state.userName) {
        toast.error('Ingrese el Nombre de Usuario', {
          toastId: "errorMsg",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      } else if (!this.state.pass) {
        toast.error('Ingrese su Nuevo Nombre de Usuario', {
          toastId: "errorMsg2",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      } else if (!this.state.pass) {
        toast.error('Ingrese la Nueva Contraseña', {
          toastId: "errorMsg2",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      } else {
        axios({
          method: 'post',
          url: 'changeCredentials',
          headers: { 'content-type': 'application/json' },
          data: {
            userName: this.state.userName,
            pass: this.state.pass,
            newUserName: this.state.newUserName
          }
        }).then((response) => {
          if (response.data.status === 200) {
            toast.success(response.data.message, {
              toastId: "sucssMsg",
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              onClose: this.setState({ registered: true })
            });
            setTimeout(
              function () {
                this.setState({ changed: true })
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('userInfo')
              }
                .bind(this),
              3000
            );
          } else {
            toast.error(response.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true
            });
          }
        }).catch(function (error) {
          console.log("There was an error => ", error);
        })
      }
    }
  }

  renderRedirect = () => {
    if (this.state.changed) {
      return <Redirect to="/login" />
    }
  }

  render() {
    return (
      <div className="body">
        {this.renderRedirect()}
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
                  <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="&nbsp;&nbsp;Usuario" className='inputs' required />
                </div>
              </div>
              <div>
                {/* User */}
                <div className="w100 basic-div">
                  <img className="border ic icons" alt="userIcon" src={userIcon} />
                  <input type="text" name="newUserName" value={this.state.newUserName} onChange={this.handleChange} placeholder="&nbsp;&nbsp;Nuevo Nombre de Usuario" className='inputs' required />
                </div>
              </div>
              <div>
                {/* User */}
                <div className="w100 basic-div">
                  <img className="border ic icons" alt="userIcon" src={passIcon} />
                  <input type="password" name="pass" value={this.state.pass} onChange={this.handleChange} placeholder="&nbsp;&nbsp;Contraseña" className='inputs' required />
                </div>
              </div>

              {/* Enviar correo */}
              <div className="w100 basic-div divFather">
                <button className="botoniniciar button" onClick={this.reStartCredentials}>
                  Confirmar Nuevos Datos
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
            <br />
            {/* Atrás */}
            <div className='w100 basic-div divFather'>
              <Link className='w100' to="/login">
                <button className="botoniniciar button">
                  Atrás
                </button>
              </Link>
            </div>

          </div>
        </div>
        <Growl ref={(el) => this.growl = el} position="topleft" />
      </div>
    )
  }
}

export default Credenciales;