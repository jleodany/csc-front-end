import React, { Component } from 'react';
import logo from '../loginComponent/imagenes/loginImg.png';
import userIcon from '../loginComponent/imagenes/user.png';
import passIcon from '../loginComponent/imagenes/cont.png';

let axios = require("axios");

class Register extends Component {

	constructor() {
		super();
	}

	prueba() {
		console.log("PROBANDO");
		axios.get("test").then(function (response) {
			console.log(response.data);
		})
	}

	render() {
		return (
			<div class='body'>
				<form action="">
					{/* Imagen */}
					<div class="logo-login">
						<img src={logo} alt="Solinca" />
					</div>

					<div class="formDiv">
						{/* Nombre */}
						<div class="w100 basic-div">
							<img class="border ic icons" src={userIcon} />
							<input type="text" name="nombre" placeholder="&nbsp;&nbsp;Nombre" class='inputs' required />
						</div>

						{/* Apellido */}
						<div class="w100 basic-div">
							<img class="border ic icons" src={userIcon} />
							<input type="text" name="apellido" placeholder="&nbsp;&nbsp;Apellido" class='inputs' required />
						</div>

						{/* Correo */}
						<div class="w100 basic-div">
							<img class="border ic icons" src={userIcon} />
							<input type="email" name="correo" placeholder="&nbsp;&nbsp;Correo" class='inputs' required />
						</div>

						{/* Telefono */}
						<div class="w100 basic-div">
							<img class="border ic icons" src={userIcon} />
							<input type="number" name="telefono" placeholder="&nbsp;&nbsp;Teléfono" class='inputs' required />
						</div>

						{/* Usuario */}
						<div class="w100 basic-div">
							<img class="border ic icons" src={userIcon} />
							<input type="text" name="user" placeholder="&nbsp;&nbsp;Usuario" class='inputs' required />
						</div>

						{/* Contraseña */}
						<div class="w100 basic-div">
							<img class="border ic icons" src={passIcon} />
							<input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña" class='inputs' required />
						</div>

						{/* repetir contraseña */}
						<div class="w100 basic-div">
							<img class="border ic icons" src={passIcon} />
							<input type="password" name="repeatpass" placeholder="&nbsp;&nbsp;Repetir Contraseña" class='inputs' required />
						</div>

						{/* Botón registro */}
						<div class='basic-div'>
							<input type="submit" class="botoniniciar button" value="Registro" onClick={() => this.prueba()} />
						</div>
					</div>
				</form>




				{/* <input type="text" name="user" placeholder="&nbsp;&nbsp;Usuario" required />
                <button value="probar" onClick={() => this.prueba() }>Probar</button> */}
			</div>
		)
	}
}

export default Register;