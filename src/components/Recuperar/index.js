import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Growl} from 'primereact/growl';
import logo from '../assets/imagenes/loginImg.png';
import userIcon from '../assets/imagenes/user.png';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

let axios = require("axios");

class Recuperar extends Component {

  constructor(){
    super();
    this.state = {userName: '', button: false};
    this.growl = {};
    this.handleChange = this.handleChange.bind(this);
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

  notify = () => {
    this.setState({button: true})
    if(! toast.isActive(this.toastId)){
      if(!this.state.userName){
        toast.error('Ingresa tu nombre de usuario',{
        toastId:"errorMsg4",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
        });
      }else if(this.state.userName){
      axios({
        method: 'post',
        url: 'changePass',
        headers: {'content-type': 'application/json'},
        data: {
          userName: this.state.userName
        }
      }).then((response) => {
        if(response.data.status === 200){
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
          this.setState({userName: '', button: false})
        } else {
          toast.error(response.data.message, {
            toastId: "errorMsg",
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true
          });
          this.setState({userName: '', button: false})
        }
      }).catch(function(error){
        console.log("There was an error => ", error);
      })
    }
    }
    // toast('Mensaje enviado a su correo, verifique',{
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: false,
    //   draggable: true
    // });
  }

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
                  <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="&nbsp;&nbsp;Usuario" className='inputs' required /> 
                </div>
              </div>

              {/* Enviar correo */}
              <div className="w100 basic-div divFather">
                <button className="botoniniciar button" onClick={this.notify} disabled={this.state.button}>
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
            <br/>
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