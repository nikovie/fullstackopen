import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initUsers } from './reducers/userDataReducer'
import {
  Header,
  Notification
} from './components'

import Home from './components/pages/Home'
import Users from './components/pages/Users'
import UserDetails from './components/pages/UserDetails'
import {
  Switch, Route,
  useRouteMatch
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const userdata = useSelector(state => state.userdata)
  const [title, setTitle] = useState('Blogs')

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])
  
  const match = useRouteMatch('/users/:id')
  const userId = match
    ? userdata.find(user => user.id === match.params.id)
    : null

  return (
    <div>
      <Header title={title} user={user} />
      <Notification notification={message}/>
      <div className="ma2">
        {user === null ?
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          :
          <Switch>
            <Route path="/users/:id">
              <UserDetails title={setTitle} user={userId} />
            </Route>
            <Route path="/users">
              <Users title={setTitle} users={userdata} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        }
      </div>
    </div>
  )
}

export default App
