import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

let axios = require("axios");

class Usuario extends Component {
  constructor() {
    super();
    this.growl = {};
    // this.state = {
    //   nombre: "Usuario Prueba",
    //   apellido: "Usuario Prueba",
    //   email: "usuarioprueba@urbe.edu.ve",
    //   telefono: "04240000000",
    //   userName: "UserPrueba",
    //   passWord: "userPrueba",
    //   RepearPassWord: "userPrueba"
    // }
    this.state = {
      table: <tr></tr>
    }
    this.showUsers()
  }

  showUsers = () => {
    axios({
      method: 'get',
      url: '../getUsers',
      headers: {'content-type': 'application/json'},
      params: {
        token: sessionStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response);
      if(response.data.status === 200){
        let table = []
        const usersArray = response.data.data
        usersArray.forEach(user => {
          console.log("User => ", user)
          let children = []
          children.push(<td key={user.id}>{`${user.userName}`}</td>)
          children.push(<td key={user.id}>{`${user.firstName} ${user.lastName}`}</td>)
          children.push(<td key={user.id}>{`${user.email}`}</td>)
          table.push(<tr key={user.id}>{children}</tr>)
        });
        console.log("table => ", table)
        this.setState({table: table})
        return table
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

  render() {
    return (
      <div className="table-user">
        <div className="datosPersonales">
          <h1>Datos Personales</h1>
          <div className="formDiv divDataUsuario">
            <table>
              <tbody>
                <tr>
                  <th>UserName</th>
                  <th>Nombre Natural</th>
                  <th>Correo Electrónico</th>
                </tr>
                {this.state.table}
              </tbody>
            </table>
            {/* Nombre */}
            {/* <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="text" name="nombre" value={this.state.nombre} placeholder="&nbsp;&nbsp;Nombre" className='inputs' required disabled/>
            </div> */}

            {/* Apellido */}
            {/* <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="text" name="apellido" value={this.state.apellido} placeholder="&nbsp;&nbsp;Apellido" className='inputs' required disabled/>
            </div> */}

            {/* Correo */}
            {/* <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="email" name="correo" value={this.state.email} placeholder="&nbsp;&nbsp;Correo" className='inputs' required disabled/>
            </div> */}

            {/* Telefono */}
            {/* <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="number" name="telefono" value={this.state.telefono} placeholder="&nbsp;&nbsp;Teléfono" className='inputs' required disabled/>
            </div> */}

            {/* Usuario */}
            {/* <div className="w100 basic-div">
              <img className="border ic icons" alt="userIcon" src={userIcon} />
              <input type="text" name="user" value={this.state.userName} placeholder="&nbsp;&nbsp;Usuario" className='inputs' required disabled/>
            </div> */}

            {/* Contraseña */}
            {/* <div className="w100 basic-div">
              <img className="border ic icons" alt="passIcon" src={passIcon} />
              <input type="password" name="pass" value={this.state.passWord} placeholder="&nbsp;&nbsp;Contraseña" className='inputs' required disabled/>
            </div> */}

            {/* repetir contraseña */}
            {/* <div className="w100 basic-div">
              <img className="border ic icons" alt="passIcon" src={passIcon} />
              <input type="password" name="repeatpass" value={this.state.RepearPassWord} placeholder="&nbsp;&nbsp;Repetir Contraseña" className='inputs' required disabled/>
            </div> */}


            {/* Modificar usuario */}
						{/* <Link className='basic-div' to="/bandeja/usuario">
						<button className="botoniniciar button">
							Modificar
						</button>
					  </Link> */}
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
      </div>
    )
  }
}

export default Usuario;