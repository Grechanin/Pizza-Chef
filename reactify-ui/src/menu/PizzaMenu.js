import React, { Component } from 'react'
import Dough from './Dough.js'
import Ingredient from './Ingredient.js'
import { connect } from 'react-redux'
import * as actionCreator from '../store/actions/Actions'
// import Loader from 'react-loader'

class PizzaMenu extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      total_price: 0
    }
  }

  totalPrice () {
    let total_price = 0
    this.props.ingredients_in_basket.forEach((instance, index) => {
      total_price += parseInt(instance.total_price)
    })
    this.setState({ total_price: total_price })
  }

  componentDidMount () {
    this.props.loadCategories()
    this.props.loadIngredients()
    this.props.loadIngredientsInBasket()
  }

  componentDidUpdate (prevProps) {
    if (this.props.ingredients_in_basket !== prevProps.ingredients_in_basket) {
      this.totalPrice()
    }
  }

  render () {
    const { categories, ingredients } = this.props
    const { total_price } = this.state

    return (
      <div>
        <h1 className='text-center'>Pizza Chef</h1>
        <h3>Choose ingredients and create your Pizza!</h3>
        { categories.map((instance, index) => {
          return (
            <div key={index}>
              {instance.is_dough
                ? <Dough category={instance} ingredients={ingredients} />
                : <Ingredient category_id={instance.id} category_name={instance.name} ingredients={ingredients} />
              }
            </div>
          )
        })
        }
        {total_price ? <p>Total price: {total_price} UAH</p> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.menu.categories,
    ingredients: state.menu.ingredients,
    ingredients_in_basket: state.order.ingredients_in_basket
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(actionCreator.loadCategories()),
    loadIngredients: () => dispatch(actionCreator.loadIngredients()),
    loadIngredientsInBasket: () => dispatch(actionCreator.loadIngredientsInBasket())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PizzaMenu)
