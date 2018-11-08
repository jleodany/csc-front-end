import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
let axios = require("axios");

class ModificarCaso extends Component {

  constructor(props) {
    super(props);
    console.log('props', props)
    this.state = {
      type: this.props.caseToEdit.type,
      asunto: this.props.caseToEdit.asunto,
      descripcion: this.props.caseToEdit.descripcion,
      idCaso: this.props.caseToEdit.idCaso,
      operador: this.props.caseToEdit.operador,
      user: this.props.caseToEdit.user,
      status: this.props.caseToEdit.status,
      fileBool: this.props.caseToEdit.file,
      file: '',
      disabled: this.props.caseToEdit.user === JSON.parse(sessionStorage.getItem('userInfo')).id ? false : true,
      image: '',
      operators: <option></option>
    }
    if (this.state.fileBool) {
      axios({
        method: 'post',
        url: '../../../download',
        data: {
          idCaso: this.state.idCaso
        }
      }).then((response) => {
        console.log(`data:image/jpeg;base64, ${response.data.data}`)
        this.setState({ image: `data:image/jpeg;base64, ${response.data.data}` })
      })
    }
    console.log(this.state)
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    if (JSON.parse(sessionStorage.getItem('userInfo')).type === 1) {
      this.getOperators()
    }
  }

  uploadFile = (name) => {
    if (this.state.file) {
      console.log('name', name)
      let formData = new FormData()
      formData.append('file', this.state.file, `${name}.jpg`)
      axios.post('../../uploadFile', formData).then((response) => {
        console.log(response);
        if (!toast.isActive(this.toastId)) {
          if (response.data.status === 200) {
            toast.success(response.data.message, {
              toastId: "succsMsg",
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              onClose: this.setState({ registered: true })
            });
          } else if (response.data.status === 400) {
            toast.error(response.data.message, {
              toastId: "errorMsg",
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true
            });
          }
        }
      }).catch(function (error) {
        console.log("There was an error => ", error);
      })
    }
  }

