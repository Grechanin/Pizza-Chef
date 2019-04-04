import React, { Component } from 'react'
import IngredientInputField from './IngredientInputField'

class Ingredient extends Component {
  render () {
    const { category_id, category_name, ingredients } = this.props
    return (
      <div>
        <form>
          <p><b>{category_name}:</b></p>
          <div style={{ display: 'flex' }}>
            {ingredients.map((ingredient, index) => {
              if (ingredient.category === category_id) {
                return (
                  <div key={index} style={{ margin: '0 10px 0 0' }}>
                    <label>{ingredient.name} ({ingredient.price} UAH) <br />
                      <IngredientInputField ingredient={ingredient} />
                    </label>
                  </div>
                )
              } else return ('')
            })}
          </div>
        </form><hr />
      </div>
    )
  }
}

export default Ingredient
