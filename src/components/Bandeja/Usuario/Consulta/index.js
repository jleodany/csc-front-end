import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ModificarUsuario from './Modificar'
import xIcon from '../../../assets/imagenes/x-mark.png'

let axios = require("axios");

class ConsultarUsuario extends Component {
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
      table: <tr></tr>,
      userToEdit: null
    }
    this.showUsers()
  }

  toEdit(userToEdit) {
    this.setState({userToEdit: userToEdit})
  }

  toDelete(userToDelete) {
    axios({
      method: 'post',
      url: '../../deleteUser',
      headers: { 'content-type': 'application/json' },
      data: {
        id: userToDelete.id,
        token: sessionStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response);
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
        this.showUsers()
      } else if (response.data.status === 400) {
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

  showUsers = () => {
    axios({
      method: 'get',
      url: '../../getUsers',
      headers: { 'content-type': 'application/json' },
      params: {
        token: sessionStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response);
      if (response.data.status === 200) {
        let table = []
        const usersArray = response.data.data
        usersArray.forEach(user => {
          console.log("User => ", user)
          let children = []
          children.push(<td key={`${user.id}a`}>{`${user.userName}`}</td>)
          children.push(<td key={`${user.id}b`}>{`${user.firstName} ${user.lastName}`}</td>)
          children.push(<td key={`${user.id}c`}>{`${user.email}`}</td>)
          children.push(<td key={`${user.id}d`}><button className='botoniniciar button' onClick={() => this.toEdit(user)}>Editar</button><button className='botoniniciar button botoneliminar' onClick={() => this.toDelete(user)}>Eliminar</button></td>)
          if(user.id != JSON.parse(sessionStorage.getItem('userInfo')).id){
            table.push(<tr key={user.id}>{children}</tr>)
          }
        });
        console.log("table => ", table)
        this.setState({ table: table })
        return table
      } else if (response.data.status === 400) {
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

  closeEdit(){
    this.setState({userToEdit: null})
    this.showUsers()
  }

  render() {
    return (
      <div className="main">
      {
        this.state.userToEdit ? <div className='divbtnXIcon'><button onClick={() => this.closeEdit()} className='btnXIcon'><img src={xIcon} className='imgXIcon'></img> </button></div>
        : null
      }
      {
        this.state.userToEdit ? <div className="datosPersonales"><ModificarUsuario userToEdit={this.state.userToEdit}/></div>
        : <div className="datosPersonales">
          <h1>Usuarios Registrados</h1>
          <div className="formDiv tablas">
            <table>
              <tbody>
                <tr>
                  <th>UserName</th>
                  <th>Nombre Natural</th>
                  <th>Correo Electrónico</th>
                  <th>Opciones</th>
                </tr>
                {this.state.table}
              </tbody>
            </table>
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
      }
      </div>
    )
  }
}

export default ConsultarUsuario;