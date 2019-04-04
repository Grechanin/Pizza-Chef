import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/Actions'

class Dough extends Component {
  constructor (props, context) {
    super(props, context)

    this.handleDoughInputChange = this.handleDoughInputChange.bind(this)

    this.state = {
      dough_id_in_basket: false
    }
  }

  // if we have dough in basket then make update, if not create
  handleDoughInputChange (event) {
    const { ingredients_in_basket } = this.props
    let is_dough_in_basket = false
    ingredients_in_basket.forEach((instance, index) => {
      if (instance.is_dough) {
        this.props.updateDoughInBasket(event, instance.id)
        is_dough_in_basket = true
      }
    })
    if (!is_dough_in_basket) {
      this.props.addDoughToBasket(event)
    }
  }

  // find dough id in basket to define which radio button is checked
  findDoughIdInBasket () {
    const { ingredients_in_basket } = this.props
    let dough_id_in_basket = false
    ingredients_in_basket.forEach((instance, index) => {
      if (instance.is_dough) {
        dough_id_in_basket = instance.ingredient
      }
    })
    this.setState({
      dough_id_in_basket: dough_id_in_basket
    })
  }

  componentDidUpdate (prevProps) {
    if (this.props.ingredients_in_basket !== prevProps.ingredients_in_basket) {
      this.findDoughIdInBasket()
    }
  }

  render () {
    const { category, ingredients } = this.props
    const { dough_id_in_basket } = this.state
    return (
      <div>
        <form>
          <p><b>{category.name}:</b></p>
          {ingredients.map((instance, index) => {
            if (instance.category === category.id) {
              return (
                <label key={index} style={{ margin: '0 10px 0 0' }}>
                  <input onChange={this.handleDoughInputChange} type='radio' checked={dough_id_in_basket === instance.id}
                    name='dough' value={instance.id} /> {instance.name} ({instance.price} UAH)
                </label>
              )
            } else return ('')
          })}
        </form><hr />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients_in_basket: state.order.ingredients_in_basket
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDoughToBasket: (event) => dispatch(actionCreator.addDoughToBasket(event)),
    updateDoughInBasket: (event, id) => dispatch(actionCreator.updateDoughInBasket(event, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dough)
