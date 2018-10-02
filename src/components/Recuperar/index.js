import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {Growl} from 'primereact/growl';
import logo from '../assets/imagenes/loginImg.png';
import userIcon from '../assets/imagenes/user.png';
import passIcon from '../assets/imagenes/cont.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let axios = require("axios");

class Recuperar extends Component {

  // constructor(){
  //   super();
  //   this.state = {userName: '', passWord: '', loged: false};
  //   this.growl = {};

  //   this.handleChange = this.handleChange.bind(this);
  //   this.showGrowl = this.showGrowl.bind(this);
  // }

  // handleChange(event){
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   // Debe estar, para que se actualice el valor de la variable.
  //   this.setState({
  //     [name]: value
  //   });

  //   console.log(this.state);
  // }

  notify = () => toast('Mensaje enviado a su correo, verifique',{
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
  });



  // showGrowl(message){
  //   this.growl.show(message);
  // }

  // login(){
  //   axios({
  //     method: 'post',
  //     url: 'login',
  //     headers: {'content-type': 'application/json'},
  //     data: {
  //       userName: this.state.userName,
  //       passWord: this.state.passWord
  //     }
  //   }).then((response) => {
  //     if(response.status === 200){
  //       const event = {
  //         target:{
  //           value: true,
  //           name: 'loged'
  //         }
  //       }
  //       this.handleChange(event);
  //       this.notify();
  //     }
  //   }).catch(function(error){
  //     console.log("There was an error => ", error);
  //   })
  // }

  // renderRedirect = () => {
  //   if(this.state.loged){
  //     return <Redirect to="/bandeja/principal"/>
  //   }
  // }

  render() {
    return (
      <div className="body">
        {/* {this.renderRedirect()} */}
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
                  <input type="text" name="userName" placeholder="&nbsp;&nbsp;Usuario" className='inputs' required />
                </div>

                {/* Password */}
                {/* <div className="w100 basic-div">
                  <img className="border ic icons" alt="passIcon" src={passIcon} />
                  <input type="password" name="passWord" placeholder="&nbsp;&nbsp;Contraseña" className='inputs' onKeyPress={() => this.login()} value={this.state.passWord} onChange={this.handleChange}  required />
                </div> */}
              </div>

              {/* Enviar correo */}
              <div className="w100 basic-div divFather">
                <button className="botoniniciar button" onClick={this.notify}>
                  Solicitar código
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
        <Growl ref={(el) => this.growl = el} position="topleft"/>
      </div>
    )
  }
}

export default Recuperar;