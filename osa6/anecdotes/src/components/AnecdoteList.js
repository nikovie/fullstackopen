import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { notifyOfVote, notificationTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterValue = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(notifyOfVote(content))
    setTimeout(() => {
      dispatch(notificationTimeout())
    }, 5000)
  }

  const filterAnecdotes = (anecdotes, filterValue) => {
    return anecdotes.filter(
      anecdotes => anecdotes.content.toLowerCase()
      .includes(filterValue.toLowerCase())
    )
  }

  return (
    <div style={{marginTop: 1 + 'em'}}>
      {filterAnecdotes(anecdotes, filterValue)
        .map(anecdote =>
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
