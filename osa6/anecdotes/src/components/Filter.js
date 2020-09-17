import React from 'react'
import { useDispatch } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const contains = event.target.value
    dispatch(filterAnecdote(contains))
  }
  const style = {
    marginTop: 1 + 'em',
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
