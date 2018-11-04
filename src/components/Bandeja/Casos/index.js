import React, { Component } from 'react';
import ConsultarCasos from './Consultar'
import AperturarCaso from './Aperturar'

let axios = require("axios");

class Casos extends Component {
  constructor(props) {
    super(props);
    this.growl = {};
    this.state = {
      toShow: props.toShow
    }
    console.log('props', props)
  }

  componentDidUpdate(prevProps){
    if(prevProps.toShow != this.props.toShow){
      this.setState({toShow: this.props.toShow})
    }
  }

  render() {
    return (

      <div className="table-user">
        {
          this.state.toShow == 'aperturar' ? <AperturarCaso />
            : <ConsultarCasos />
        }
      </div>
    )
  }
}

export default Casos;