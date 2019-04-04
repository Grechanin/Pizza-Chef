import 'whatwg-fetch'
import cookie from 'react-cookies'

export const loadDataAsnc = (dispatch, endpoint, type) => {
  let lookupOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'mode': 'no-cors'
    }
  }
  // console.log('fetch', endpoint, type)

  fetch(endpoint, lookupOptions)
    .then((responce) => {
      // console.log(responce)
      return responce.json()
    }).then((responceData) => {
      // console.log(responceData)
      dispatch({
        type: type,
        data: responceData
      })
    }).catch((error) => {
      console.log('error', error)
    })
}

export const createDataAsnc = (dispatch, endpoint, type, data) => {
  let csrfToken = cookie.load('csrftoken')
  if (csrfToken !== undefined) {
    let lookupOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }

    fetch(endpoint, lookupOptions)
      .then((responce) => {
        return responce.json()
      }).then((responceData) => {
        // console.log('Success responceData', responceData)
        // console.log('Success data', data)
        dispatch({ type: type,
          data: responceData
        })
      }).catch((error) => {
        console.log('error qwer', error)
        // dispatch({ type: 'DESIGN_ORDER_ERROR'
        //   // data: responceData
        // })
      })
  }
}

export const updatetDataAsnc = (dispatch, endpoint, type, data) => {
  let csrfToken = cookie.load('csrftoken')
  if (csrfToken !== undefined) {
    let lookupOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }

    fetch(endpoint, lookupOptions)
      .then((responce) => {
        return responce.json()
      }).then((responceData) => {
        // console.log('responceData', responceData)
        dispatch({ type: type,
          data: responceData
        })
      }).catch((error) => {
        console.log('error qwer', error)
      })
  }
}

export const destroyDataAsnc = (dispatch, endpoint, type, id) => {
  // console.log('destroyDataAsnc id', id)
  let csrfToken = cookie.load('csrftoken')
  if (csrfToken !== undefined) {
    let lookupOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    }

    fetch(endpoint, lookupOptions)
      .then((responce) => {
        // console.log('responce', responce)
        // console.log('responce id', id)
        dispatch({ type: type,
          data: id
        })
      }).catch((error) => {
        console.log('error qwer', error)
      })
  }
}
