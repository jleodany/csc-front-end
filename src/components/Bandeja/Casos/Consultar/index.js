import React, { Component } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
import { ToastContainer, toast } from 'react-toastify';
import ModificarCaso from './Modificar'
import xIcon from '../../../assets/imagenes/x-mark.png'
let axios = require("axios");

class ConsultarCasos extends Component {

  constructor() {
    super();
    this.state = {
      attrib: '0',
      value: '',
      caseToEdit: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  handleChange(e) {
    this.setState({ attrib: e.target.value, value: '' });
  }

  handleChangeValue(e) {
    console.log(e.target.value)
    this.setState({ value: e.target.value });
  }

  toEdit(caseToEdit) {
    this.setState({ caseToEdit: caseToEdit })
  }

  closeEdit() {
    this.setState({ caseToEdit: null })
    this.handleSearch()
  }

  handleSearch() {
    if (this.state.attrib !== '0' && (this.state.value === null || this.state.value === '')) {
      toast.error('Debe ingresar el valor para buscar', {
        toastId: "errorMsg",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        onClose: this.setState({ registered: true })
      });
    } else {
      axios({
        method: 'post',
        url: '../../getCases',
        headers: { 'content-type': 'application/json' },
        data: {
          params: this.state.attrib === "0" ? false : true,
          value: this.state.attrib === "f_apertura" || this.state.attrib === "f_mod" ? new Date(this.state.value).setHours(24, 0, 0, 0) : this.state.value,
          attrib: this.state.attrib,
          token: sessionStorage.getItem('token')
        }
      }).then((response) => {
        console.log(response);
        if (!toast.isActive(this.toastId)) {
          let table = []
          const casesArray = response.data.data
          if (response.data.status === 200) {
            if (casesArray.length === 0) {
              toast.error('El usuario no posee casos asociados', {
                toastId: "errorMsg",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                onClose: this.setState({ registered: true })
              });
            }
          }
          casesArray.forEach(cases => {
            console.log("Cases =>", cases)
            let date = new Date(cases.f_apertura)
            cases.f_apertura = `${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()}`
            date = new Date(cases.f_mod)
            cases.f_mod = `${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()}`
            let childrenTable = []
            childrenTable.push(<td key={`${cases.idCaso}f`}>{`${cases.idCaso}`}</td>)
            childrenTable.push(<td key={`${cases.idCaso}a`}>{`${cases.type}`}</td>)
            childrenTable.push(<td key={`${cases.idCaso}b`}>{`${cases.asunto}`}</td>)
            childrenTable.push(<td key={`${cases.idCaso}c`}>{`${cases.descripcion}`}</td>)
            childrenTable.push(<td key={`${cases.idCaso}d`}>{`${cases.f_apertura}`}</td>)
            childrenTable.push(<td key={`${cases.idCaso}j`}>{`${cases.f_mod}`}</td>)
            childrenTable.push(<td key={`${cases.idCaso}e`}>{`${cases.userName}`}</td>)
            childrenTable.push(<td key={`${cases.idCaso}h`}>{`${cases.operador ? cases.operadorName : 'No asignado'}`}</td>)
            childrenTable.push(<td key={`${cases.idCaso}i`}>{`${cases.status}`}</td>)
            childrenTable.push(<td key={`${cases.idCaso}g`}><button className='botoniniciar button' onClick={() => this.toEdit(cases)}>Editar</button></td>)
            table.push(<tr key={cases.idCaso}>{childrenTable}</tr>)
          });
          console.log("cases =>", table);
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
  }

  render() {
    return (
      <div className="datosPersonales">
        {
          this.state.caseToEdit ? <div className='divbtnXIcon'><button onClick={() => this.closeEdit()} className='btnXIcon'><img src={xIcon} alt='img' className='imgXIcon'></img> </button></div>
            : null
        }
        {
          this.state.caseToEdit ? <ModificarCaso caseToEdit={this.state.caseToEdit} />
            : <div className='formCasos'>
              <div className="formDiv">
                <div className="w100">
                  <h2>CONSULTAR CASO</h2>
                  <select onChange={this.handleChange} className='inputs' id="select">
                    {/* Selecciona opcion */}
                    <option value="0">Todos</option>

                    <option value="idCaso">
                      Número caso
                      </option>
                    <option value="f_apertura">
                      Fecha de Apertura
                      </option>
                    <option value="f_mod">
                      Fecha de Modificación
                      </option>
                    <option value="type">
                      Tipo de Caso
                      </option>
                  </select>
                  {
                    this.state.attrib === "idCaso"
                      ? <input type="text" name="numCaso" id="numCaso" onChange={this.handleChangeValue} value={this.state.value} className="inputs" placeholder="&nbsp; &nbsp;Número de caso" />
                      : this.state.attrib === "f_apertura" || this.state.attrib === "f_mod"
                        ? <input type="date" name="numCaso" id="numCaso" onChange={this.handleChangeValue} value={this.state.value} className="inputs" placeholder="&nbsp; &nbsp;Número de caso" />
                        : this.state.attrib === "type" ? <select onChange={this.handleChangeValue} value={this.state.value} className='inputs' id="select">
                            {/* Selecciona opcion */}
                            <option value="">Seleccionar</option>
                            <option value="Incidente">Incidente</option>
                            <option value="Requerimiento">Requerimiento</option>
                        </select> : <div></div>
                  }

                  <div className="w100 basic-div divBtnCases">
                    <button className="botoniniciar button" onClick={() => this.handleSearch()}>Seleccionar</button>
                  </div>



                </div>

              </div>
              <div className="tablas">
                <table>
                  <tbody>
                    <tr>
                      <th>N° Caso</th>
                      <th>Tipo</th>
                      <th>Asunto</th>
                      <th>Descripcion</th>
                      <th>Apertura</th>
                      <th>Modificación</th>
                      <th>Usuario</th>
                      <th>Operador</th>
                      <th>Estado</th>
                      <th>Opciones</th>
                    </tr>
                    {this.state.table}
                  </tbody>
                </table>

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

export default ConsultarCasos;