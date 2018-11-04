import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../../assets/imagenes/loginImg.png';
import userIcon from '../../../assets/imagenes/user.png';
import passIcon from '../../../assets/imagenes/cont.png';
import emailIcon from '../../../assets/imagenes/email.png';
import nameIcon from '../../../assets/imagenes/name.png';
import { ToastContainer, toast } from 'react-toastify';

let axios = require("axios");

class RegistrarUsuario extends Component {

	constructor() {
		super();
		this.state = { id: null, userName: '', pass: '', firstName: '', lastName: '', email: '', type: '', registered: false };
		this.growl = {};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		// Debe estar, para que se actualice el valor de la variable.
		this.setState({
			[name]: value
		});

		console.log(this.state);
	}

	registerUser() {
		axios({
			method: 'post',
			url: '../../registerUser',
			headers: { 'content-type': 'application/json' },
			data: {
				id: null,
				userName: this.state.userName,
				pass: this.state.pass,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				type: this.state.type,
				token: sessionStorage.getItem('token')
			}
		}).then((response) => {
			console.log(response);
			if (response.data.status === 200) {
				toast.success(response.data.message, {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					onClose: this.setState({ registered: true })
				});
				this.setState({
					id: null,
					userName: '',
					pass: '',
					firstName: '',
					lastName: '',
					email: '',
					type: 1,
					registered: false
				});
				// this.handleChange(event);
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

	renderRedirect = () => {
		console.log("renderRedirect")
		if (this.state.registered) {
			console.log("shouldRedirect")
			// return <Redirect to="/bandeja" />
		}
	}

	render() {
		return (
			<div className='form'>
				{/* Imagen */}
				<div className="logo-registro">
					<img src={logo} alt="Solinca" />
				</div>
				<br />
				<div className="FormRegister">
					{/* Nombre */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="userIcon" src={nameIcon} />
						<input type="text" name="firstName" placeholder="&nbsp;&nbsp;Nombre" className='inputs' onChange={this.handleChange} value={this.state.firstName} required />
					</div>

					{/* Apellido */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="userIcon" src={nameIcon} />
						<input type="text" name="lastName" placeholder="&nbsp;&nbsp;Apellido" className='inputs' onChange={this.handleChange} value={this.state.lastName} required />
					</div>

					{/* Correo */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="userIcon" src={emailIcon} />
						<input type="email" name="email" placeholder="&nbsp;&nbsp;Correo" className='inputs' onChange={this.handleChange} value={this.state.email} required />
					</div>

					{/* Telefono */}
					{/* <div className="w100 basic-div">
							<img className="border ic icons" alt="userIcon" src={userIcon} />
							<input type="number" name="telefono" placeholder="&nbsp;&nbsp;Teléfono" className='inputs' required />
						</div> */}

					{/* Usuario */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="userIcon" src={userIcon} />
						<input type="text" name="userName" placeholder="&nbsp;&nbsp;Usuario" className='inputs' onChange={this.handleChange} maxLength="30" value={this.state.userName} required />
					</div>

					{/* Contraseña */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="passIcon" src={passIcon} />
						<input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña" className='inputs' onChange={this.handleChange} value={this.state.pass} maxLength="12" minLength="5" required />
					</div>

					{/* Tipo de Usuario */}
					<div className="w100 basic-div">
						<img className="border ic icons" alt="userIcon" src={passIcon} />
						<select onChange={this.handleChange} className='inputs' value={this.state.type} name='type' id="select">
							{/* Selecciona opcion */}
							<option value={1}>Administrador</option>
							<option value={2}>Operador</option>
							<option value={3}>Cliente</option>
						</select>
						{/* <input type="password" name="pass" placeholder="&nbsp;&nbsp;Contraseña" className='inputs' onChange={this.handleChange} value={this.state.pass} maxLength="12" minLength="5" required /> */}
					</div>

					{/* repetir contraseña
						<div className="w100 basic-div">
							<img className="border ic icons" alt="passIcon" src={passIcon} />
							<input type="password" name="repeatpass" placeholder="&nbsp;&nbsp;Repetir Contraseña" className='inputs' required />
						</div> */}

					{/* Botón registro */}
					<div className='w100 basic-div divFather'>
						<input type="submit" className="botoniniciar button" value="Registro" onClick={() => this.registerUser()} />
					</div>
					<br />
					{/* Atrás */}
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
		)
	}
}

export default RegistrarUsuario;