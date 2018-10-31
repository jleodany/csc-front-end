import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import {Growl} from 'primereact/growl';
import logo from '../assets/imagenes/loginImg.png';
import userIcon from '../assets/imagenes/user.png';
import passIcon from '../assets/imagenes/cont.png';
import { ToastContainer, toast } from 'react-toastify';

let axios = require("axios");

class Login extends Component {

  constructor(){
    super();
    this.state = {userName: '', pass: '', loged: false};
    this.growl = {};

    this.handleChange = this.handleChange.bind(this);
    // this.showGrowl = this.showGrowl.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // Debe estar, para que se actualice el valor de la variable.
    this.setState({
      [name]: value
    });

    console.log(this.state);
  }

  // showGrowl(message){
  //   this.growl.show(message);
  // }

  login(){
    axios({
      method: 'post',
      url: 'login',
      headers: {'content-type': 'application/json'},
      data: {
        userName: this.state.userName,
        pass: this.state.pass
      }
    }).then((response) => {
      console.log(response);
      if(response.data.status === 200){
        const event = {
          target:{
            value: true,
            name: 'loged'
          }
        }
        sessionStorage.setItem('token', response.data.data.token)
        this.handleChange(event);
      }else if(response.data.status=== 400){
        toast.error(response.data.message,{
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      }
    }).catch(function(error){
      console.log("There was an error => ", error);
    })
  }

  renderRedirect = () => {
    if(this.state.loged){
      return <Redirect to="/bandeja/principal"/>
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
                  <input type="text" name="userName" autoFocus placeholder="&nbsp;&nbsp;Usuario" className='inputs' value={this.state.userName} onChange={this.handleChange} required />
                </div>

                {/* Password */}
                <div className="w100 basic-div">
                  <img className="border ic icons" alt="passIcon" src={passIcon} />
                  <input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña"  onKeyPress={(ev)=>{
                     if (ev.key === 'Enter') {
                      {this.login()}
                    }
                  }} className='inputs' value={this.state.pass} onChange={this.handleChange} required maxLength="12"/>
                </div>
              </div>
              
              {/* Botón iniciar */}
              <div className="w100 basic-div divFather">
                <button className="botoniniciar button" onClick={() => this.login()}>
                  Iniciar Sesion
                </button>
              </div>
            </div>
            <br/>
            {/* Enlace para ir a registro */}
            <div className='w100 basic-div divFather'>
              <Link className='w100' to="/register">
                <button className="botoniniciar button">
                  Registro
                </button>
              </Link>
            </div>

            <br/>
            {/* Olvide contraseña */}
            <Link className='w100 basic-div divFather' to='./recuperar' value='Olvide contraseña'>
              ¿Olvidaste tu contraseña?         
            </Link>

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
        {/* <Growl ref={(el) => this.growl = el} position="topleft"/> */}
      </div>
    )
  }
}

export default Login;