import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {Growl} from 'primereact/growl';
import logo from '../assets/imagenes/loginImg.png';
import userIcon from '../assets/imagenes/user.png';
import passIcon from '../assets/imagenes/cont.png';

let axios = require("axios");

class Login extends Component {

  constructor(){
    super();
    this.state = {userName: '', passWord: '', loged: false};
    this.growl = {};

    this.handleChange = this.handleChange.bind(this);
    this.showGrowl = this.showGrowl.bind(this);
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

  showGrowl(message){
    this.growl.show(message);
  }

  login(){
    axios({
      method: 'post',
      url: 'login',
      headers: {'content-type': 'application/json'},
      data: {
        userName: this.state.userName,
        passWord: this.state.passWord
      }
    }).then((response) => {
      if(response.status === 200){
        const event = {
          target:{
            value: true,
            name: 'loged'
          }
        }
        this.handleChange(event);
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
                  <input type="text" name="userName" placeholder="&nbsp;&nbsp;Usuario" className='inputs' value={this.state.userName} onChange={this.handleChange} required />
                </div>

                {/* Password */}
                <div className="w100 basic-div">
                  <img className="border ic icons" alt="passIcon" src={passIcon} />
                  <input type="password" name="passWord" placeholder="&nbsp;&nbsp;Contraseña" className='inputs' onKeyPress={() => this.login()} value={this.state.passWord} onChange={this.handleChange}  required />
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
            <Link className='w100' to='./recuperar' value='Olvide contraseña'>
              ¿Olvidaste tu contraseña?         
            </Link>

          </div>
        </div>
        <Growl ref={(el) => this.growl = el} position="topleft"/>
      </div>
    )
  }
}

export default Login;