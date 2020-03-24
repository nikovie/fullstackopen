import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({title, content, votes, footer}) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{content}</div>
      <div>{votes} {footer}</div>
    </div>
  )
}

const App = ({anecdotes, maxVal}) => {
  const points = Array(maxVal).fill(0)

  const [selected, setSelected] = useState(0)
  const [mostVoted, updateMostVoted] = useState(0)
  const [votes, addVote] = useState(points)

  const copy = [...votes]
  copy[selected] += 1

  return (
    <div>
      <Anecdote 
        title="Anecdote of the day" 
        content={anecdotes[selected]} 
        votes={votes[selected]} 
        footer="votes"
      />
      <div>
        <button onClick={() => addVote(copy, updateMostVoted(votes.indexOf(Math.max.apply(null, votes))))}>Vote</button>
        <button onClick={() => setSelected(random(maxVal))}>Random anecdote</button>
      </div>
      <Anecdote
        title="Anocdote with most votes"
        content={anecdotes[mostVoted]}
        votes={votes[mostVoted]}
        footer="votes"  
      />
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const random = (maxVal) => {
  const randVal = Math.floor(Math.random() * Math.floor(maxVal))
  return randVal
}

ReactDOM.render(
  <App anecdotes={anecdotes} maxVal={anecdotes.length} />,
  document.getElementById('root')
)