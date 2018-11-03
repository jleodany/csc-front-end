import React, { Component } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
import { ToastContainer, toast } from 'react-toastify';
let axios = require("axios");

class Casos extends Component {

  constructor() {
    super();
    this.state = {
      attrib: '0',
      value: ''
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

  handleSearch() {
    axios({
      method: 'post',
      url: '../../getCases',
      headers: { 'content-type': 'application/json' },
      data: {
        params: this.state.attrib == "0" ? false : true,
        value: this.state.attrib == "f_apertura" ? new Date(this.state.value).setHours(24, 0, 0, 0) : this.state.value,
        attrib: this.state.attrib,
        token: sessionStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response);
      if (response.data.status === 200) {
        let table = []
        const casesArray = response.data.data
        if (casesArray.length == 0) {
          toast.success('El usuario no posee casos asociados', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            onClose: this.setState({ registered: true })
          });
        }
        casesArray.forEach(cases => {
          console.log("Cases =>", cases)
          let date = new Date(cases.f_apertura)
          cases.f_apertura = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
          let childrenTable = []
          childrenTable.push(<td key={`${cases.idCaso}f`}>{`${cases.idCaso}`}</td>)
          childrenTable.push(<td key={`${cases.idCaso}a`}>{`${cases.type}`}</td>)
          childrenTable.push(<td key={`${cases.idCaso}b`}>{`${cases.asunto}`}</td>)
          childrenTable.push(<td key={`${cases.idCaso}c`}>{`${cases.descripcion}`}</td>)
          childrenTable.push(<td key={`${cases.idCaso}d`}>{`${cases.f_apertura}`}</td>)
          childrenTable.push(<td key={`${cases.idCaso}e`}>{`${cases.user}`}</td>)
          childrenTable.push(<td key={`${cases.idCaso}e`}>{`${cases.operador ? cases.operador : 'No asignado'}`}</td>)
          childrenTable.push(<td key={`${cases.idCaso}g`}><button>Editar</button></td>)
          table.push(<tr key={cases.idCaso}>{childrenTable}</tr>)
        });
        console.log("cases =>", table);
        this.setState({ table: table })
        return table
        // toast.success(response.data.message, {
        //   position: "top-right",
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: true,
        //   onClose: this.setState({ registered: true })
        // });
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

  render() {
    return (
      <div className="table">
        <div className='formCasos'>
          <div className="formDiv">
            <div className="w100">
              <h2>CONSULTAR CASO</h2>
              <select onChange={this.handleChange} className='inputs' id="select">
                {/* Selecciona opcion */}
                <option value="0">Todos</option>

                <option value="id">
                  Número caso
                      </option>
                <option value="f_apertura">
                  Fecha
                      </option>
              </select>
              {
                this.state.attrib == "id"
                  ? <input type="text" name="numCaso" id="numCaso" onChange={this.handleChangeValue} value={this.state.value} className="inputs" placeholder="&nbsp; &nbsp;Número de caso" />
                  : this.state.attrib == "f_apertura"
                    ? <input type="date" name="numCaso" id="numCaso" onChange={this.handleChangeValue} value={this.state.value} className="inputs" placeholder="&nbsp; &nbsp;Número de caso" />
                    : <div></div>
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
                  <th>Fecha</th>
                  <th>Usuario</th>
                  <th>Operador</th>
                  <th></th>
                </tr>
                {this.state.table}
              </tbody>
            </table>

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




      // {/* <div className="table">
      // <h2>CONSULTAR CASO:</h2>
      //   {/* <table>
      //     <thead>
      //       <tr>
      //         <th>Número de Caso</th>
      //         <th>Creador</th>
      //         <th>Asunto</th>
      //         <th>Fecha de Apertura</th>
      //         <th>Tipo</th>
      //         <th>Opciones</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       <tr>
      //         <td>123456</td>
      //         <td>JoseR</td>
      //         <td>La ruedita de mi maus no scrollea</td>
      //         <td>29/09/1997</td>
      //         <td>Solicitud</td>
      //         <td><i>ver</i></td>
      //       </tr>
      //       <tr>
      //         <td>789101</td>
      //         <td>LeuriR</td>
      //         <td>Mi pc está haciendo un ruido extraño</td>
      //         <td>20/11/2007</td>
      //         <td>Requerimiento</td>
      //         <td><i>Ver / Modificar</i></td>
      //       </tr>
      //     </tbody>
      //   </table> */}
      //   {/* <DataTable value={this.state}>
      //     <Column field="vin" header="Vin" />
      //     <Column field="vin" header="Vin" />
      //     <Column field="vin" header="Vin" />
      //     <Column field="vin" header="Vin" />
      //     <Column field="vin" header="Vin" />
      //     <Column field="vin" header="Vin" />
      //   </DataTable> */}
      // </div> */}
    )
  }
}

export default Casos;