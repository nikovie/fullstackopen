const notificationReducer = (state = null, action) => {
  
  switch(action.type) {
    case 'NEW_CONTENT':
      return `A new anecdote "${action.content}" has been added`

    case 'VOTE':
      return `You voted "${action.content}"`

    case 'RESET':
      return action.reset

    default:
      return state
  }
}

export const notifyOfNew = (content) => {
  return {
    type: 'NEW_CONTENT',
    content
  }
}

export const notifyOfVote = (content) => {
  return {
    type: 'VOTE',
    content
  }
}

export const notificationTimeout = () => {
  return {
    type: 'RESET',
    reset: null
  }
}

export default notificationReducer
