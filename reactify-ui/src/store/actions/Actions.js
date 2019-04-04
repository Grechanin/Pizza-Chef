import {
  loadDataAsnc,
  createDataAsnc,
  updatetDataAsnc,
  destroyDataAsnc } from './FetchFuncions'

export const loadCategories = () => {
  const endpoint = '/api/menu/categories/'
  const type = 'LOAD_CATEGORIES'
  return dispatch => {
    loadDataAsnc(dispatch, endpoint, type)
  }
}

export const loadIngredients = () => {
  const endpoint = '/api/menu/ingredients/'
  const type = 'LOAD_INGREDIENTS'
  return dispatch => {
    loadDataAsnc(dispatch, endpoint, type)
  }
}

export const loadIngredientsInBasket = () => {
  const endpoint = '/api/orders/add_ingredient/'
  const type = 'LOAD_INGREDIENTS_IN_BASKET'
  return dispatch => {
    loadDataAsnc(dispatch, endpoint, type)
  }
}

// ADD INGREDIENT TO BASKET
export const addIngredientToBasket = (event) => {
  const endpoint = '/api/orders/add_ingredient/'
  const type = 'ADD_INGREDIENT_TO_BASKET'
  const data = {
    ingredient: parseInt(event.target.name),
    nmb: event.target.value
  }
  return dispatch => {
    createDataAsnc(dispatch, endpoint, type, data)
  }
}
// END ADD INGREDIENT TO BASKET

// UPDATE INGREDIENT IN BASKET
export const updateIngredientInBasket = (event, id) => {
  const endpoint = `/api/orders/basket_update/${id}/`
  const type = 'UPDATE_INGREDIENT_IN_BASKET'
  const data = {
    ingredient: parseInt(event.target.name),
    nmb: event.target.value
  }
  return dispatch => {
    updatetDataAsnc(dispatch, endpoint, type, data)
  }
}
// END UPDATE INGREDIENT IN BASKET

// DESTROY INGREDIENT IN BASKET
export const destroyIngredientInBasket = (event, id) => {
  const endpoint = `/api/orders/ingredient_destroy/${id}/`
  const type = 'DELETE_INGREDIENT_IN_BASKET'
  return dispatch => {
    destroyDataAsnc(dispatch, endpoint, type, id)
  }
}
// END DESTROY INGREDIENT IN BASKET

// ADD DOUGH TO BASKET
export const addDoughToBasket = (event) => {
  // event.preventDefault()
  const endpoint = '/api/orders/add_ingredient/'
  const type = 'ADD_INGREDIENT_TO_BASKET'
  const data = {
    ingredient: parseInt(event.target.value),
    nmb: 1
  }
  return dispatch => {
    createDataAsnc(dispatch, endpoint, type, data)
  }
}
// END ADD DOUGH TO BASKET

// UPDATE INGREDIENT IN BASKET
export const updateDoughInBasket = (event, id) => {
  const endpoint = `/api/orders/basket_update/${id}/`
  const type = 'UPDATE_INGREDIENT_IN_BASKET'
  const data = {
    ingredient: parseInt(event.target.value),
    nmb: 1
  }
  return dispatch => {
    updatetDataAsnc(dispatch, endpoint, type, data)
  }
}
// END UPDATE INGREDIENT IN BASKET

// HANDLE ORDER FORM INPUT CHANGE
export const handleOrderFormInputChange = (event) => {
  event.preventDefault()
  return dispatch => {
    dispatch({
      type: 'ORDER_FORM_INPUT_CHANGE',
      key: event.target.name,
      value: event.target.value
    })
  }
}
// END HANDLE ORDER FORM INPUT CHANGE

// HANDLE SUBMIT ORDER FORM INPUT CHANGE
export const submitOrderForm = (data) => {
  const endpoint = '/api/orders/order_create/'
  const type = 'SUBMIT_ORDER_FORM'
  return dispatch => {
    createDataAsnc(dispatch, endpoint, type, data)
  }
}
// END HANDLE SUBMIT ORDER FORM INPUT CHANGE

// MOVE INGREDIENTS FROM BASKET TO ORDER
export const moveIngredientsFromBasketToOrder = (order_id) => {
  const endpoint = '/api/orders/ingredients_in_order_create/'
  const type = 'ORDER_CREATED'
  const data = {
    order: order_id
  }
  return dispatch => {
    createDataAsnc(dispatch, endpoint, type, data)
  }
}
// END MOVE INGREDIENTS FROM BASKET TO ORDER

// SET FALSE VALUE TO SUCCESS_MESAGE FIELD
export const setFalseToSuccessMessage = () => {
  return dispatch => {
    dispatch({ type: 'SET_FALSE_TO_SUCCESS_MESSAGE' })
  }
}
// END SET FALSE VALUE TO SUCCESS_MESAGE FIELD

// SET FALSE VALUE TO VALIDATION_ERROR FIELD
export const setFalseToValidationError = () => {
  return dispatch => {
    dispatch({ type: 'SET_FALSE_TO_VALIDATION_ERROR' })
  }
}
// END SET FALSE VALUE TO SUCCESS_MESAGE FIELD
