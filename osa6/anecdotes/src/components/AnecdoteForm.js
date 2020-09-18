import React from 'react'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { notifyOfNew, notificationTimeout } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNewAnecdote(content))
    dispatch(notifyOfNew(content))
    setTimeout(() => {
      dispatch(notificationTimeout())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
