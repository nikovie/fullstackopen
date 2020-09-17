const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data

    case 'ADD_NEW':
      return [ ...state, action.data ]
    
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      ).sort((a, b) => b.votes - a.votes)
      
    default: 
      return state.sort((a, b) => b.votes - a.votes)
  }  
}

export const addVote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const addNewAnecdote = (content) => {
  return {
    type: 'ADD_NEW',
    data: { 
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default anecdoteReducer
