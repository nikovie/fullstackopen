import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Form
      id="loginForm"
      onSubmit={
        (event) => {
          event.preventDefault()
          dispatch(userLogin(username, password))
          setUsername('')
          setPassword('')
        }
      }
    >
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>      
    </Form>
  )
}

export default Login
