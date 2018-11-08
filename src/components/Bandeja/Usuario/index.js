import React, { Component } from 'react';
import ConsultarUsuario from './Consulta'
import RegistrarUsuario from './Registro'
import DatosUsuario from './Datos'

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
    if(prevProps.toShow !== this.props.toShow){
      this.setState({toShow: this.props.toShow})
    }
  }
  render() {
    return (
      <div className="table-user">
        {
          this.state.toShow === 'registrar' ? <RegistrarUsuario />
            : this.state.toShow === 'consultar' ? <ConsultarUsuario />
              : <DatosUsuario />
        }
      </div>
    )
  }
}

export default Usuario;