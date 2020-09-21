import React from 'react'
import { useParams } from 'react-router-dom'

const Anecdote = ({ list }) => {
  const id = useParams().id
  const anecdote = list.find(a => a.id === id)
  
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>
        {`has ${anecdote.votes} votes`}
      </p>
      <p>
        <span style={padding}>for more indo see</span>
        <a href="anecdote.info">{anecdote.info}</a>
      </p>
    </div>
  )
}

export default Anecdote
