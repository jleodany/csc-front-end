import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ConsultarUsuario from './Consulta'
import RegistrarUsuario from './Registro'
import DatosUsuario from './Datos'

let axios = require("axios");

class Usuario extends Component {
  constructor(props) {
    super(props);
    this.growl = {};
    this.state = {
      toShow: props.toShow
    }
    console.log('props', props)
  }

  componentDidUpdate(prevProps){
    if(prevProps.toShow != this.props.toShow){
      this.setState({toShow: this.props.toShow})
    }
  }
  render() {
    return (
      <div className="table-user">
        {
          this.state.toShow == 'registrar' ? <RegistrarUsuario />
            : this.state.toShow == 'consultar' ? <ConsultarUsuario />
              : <DatosUsuario />
        }
      </div>
    )
  }
}

export default Usuario;