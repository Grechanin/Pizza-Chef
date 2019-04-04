
const InitialState = {
  menu: {
    categories: [],
    ingredients: []
  },
  order: {
    ingredients_in_basket: [],
    form: {},
    order_id: false,
    validation_error: false,
    success_message: false
  }

}

const reducer = (state = InitialState, action) => {
  const newState = { ...state }

  switch (action.type) {
    case 'LOAD_CATEGORIES':
      newState.menu = { ...newState.menu,
        categories: action.data
      }
      break

    case 'LOAD_INGREDIENTS':
      newState.menu = { ...newState.menu,
        ingredients: action.data
      }
      break

    case 'LOAD_INGREDIENTS_IN_BASKET':
      const ingredients_in_basket = action.data
      newState.order = { ...newState.order, ingredients_in_basket }
      break

    case 'ADD_INGREDIENT_TO_BASKET':
      newState.order.ingredients_in_basket = [ ...newState.order.ingredients_in_basket,
        action.data
      ]
      break

    case 'UPDATE_INGREDIENT_IN_BASKET':
      const updated_ingredients = newState.order.ingredients_in_basket.map((el, i) => {
        if (el.id === action.data.id) {
          const updated_ingredient = { ...el,
            nmb: action.data.nmb,
            ingredient: action.data.ingredient,
            total_price: action.data.total_price
          }
          return updated_ingredient
        } else return el
      })
      newState.order = { ...newState.order,
        ingredients_in_basket: updated_ingredients
      }
      break

    case 'DELETE_INGREDIENT_IN_BASKET':
      newState.order.ingredients_in_basket = newState.order.ingredients_in_basket.filter(el => el.id !== action.data)
      break

    case 'ORDER_FORM_INPUT_CHANGE':
      newState.order.form = { ...newState.order.form,
        [action.key]: action.value
      }
      break

    case 'SUBMIT_ORDER_FORM':
      if (action.data.id) {
        newState.order = { ...newState.order,
          order_id: action.data.id
        }
      } else {
        newState.order = { ...newState.order,
          validation_error: action.data
        }
      }
      break

    case 'ORDER_CREATED':
      if (action.data.order === newState.order.order_id) {
        newState.order = { ...newState.order,
          order_id: false,
          success_message: true,
          ingredients_in_basket: []
        }
      } else {
        newState.order = { ...newState.order,
          validation_error: action.data
        }
      }

      break

    case 'SET_FALSE_TO_SUCCESS_MESSAGE':
      newState.order = { ...newState.order,
        success_message: false
      }

      break

    case 'SET_FALSE_TO_VALIDATION_ERROR':
      newState.order = { ...newState.order,
        validation_error: false
      }

      break

    default:
      break
  }

  return newState
}

export default reducer
