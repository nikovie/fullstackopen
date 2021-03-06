import React, { useState } from 'react'
import {
  Switch, Route
} from 'react-router-dom'

import AnecdoteList from './components/pages/AnecdoteList'
import About from './components/pages/About'
import CreateNew from './components/pages/CreateNew'
import Anecdote from './components/pages/Anecdote'
import Menu from './components/Menu'
import Footer from './components/Footer'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote "${anecdote.content}" has been added`)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const Notification = () => {
    return (
      <div style={{border: 2 + "px solid #F00"}}>{notification}</div>
    )
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification ? <Notification /> : null}
      <Switch>
        <Route path="/anecdote/:id">
          <Anecdote list={anecdotes} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
