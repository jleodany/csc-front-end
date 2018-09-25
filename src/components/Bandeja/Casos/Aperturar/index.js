import React, { Component } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Link, Redirect } from 'react-router-dom';

class casosApertura extends Component {

  constructor() {
    super();
    this.state = {};
  } 
  
  render() {
    return (
        <div className = "table"> 
          <div className='form'>
            <div className="formDiv">
              <div className="w100">
                  <h2>APERTURAR CASO</h2>
                  <select className='inputs'> 

                  {/* Selecciona opcion */}
                    <option value="">Elija una opción
                    </option>
                    <option value="">
                      Incidente
                    </option>
                    <option value="">
                      Requerimiento
                    </option>
                  </select>

                  {/* Asunto */}
                  <input type="text" name="asunto" placeholder="&nbsp; &nbsp;Asunto" className='inputs'/>

                  {/* Descripción */}
                  <textarea type="text" name="descripcion" placeholder="&nbsp;Escriba una descripción" className='textArea' >
                  </textarea>
                  
                  {/* Adjuntar */}
                  <input type="file" name="adjuntar"  className='inputs'/>
  

                  {/* Botón registro */}
                  <div className='basic-div'>
                    <input type="submit" className="botoniniciar button" value="Aperturar"/>
                  </div>


              </div>
            </div>
          </div>
        </div>

    )
  }
}

export default casosApertura;