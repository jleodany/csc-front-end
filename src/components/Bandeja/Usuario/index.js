import React, { Component } from 'react';
import userIcon from '../../assets/imagenes/user.png';
import passIcon from '../../assets/imagenes/cont.png';

class Usuario extends Component {
  constructor() {
    super();
    this.state = {
      nombre: "Jose",
      apellido: "Ramirez",
      email: "joseleodany@gmail.com",
      telefono: "04261226405",
      userName: "JoseR",
      passWord: "Leodany@2909",
      RepearPassWord: "Leodany@2909"
    }
  }

  render() {
    return (
      <div className="table">
        <div className="datosPersonales">
          <h1>Datos Personales</h1>
          <div className="formDiv divDataUsuario">
            {/* Nombre */}
            <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="text" name="nombre" value={this.state.nombre} placeholder="&nbsp;&nbsp;Nombre" className='inputs' required disabled/>
            </div>

            {/* Apellido */}
            <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="text" name="apellido" value={this.state.apellido} placeholder="&nbsp;&nbsp;Apellido" className='inputs' required disabled/>
            </div>

            {/* Correo */}
            <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="email" name="correo" value={this.state.email} placeholder="&nbsp;&nbsp;Correo" className='inputs' required disabled/>
            </div>

            {/* Telefono */}
            <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="number" name="telefono" value={this.state.telefono} placeholder="&nbsp;&nbsp;Teléfono" className='inputs' required disabled/>
            </div>

            {/* Usuario */}
            <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="text" name="user" value={this.state.userName} placeholder="&nbsp;&nbsp;Usuario" className='inputs' required disabled/>
            </div>

            {/* Contraseña */}
            <div className="w100 basic-div">
              <img className="border ic icons" alt="passIcon" src={passIcon} />
              <input type="password" name="pass" value={this.state.passWord} placeholder="&nbsp;&nbsp;Contraseña" className='inputs' required disabled/>
            </div>

            {/* repetir contraseña */}
            <div className="w100 basic-div">
              <img className="border ic icons" alt="passIcon" src={passIcon} />
              <input type="password" name="repeatpass" value={this.state.RepearPassWord} placeholder="&nbsp;&nbsp;Repetir Contraseña" className='inputs' required disabled/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Usuario;