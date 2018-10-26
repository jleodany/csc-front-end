import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

class Casos extends Component {

  constructor() {
    super();
    this.state = {
      value: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handlePrint(){
    if(this.state.value== 1){
      console.log(this.state.value);
    }else if(this.state.value==2){
      console.log(this.state.value);
    }
  }


  render() {
    return (
      <div className = "table"> 
          <div className='formCasos'>
            <div className="formDiv">
              <div className="w100">
                  <h2>CONSULTAR CASO</h2>
                  <select onChange={this.handleChange} className='inputs' id="select"> 
                    {/* Selecciona opcion */}
                      <option value="0">seleccione</option>

                      <option value="1">
                        Número caso
                      </option>
                      <option value="2">
                        Fecha
                      </option>
                  </select>
                  {
                    this.state.value == 1 
                    ? <input type="text" name="numCaso" id="numCaso" class="inputs" placeholder="&nbsp; &nbsp;Número de caso"/>
                    : this.state.value == 2 
                      ? <input type="date" name="numCaso" id="numCaso" class="inputs" placeholder="&nbsp; &nbsp;Número de caso"/>
                      : <div></div>
                  }
                  
                  <div className="w100 basic-div divFather">
                  <button className="botoniniciar button" onClick={this.handlePrint}>Seleccionar</button>
                  </div>

                  

              </div>
              
            </div>
          </div>
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