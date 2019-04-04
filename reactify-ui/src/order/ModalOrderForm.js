import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import OrderForm from './OrderForm'
import { connect } from 'react-redux'
import Loader from 'react-loader'

class ModalOrderForm extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleCloseWarningForm = this.handleCloseWarningForm.bind(this)
    this.showSuccessMessage = this.showSuccessMessage.bind(this)
    this.closeSuccessMessage = this.closeSuccessMessage.bind(this)
    this.showSpiner = this.showSpiner.bind(this)
    this.showSpiner = this.showSpiner.bind(this)
    this.closeSpiner = this.closeSpiner.bind(this)

    this.state = {
      show: false,
      show_warning: false,
      show_success_message: false,
      spiner: true
    }
  }

  handleClose () {
    this.setState({ ...this.state, show: false })
  }

  handleCloseWarningForm () {
    this.setState({ ...this.state, show_warning: false })
  }

  handleShow () {
    const { ingredients_in_basket } = this.props
    let is_dough_in_basket = false
    ingredients_in_basket.forEach((instance, index) => {
      if (instance.is_dough) {
        this.setState({ ...this.state, show: true })
        is_dough_in_basket = true
      }
    })
    if (!is_dough_in_basket) {
      this.setState({ ...this.state, show_warning: true })
    }
  }

  showSuccessMessage () {
    // hide spiner and order form and show success message
    this.setState({ ...this.state, show_success_message: true, spiner: true, show: false })
  }

  closeSuccessMessage () {
    this.setState({ ...this.state, show_success_message: false })
  }

  showSpiner () {
    this.setState({ ...this.state, spiner: false })
  }

  closeSpiner () {
    this.setState({ ...this.state, spiner: true })
  }

  render () {
    return (
      <div>

        <Button variant='primary' onClick={this.handleShow}>
          Order
        </Button>

        <Loader loaded={this.state.spiner} />
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OrderForm handleClose={this.handleClose}
              showSuccessMessage={this.showSuccessMessage}
              showSpiner={this.showSpiner}
              closeSpiner={this.closeSpiner} />
          </Modal.Body>
        </Modal>

        <Modal show={this.state.show_warning} onHide={this.handleCloseWarningForm}>
          <Modal.Header closeButton>
            <Modal.Title>Pleaze choose your dough!</Modal.Title>
          </Modal.Header>
        </Modal>

        <Modal show={this.state.show_success_message} onHide={this.closeSuccessMessage}>
          <Modal.Header closeButton>
            <Modal.Title>Success! Check your e-mail to confirm order.</Modal.Title>
          </Modal.Header>
        </Modal>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients_in_basket: state.order.ingredients_in_basket
  }
}

export default connect(mapStateToProps)(ModalOrderForm)
