import { blogService, loginService } from '../services'
import { notifyWith } from './notificationReducer'

const setToken = (token) => {
  return blogService.setToken(token)
}

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGGED_IN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    }
    catch (exception) {
      dispatch(notifyWith(`Oops, ${exception.response.data.error}`, 'error'))
    }
    
  }
}

export const userLoggedIn = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      dispatch({
        type: 'LOGGED_IN',
        data: user
      })
    }
  }
}

export const userLogout = () => {
  return dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'LOGOUT'
    })
    dispatch(notifyWith('Logged out successfully'))
  }
}

export default userReducer
