import React, { Component } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Link, Redirect } from 'react-router-dom';

class casosApertura extends Component {

  // constructor() {
  //   super();
  //   // this.state = {
  //   //   nombre: "Usuario Prueba",
  //   //   apellido: "Usuario Prueba",
  //   //   email: "usuarioprueba@urbe.edu.ve",
  //   //   telefono: "04240000000",
  //   //   userName: "UserPrueba",
  //   //   passWord: "userPrueba",
  //   //   RepearPassWord: "userPrueba"
  //   // }


  //   // this.state = {asunto: '', descripcion: '', userInfo:''};
  //   // this.showUsers()
  // }

  // handleChange(event){
	// 	const target = event.target;
	// 	const value = target.value;
	// 	const name = target.name;
	// 	// Debe estar, para que se actualice el valor de la variable.
	// 	this.setState({
	// 	  [name]: value
	// 	});
	
	// 		console.log(this.state);
	// 	}
		

  // createCases = () => {
  //   axios({
  //     method: 'post',
  //     url: 'registerCase',
  //     headers: {'content-type': 'application/json'},
  //     params: {
  //       asunto: this.state.asunto,
  //       descripcion: this.state.descripcion,
  //       userInfo: sessionStorage.getItem('token')
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //     if(response.data.status === 200){
  //       let table = []
  //       const usersArray = response.data.data
  //       usersArray.forEach(user => {
  //         console.log("User => ", user)
  //         let children = []
  //         children.push(<td key={user.id}>{`${user.userName}`}</td>)
  //         children.push(<td key={user.id}>{`${user.firstName} ${user.lastName}`}</td>)
  //         children.push(<td key={user.id}>{`${user.email}`}</td>)
  //         table.push(<tr key={user.id}>{children}</tr>)
  //       });
  //       console.log("table => ", table)
  //       this.setState({table: table})
  //       return table
  //     }else if(response.data.status=== 400){
  //       toast.error(response.data.message,{
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true
  //       });
  //     }
  //   }).catch(function(error){
  //     console.log("There was an error => ", error);
  //   })
  // }


  
  render() {
    return (
        <div className = "table"> 
          <div className='formCasos'>
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
                  <textarea type="text" name="descripcion" placeholder="&nbsp;Descripción del caso" className='textArea' >
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