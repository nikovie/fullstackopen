import anecdoteService from '../services/anecdotes'

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
  return async dispatch => {
    const anecdote = await anecdoteService.addVote(id)
    console.log('anecdote', anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: anecdote
    })
  }
}

export const addNewAnecdote = (data) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(data)
    dispatch({
      type: 'ADD_NEW',
      data: anecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer
