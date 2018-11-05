import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
let axios = require("axios");

class AperturarCaso extends Component {

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

  createCases = () =>{
    if(! toast.isActive(this.toastId)){
        if(!this.state.type){
          toast.error('Selecciones un tipo',{
          toastId:"errorMsg",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      }else if(!this.state.asunto){
        toast.error('Ingrese un asunto',{
          toastId:"errorMsg2",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      
    }else if(!this.state.descripcion){
        toast.error('Ingrese una descripción',{
          toastId:"errorMsg3",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
        }
      
    else if(this.state.type && this.state.asunto && this.state.descripcion){
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
      if(! toast.isActive(this.toastId)){
      if(response.data.status === 200){
				toast.success(response.data.message,{
          toastId:"succsMsg",
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					onClose: this.setState({registered: true})
        });
        this.setState({
          type: '',
          asunto: '',
          descripcion: ''
        })
      }else if(response.data.status=== 400){
        toast.error(response.data.message,{
          toastId:"errorMsg",
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      }
    }
    }).catch(function(error){
      console.log("There was an error => ", error);
    })
  }
  }
  }
  
  render() {
    return (
        <div className = "datosPersonales"> 
          <div className='formCasos'>
            <div className="formDiv">
              <div className="w100">
                  <h2>APERTURAR CASO</h2>
                  <select className='inputs' name="type" value={this.state.type} onChange={this.handleChange}> 

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
                  <input type="text" name="asunto" placeholder="&nbsp; &nbsp;Asunto" value={this.state.asunto} className='inputs' onChange={this.handleChange}/>

                  {/* Descripción */}
                  <textarea type="text" name="descripcion" placeholder="&nbsp;Descripción del caso" value={this.state.descripcion} className='textArea' onChange={this.handleChange} >
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

export default AperturarCaso;