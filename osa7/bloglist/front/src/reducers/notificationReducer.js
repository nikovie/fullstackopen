let timeoutId

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MSG':
      return {...state, message: action.notification.message, type: action.notification.type}
    case 'RESET_MSG':
      return null
    default: 
      return state
  }
}

export const notifyWith = (message, type='success') => {
  return dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET_MSG',
      notification: {
        message,
        type
      }
    })
    timeoutId = setTimeout(() => {
      dispatch(resetMessage())
    }, 5000)
  }
  
}

export const resetMessage = () => {
  return {
    type: 'RESET_MSG'
  }
}

export default notificationReducer
