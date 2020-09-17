const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'FIND_TEXT':
      return action.filter
    default:
      return state
  }
}

export const filterAnecdote = (text) => {
  return {
    type: 'FIND_TEXT',
    filter: text
  }
}

export default filterReducer
