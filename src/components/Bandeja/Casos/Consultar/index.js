import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

class Casos extends Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Número de Caso</th>
              <th>Creador</th>
              <th>Asunto</th>
              <th>Fecha de Apertura</th>
              <th>Tipo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123456</td>
              <td>JoseR</td>
              <td>La ruedita de mi maus no scrollea</td>
              <td>29/09/1997</td>
              <td>Solicitud</td>
              <td><i>ver</i></td>
            </tr>
            <tr>
              <td>789101</td>
              <td>LeuriR</td>
              <td>Mi pc está haciendo un ruido extraño</td>
              <td>20/11/2007</td>
              <td>Requerimiento</td>
              <td><i>ver</i></td>
            </tr>
          </tbody>
        </table>
        {/* <DataTable value={this.state}>
          <Column field="vin" header="Vin" />
          <Column field="vin" header="Vin" />
          <Column field="vin" header="Vin" />
          <Column field="vin" header="Vin" />
          <Column field="vin" header="Vin" />
          <Column field="vin" header="Vin" />
        </DataTable> */}
      </div>
    )
  }
}

export default Casos;