  async handleChangeFile(event) {
    console.log(event.target.files[0])
    if (event.target.files[0]) {
      if (event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/png") {
        let reader = new FileReader()
        reader.onload = async (e) => {
          await this.setState({ image: e.target.result })
        }
        reader.readAsDataURL(event.target.files[0])
        await this.setState({ file: event.target.files[0], fileBool: true })
      } else {
        toast.error('Formato no permitido', {
          toastId: "errorMsg",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      }
    }
    console.log(this.state)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // Debe estar, para que se actualice el valor de la variable.
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  getOperators = () => {
    axios({
      method: 'get',
      url: '../../../getUsers',
      headers: { 'content-type': 'application/json' },
      params: {
        token: sessionStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response.data.data);
      if (response.data.status === 200) {
        const usersInfo = response.data.data
        let operators = []
        usersInfo.forEach(user => {
          if (user.type === 2) {
            operators.push(<option key={user.id} value={user.id}>{`${user.userName}`}</option>)
          }
        });
        this.setState({ operators: operators })
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

  asignAgent = () => {
    axios({
      method: 'post',
      url: '../../../asignOperator',
      headers: { 'content-type': 'application/json' },
      data: {
        idCaso: this.state.idCaso,
        idOperador: this.state.operador,
        token: sessionStorage.getItem('token')
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
          draggable: true,
          onClose: this.setState({ registered: true })
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
      }
    }).catch(function (error) {
      console.log("There was an error => ", error);
    })
  }

  changeStatus(status) {
    axios({
      method: 'post',
      url: '../../../changeStatus',
      headers: { 'content-type': 'application/json' },
      data: {
        status: status,
        idCaso: this.state.idCaso,
        token: sessionStorage.getItem('token')
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
          draggable: true,
          onClose: this.setState({ registered: true })
        });
        this.setState({ status: status })
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

  modificateCase = () => {
    if (!toast.isActive(this.toastId)) {
      if (!this.state.type) {
        toast.error('Selecciones un tipo', {
          toastId: "errorMsg",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      } else if (!this.state.asunto) {
        toast.error('Ingrese un asunto', {
          toastId: "errorMsg2",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });

      } else if (!this.state.descripcion) {
        toast.error('Ingrese una descripción', {
          toastId: "errorMsg3",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      } else if (this.state.type && this.state.asunto && this.state.descripcion) {
        axios({
          method: 'post',
          url: '../../../modifyCase',
          headers: { 'content-type': 'application/json' },
          data: {
            asunto: this.state.asunto,
            descripcion: this.state.descripcion,
            type: this.state.type,
            idCaso: this.state.idCaso,
            file: this.state.file ? 1 : 0,
            token: sessionStorage.getItem('token')
          }
        }).then((response) => {
          console.log(response);
          if (response.data.status === 200) {
            if (this.state.file) {
              this.uploadFile(this.state.idCaso)
            } else {
              toast.success(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                onClose: this.setState({ registered: true })
              });
            }
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
    }
  }

  render() {
    return (
      <div className='formCasos'>
        <div className="formDiv">
          <div className="w100 w1002">
            <h2>APERTURAR CASO</h2>
            <select className='inputs' name="type" value={this.state.type} onChange={this.handleChange} disabled={this.state.disabled}>
              {/* Selecciona opcion */}
              <option value="">Elija una opción
                    </option>
              <option value="Incidente">
                Incidente
                    </option>
              <option value="Requerimiento">
                Requerimiento
                    </option>
            </select>
            {/* Asunto */}
            <input type="text" name="asunto" placeholder="&nbsp; &nbsp;Asunto" value={this.state.asunto} className='inputs' onChange={this.handleChange} disabled={this.state.disabled} />
            {/* Descripción */}
            <textarea type="text" name="descripcion" placeholder="&nbsp;Descripción del caso" value={this.state.descripcion} className='textArea' onChange={this.handleChange} disabled={this.state.disabled}>
            </textarea>
            {
              JSON.parse(sessionStorage.getItem('userInfo')).type === 1 ?
                <div className='basic-div'>
                  <select className='inputs' name="operador" value={this.state.operador} onChange={this.handleChange}>
                    <option value={null}>No Asignado</option>
                    {this.state.operators}
                  </select>
                  <input type="submit" className="botoniniciar button" value="Asignar" onClick={this.asignAgent} />
                </div>
                : null
            }
            {/* Adjuntar */}
            <input type="file" name="adjuntar" onChange={this.handleChangeFile} className='inputs' />
            {
              this.state.fileBool ? <div className='divCaseImg'><img src={this.state.image} className='caseImg' alt='img'></img></div>
                : null
            }
            {/* Botón registro */}
            {
              this.state.user === JSON.parse(sessionStorage.getItem('userInfo')).id ? <div className='basic-div'>
                <input type="submit" className="botoniniciar button" value="Modificar" onClick={this.modificateCase} />
              </div>
                : this.state.operador === JSON.parse(sessionStorage.getItem('userInfo')).id && this.state.status === 'PENDIENTE' ?
                  <div className='basic-div'>
                    <div className='basic-div'>
                      <input type="submit" className="botoniniciar button" value="Completar" onClick={() => this.changeStatus('FINALIZADO')} />
                    </div>
                    <div className='basic-div'>
                      <input type="submit" className="botoniniciar button" value="Rechazar" onClick={() => this.changeStatus('RECHAZADO')} />
                    </div>
                  </div> : this.state.status !== 'PENDIENTE' && (this.state.user === JSON.parse(sessionStorage.getItem('userInfo')).id || JSON.parse(sessionStorage.getItem('userInfo')).type === 1)
                    ? <input type="submit" className="botoniniciar button" value="Reabrir" onClick={() => this.changeStatus('PENDIENTE')} /> : null
            }
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
      </div>
    )
  }
}

export default ModificarCaso;