import React, { Component } from 'react';
import logo from '../assets/imagenes/loginImg.png';
import userIcon from '../assets/imagenes/user.png';
import passIcon from '../assets/imagenes/cont.png';

let axios = require("axios");

class Register extends Component {

	prueba() {
		console.log("PROBANDO");
		axios.get("test").then(function (response) {
			console.log(response.data);
		})
	}

	render() {
		return (
			<div className='body'>
				<div className='form'>
					{/* Imagen */}
					<div className="logo-login">
						<img src={logo} alt="Solinca" />
					</div>

					<div className="formDiv">
						{/* Nombre */}
						<div className="w100 basic-div">
							<img className="border ic icons" alt="userIcon" src={userIcon} />
							<input type="text" name="nombre" placeholder="&nbsp;&nbsp;Nombre" className='inputs' required />
						</div>

						{/* Apellido */}
						<div className="w100 basic-div">
							<img className="border ic icons" alt="userIcon" src={userIcon} />
							<input type="text" name="apellido" placeholder="&nbsp;&nbsp;Apellido" className='inputs' required />
						</div>

						{/* Correo */}
						<div className="w100 basic-div">
							<img className="border ic icons" alt="userIcon" src={userIcon} />
							<input type="email" name="correo" placeholder="&nbsp;&nbsp;Correo" className='inputs' required />
						</div>

						{/* Telefono */}
						<div className="w100 basic-div">
							<img className="border ic icons" alt="userIcon" src={userIcon} />
							<input type="number" name="telefono" placeholder="&nbsp;&nbsp;Teléfono" className='inputs' required />
						</div>

						{/* Usuario */}
						<div className="w100 basic-div">
							<img className="border ic icons" alt="userIcon" src={userIcon} />
							<input type="text" name="user" placeholder="&nbsp;&nbsp;Usuario" className='inputs' required />
						</div>

						{/* Contraseña */}
						<div className="w100 basic-div">
							<img className="border ic icons" alt="passIcon" src={passIcon} />
							<input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña" className='inputs' required />
						</div>

						{/* repetir contraseña */}
						<div className="w100 basic-div">
							<img className="border ic icons" alt="passIcon" src={passIcon} />
							<input type="password" name="repeatpass" placeholder="&nbsp;&nbsp;Repetir Contraseña" className='inputs' required />
						</div>

						{/* Botón registro */}
						<div className='basic-div'>
							<input type="submit" className="botoniniciar button" value="Registro" onClick={() => this.prueba()} />
						</div>
					</div>
				</div>
				{/* <input type="text" name="user" placeholder="&nbsp;&nbsp;Usuario" required />
                <button value="probar" onClick={() => this.prueba() }>Probar</button> */}
			</div>
		)
	}
}

export default Register;