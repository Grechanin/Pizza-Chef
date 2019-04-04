import React, { Component } from 'react'
import PizzaMenu from './menu/PizzaMenu'
import ModalOrderForm from './order/ModalOrderForm.js'
// import './App.css';

class App extends Component {
  render () {
    return (
      <div className='container'>
        <PizzaMenu />
        <ModalOrderForm />
      </div>
    )
  }
}

export default App
