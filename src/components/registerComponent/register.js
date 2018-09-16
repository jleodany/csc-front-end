import React, { Component } from 'react';

let axios = require("axios");

class Register extends Component {

    constructor(){
        super();
    }
    
    prueba(){
        console.log("PROBANDO");
        axios.get("test").then(function (response) {
            console.log(response.data);
        })
    }

    render() {
        return (
            <div>
                <input type="text" name="user" placeholder="&nbsp;&nbsp;Usuario" required />
                <button value="probar" onClick={() => this.prueba() }>Probar</button>
            </div>
        )
    }
}

export default Register;