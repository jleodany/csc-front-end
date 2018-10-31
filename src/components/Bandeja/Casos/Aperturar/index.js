import React, { Component } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
let axios = require("axios");

class casosApertura extends Component {

  constructor() {
    super();
    this.state = {
      type: '',
      asunto: '',
      descripcion: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		// Debe estar, para que se actualice el valor de la variable.
		this.setState({
		  [name]: value
		});
			console.log(this.state);
		}
		

  createCases = () => {
    axios({
      method: 'post',
      url: '../../registerCase',
      headers: {'content-type': 'application/json'},
      data: {
        asunto: this.state.asunto,
        descripcion: this.state.descripcion,
        type: this.state.type,
        token: sessionStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response);
      if(response.data.status === 200){
				toast.success(response.data.message,{
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					onClose: this.setState({registered: true})
				});
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
        <div className = "table"> 
          <div className='formCasos'>
            <div className="formDiv">
              <div className="w100">
                  <h2>APERTURAR CASO</h2>
                  <select className='inputs' name="type" onChange={this.handleChange}> 

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
                  <input type="text" name="asunto" placeholder="&nbsp; &nbsp;Asunto" className='inputs' onKeyPress={this.handleChange}/>

                  {/* Descripción */}
                  <textarea type="text" name="descripcion" placeholder="&nbsp;Descripción del caso" className='textArea' onKeyPress={this.handleChange} >
                  </textarea>
                  
                  {/* Adjuntar */}
                  <input type="file" name="adjuntar"  className='inputs'/>
  

                  {/* Botón registro */}
                  <div className='basic-div'>
                    <input type="submit" className="botoniniciar button" value="Aperturar" onClick={this.createCases}/>
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
        </div>

    )
  }
}

export default casosApertura;