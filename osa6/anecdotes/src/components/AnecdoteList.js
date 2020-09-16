import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { notifyOfVote, notificationTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(notifyOfVote(content))
    setTimeout(() => {
      dispatch(notificationTimeout())
    }, 5000)
  }

  return (
    <div style={{marginTop: 2 + 'em'}}>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
