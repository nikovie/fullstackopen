const notificationReducer = (state = null, action) => {
  
  switch(action.type) {
    case 'SET_NOTIFICATION': 
      return action.content

    case 'RESET':
      return action.reset

    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      content: message
    })
    setTimeout(() => {
      dispatch(notificationTimeout())
    }, timeout*1000)
  }
}

export const notificationTimeout = () => {
  return {
    type: 'RESET',
    reset: null
  }
}

export default notificationReducer
