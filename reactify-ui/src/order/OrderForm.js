import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/Actions'

class OrderForm extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      phone_invalid: false,
      email_invalid: false
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    const { showSpiner, form, submitOrderForm } = this.props
    showSpiner()
    submitOrderForm(form)
  }

  showInvalidFields (validation_error) {
    this.props.setFalseToValidationError()

    if (validation_error.phone && validation_error.email) {
      this.setState({ ...this.state, phone_invalid: true, email_invalid: true })
    }

    if (!validation_error.phone && validation_error.email) {
      this.setState({ ...this.state, phone_invalid: false, email_invalid: true })
    }

    if (validation_error.phone && !validation_error.email) {
      this.setState({ ...this.state, phone_invalid: true, email_invalid: false })
    }
  }

  hideInvalidFields () {
    this.setState({
      ...this.state,
      phone_invalid: false,
      email_invalid: false
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.order_id) {
      this.props.showSpiner()
      this.props.moveIngredientsFromBasketToOrder(this.props.order_id)
    }

    if (this.props.validation_error) {
      this.props.closeSpiner()
      this.showInvalidFields(this.props.validation_error)
    }

    if (this.props.success_message) {
      this.hideInvalidFields()
      this.props.showSuccessMessage()
      this.props.setFalseToSuccessMessage()
    }
  }

  render () {
    const { name, email, phone, comments } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>

        <Form.Group controlId='formClientName'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' name='name' required placeholder='Enter your name' defaultValue={name || ''}
            onChange={this.props.handleOrderFormInputChange} />
        </Form.Group>

        <Form.Group controlId='formClientPhoneNumber'>
          <Form.Label>Phone number</Form.Label>
          <Form.Control type='tel' name='phone' placeholder='Enter your phone number' defaultValue={phone || ''}
            onChange={this.props.handleOrderFormInputChange} />
          {this.state.phone_invalid
            ? <Form.Text className='text-danger'>
                      Invalid phone number. Enter valid phone number like +380671234567.
            </Form.Text>
            : ''}
        </Form.Group>

        <Form.Group controlId='formClientEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' required placeholder='Enter email' name='email' defaultValue={email || ''}
            onChange={this.props.handleOrderFormInputChange} />
          {this.state.email_invalid
            ? <Form.Text className='text-danger'>
                    Invalid email. Enter valid email.
            </Form.Text>
            : ''}
          <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formClientComent'>
          <Form.Label>Comments</Form.Label>
          <Form.Control as='textarea' placeholder='Comments'
            name='comments' rows='4' defaultValue={comments || ''}
            onChange={this.props.handleOrderFormInputChange} />
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 3, offset: 9 }}>
            <Button type='submit' variant='primary' >
              Submit
            </Button>
          </Col>
        </Form.Group>

      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.order.form.name,
    phone: state.order.form.phone,
    email: state.order.form.email,
    comments: state.order.form.comments,
    form: state.order.form,
    order_id: state.order.order_id,
    validation_error: state.order.validation_error,
    success_message: state.order.success_message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleOrderFormInputChange: (e) => dispatch(actionCreator.handleOrderFormInputChange(e)),
    submitOrderForm: (data) => dispatch(actionCreator.submitOrderForm(data)),
    moveIngredientsFromBasketToOrder: (order_id) => dispatch(actionCreator.moveIngredientsFromBasketToOrder(order_id)),
    setFalseToSuccessMessage: () => dispatch(actionCreator.setFalseToSuccessMessage()),
    setFalseToValidationError: () => dispatch(actionCreator.setFalseToValidationError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
