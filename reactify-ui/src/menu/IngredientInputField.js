import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/Actions'

class IngredientInputField extends Component {
  constructor (props, context) {
    super(props, context)

    this.handleIngredientInputChange = this.handleIngredientInputChange.bind(this)

    this.state = {
      nmb: false,
      ingredient_id_in_basket: false
    }
  }

  // Define and set to the state ingredient quantity from basket
  defineIngredientQuantity (ingredient, ingredients_in_basket) {
    let nmb = false
    let ingredient_id_in_basket = false
    ingredients_in_basket.forEach((ingr, i) => {
      if (parseInt(ingr.ingredient) === ingredient.id) {
        nmb = ingr.nmb
        ingredient_id_in_basket = ingr.id
      }
    })

    this.setState({
      nmb: nmb,
      ingredient_id_in_basket: ingredient_id_in_basket
    })
  }

  handleIngredientInputChange (event) {
    event.preventDefault()
    if (this.state.nmb && this.state.ingredient_id_in_basket) {
      if (!event.target.value || parseInt(event.target.value) === 0) {
        this.props.destroyIngredientInBasket(event, this.state.ingredient_id_in_basket)
      } else {
        this.props.updateIngredientInBasket(event, this.state.ingredient_id_in_basket)
      }
    } else if (parseInt(event.target.value)) {
      this.props.addIngredientToBasket(event)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.ingredients_in_basket !== prevProps.ingredients_in_basket) {
      this.defineIngredientQuantity(this.props.ingredient, this.props.ingredients_in_basket)
    }
  }

  render () {
    const { ingredient } = this.props
    if (this.state.nmb) {
      return (
        <input type='number' min='0'
          onBlur={this.handleIngredientInputChange}
          name={ingredient.id}
          defaultValue={this.state.nmb} />
      )
    } else {
      return (
        <div>
          <input type='number' min='0'
            onBlur={this.handleIngredientInputChange}
            name={ingredient.id}
            placeholder='Enter quantity'
          />
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients_in_basket: state.order.ingredients_in_basket
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientToBasket: (event) => dispatch(actionCreator.addIngredientToBasket(event)),
    updateIngredientInBasket: (event, id) => dispatch(actionCreator.updateIngredientInBasket(event, id)),
    destroyIngredientInBasket: (event, id) => dispatch(actionCreator.destroyIngredientInBasket(event, id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientInputField)
