import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Header,
  Notification
} from './components'

import Home from './components/pages/Home'
import Users from './components/pages/Users'
import {
  Switch, Route
} from 'react-router-dom'

const App = () => {
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  const [title, setTitle] = useState('Blogs')

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
            <Route path="/users">
              <Users title={setTitle} />
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
