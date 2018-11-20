import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
let axios = require("axios");

class Settings extends Component {

  constructor() {
    super();
    this.state = {
      attrib: '0',
      value: '',
      caseToEdit: null,
      invalidToken: false,
      active: false,
      time: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.getBackupConfig()
  }

  getBackupConfig = () => {
    axios({
      method: 'get',
      url: '../../getBackupData',
      headers: { 'content-type': 'application/json' },
      params: {
        token: sessionStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response);
      if (response.data.status === 200) {
        this.setState({
          active: response.data.data.active === 1 ? true : false,
          time: response.data.data.time < 1 ? 1 : response.data.data.time
        })
        // this.setState({ table: table })
      } else if (response.data.status === 400) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
        console.log(response.data.data.active)
      } else if (response.data.status === 405) {
        toast.error('Su Sesión ha Expirado', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setTimeout(
          function () {
            this.setState({ invalidToken: true });
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userInfo')
          }
            .bind(this),
          3000
        );
      }
    }).catch(function (error) {
      console.log("There was an error => ", error);
    })
  }

  setBackUpConfig = () => {
    axios({
      method: 'post',
      url: '../../setBackUp',
      headers: { 'content-type': 'application/json' },
      data: {
        token: sessionStorage.getItem('token'),
        active: this.state.active ? 1 : 0,
        time: this.state.active ? this.state.time : ''
      }
    }).then((response) => {
      console.log(response);
      if (response.data.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      } else if (response.data.status === 400) {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
        console.log(response.data.data.active)
      } else if (response.data.status === 405) {
        toast.error('Su Sesión ha Expirado', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setTimeout(
          function () {
            this.setState({ invalidToken: true });
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('userInfo')
          }
            .bind(this),
          3000
        );
      }
    }).catch(function (error) {
      console.log("There was an error => ", error);
    })
  }

  renderRedirect = () => {
    if (this.state.invalidToken) {
      return <Redirect to="/" />
    }
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value < 1 ? 1 : target.value;
    const name = target.name;
    // Debe estar, para que se actualice el valor de la variable.
    this.setState({
      [name]: value
    });

    console.log(this.state);
  }

  handleChangeValue(e) {
    console.log(e.target.value)
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div className="datosPersonales">
        {
          this.state.caseToEdit ? null
            : <div className='formCasos'>
              <div className="formDiv">
                <div className="w100">
                  <h2>CONFIGURACIÓN DEL BACKUP</h2>
                  <div>Activar 
                  <input 
                    type="checkbox" 
                    checked={this.state.active} 
                    name="active" 
                    onChange={this.handleChange}>
                  </input> </div>
                  {
                    this.state.active
                      ? <input type="number" name="time" id="time" onChange={this.handleChange} value={this.state.time} className="inputs" placeholder="&nbsp; &nbsp;Días entre cada respaldo" />
                      : null
                  }

                  <div className="w100 basic-div divBtnCases">
                    <button className="botoniniciar button" onClick={() => this.setBackUpConfig()}>Aceptar</button>
                  </div>



                </div>

              </div>
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
        }
      </div>
    )
  }
}

export default Settings;